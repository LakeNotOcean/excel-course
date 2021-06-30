import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from "./table.tamplate";
import { resizeHandler } from "./table.resize";
import { TableSelection } from "./tableSelection";
import {matrix,nextSelector } from "@core/utils"
import {$} from '@core/dom';

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
        return createTable(20);
    }

    prepare(){
        this.selection=new TableSelection();
    }

    init(){
        super.init();
        const $cell=this.$root.find('[data-id="0:0"]');
        this.selection.select($cell);
        this.$emit('table:select',$cell); 

        this.$on('formula:input',text=>{
            this.selection.current.text(text);
        });
        this.$on('formula:enter',()=>{
            this.selection.current.focus(); 
        })
    }

    onMousedown(event){
        if (event.target.dataset.resize){
            resizeHandler(this.$root,event);
        }
        else if (event.target.dataset.type==='cell'){
            const $target=$(event.target);
            if (event.shiftKey){
                const target=$target.id(true);
                const current=this.selection.current.id(true);

                
                const $cells=matrix(target,current).map(id=>this.$root.find(`[data-id="${id}"]`)); 
                this.selection.selectGroup($cells);
            }
            else this.selection.select($(event.target));
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
                this.selection.select($next);
                this.$emit('table:select',$next); 
            }
            
        }
    }
    onInput(event){
        this.$emit('table:input',$(event.target));
    }

    
}



