import { DomListener } from '@core/DOMListeners';

export class ExcelComponent extends DomListener{
    constructor($root,options={}){
        super($root,options.listeners);
    }

    toHTML(){
        return '';
    }

    init(){
        this.initDOMListeners();
    }
    
    destroy(){
        this.removeDOMListeners();
    }
}