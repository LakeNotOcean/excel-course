import {$} from '@core/dom' 

export function resizeHandler($root,event){
    return new Promise(resolve=>{
        const $target=$(event.target);
            const $parent=$target.closest('[data-type="resizable"]');
            const coords=$parent.getCoords();
            const resizeType=event.target.dataset.resize;
            const sideProp=resizeType==='col'?'bottom':'right';
            let value;

            $target.css({
                opacity:1,
                [sideProp]:'-5000px'
            });

            if (resizeType==='col') {
                
                document.onmousemove=e=>{
                    value=coords.right-e.pageX; 

                    
                    $target.css({right:value+'px'});
                    
                }
            }
            else {
                
                document.onmousemove=e=>{
                    value=coords.bottom-e.pageY;
                    $target.css({bottom:value+'px'});
                }
            }
             
            document.onmouseup=e=>{
                $target.css({
                    opacity:0,
                    right:0,
                    bottom:0
                });
                document.onmousemove=null;

                if (resizeType==='col'){
                    const colIndex=$parent.data.col;
                    const delta=e.pageX-coords.right;
                    const cells=$root.findAll(`[data-col="${colIndex}"]`);

                    cells.forEach(el=>{
                        el.style.width=coords.width+delta+'px';
                    });

                    value=coords.width+e.pageX-coords.right;
                }
                else {
                    const delta=e.pageY-coords.bottom;   
                    $parent.css({height:coords.height+delta+'px'});

                    value=coords.height+e.pageY-coords.bottom;
                }

                document.onmouseup=null;
                

                resolve({
                    value,
                    rowOrCol:resizeType==='col'?'col':'row',
                    id:resizeType==='col' ?$parent.data.col:$parent.data.row
                });
            }
    })
    
}