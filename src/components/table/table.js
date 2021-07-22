import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from "./table.tamplate";
import { resizeHandler } from "./table.resize";
import { TableSelection } from "./tableSelection";
import {matrix,nextSelector } from "@core/utils"
import {$} from '@core/dom';
import * as actions from '@/redux/action'
import {defaultStyles} from '@/constants'
import { parse } from '@/core/parse';

export class Table extends ExcelComponent{
    static className='excel__table';
    
    
    constructor($root,options){
        super($root,{
            name:'Table',
            listeners:['mousedown','keydown','input'],
            ...options
        });
        this.prepare();
        
    }
    
    toHTML(){
        return createTable(20,this.store.getState());
    }

    prepare(){
        this.selection=new TableSelection();
    }

    selectCell($cell){
        this.selection.select($cell);
        this.$emit('table:select',$cell);
        const styles=$cell.getStyles(Object.keys(defaultStyles));
        this.$dispatch(actions.changeStyles(styles));
    }

    init(){
        super.init();
        const $cell=this.$root.find('[data-id="0:0"]');
        this.selectCell($cell); 

        this.$on('formula:input',text=>{

            this.selection.current.attr('data-value',text);
            this.selection.current.text(parse(text));

            this.updateTextInStore(text);
        });
        this.$on('formula:enter',()=>{
            this.selection.current.focus(); 
        });
        
        this.$on('toolbar:applyStyle',value=>{
            this.selection.applyStyle(value);
            this.$dispatch(actions.applyStyle({
                value,  
                ids:this.selection.selectedIds
            }));   
        }); 

    }

    async resizeTable(event){
        const data = await resizeHandler(this.$root,event);
        this.$dispatch(actions.tableResize(data));          
    }

    onMousedown(event){
        if (event.target.dataset.resize){
            this.resizeTable(event);    
        }
        else if (event.target.dataset.type==='cell'){
            const $target=$(event.target);
            if (event.shiftKey){
                const target=$target.id(true);
                const current=this.selection.current.id(true);

                
                const $cells=matrix(target,current).map(id=>this.$root.find(`[data-id="${id}"]`)); 
                this.selection.selectGroup($cells);
            }
            else this.selectCell($(event.target));
        }
    }

    onKeydown(event){
        const keys=[
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrorRight',
            'ArrorDown',
            'ArrorUp'
        ];
        if (keys.includes(event.key) && !event.shiftKey){
            event.preventDefault();
            const {col, row} = this.selection.current.id(true);
            
            const $next=this.$root.find(nextSelector(event.key,col,row));
            if (!$next.isNull)
            {
                this.selectCell($next); 
            }
            
        }
    }

    updateTextInStore(value){
        this.$dispatch(actions.changeText({
            id:this.selection.current.id(),
            value
        }));
    }           

    onInput(event){
        this.updateTextInStore($(event.target).text()); 
    }

    
}



