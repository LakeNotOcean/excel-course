import { DomListener } from '@core/DOMListeners';

export class ExcelComponent extends DomListener{
    constructor($root,options={}){
        super($root,options.listeners);
        this.name=options.name || '';
        this.emitter=options.emitter;
        this.unsubs=[];

        this.prepare();
    }

    toHTML(){
        return '';
    }

    // Настройка до инит
    prepare(){
        
    }

    // Уведомляем слушателей о событии event
    $emit(event, ...args){
        this.emitter.emit(event, ...args);
    }

    // Подписка на событие
    $on(event,func){
        const unsub=this.emitter.subscribe(event,func);
        this.unsubs.push(unsub);
    }

    init(){
        this.initDOMListeners();
    }
    
    destroy(){
        this.removeDOMListeners();
        this.unsubs.forEach(unsub=>unsub());
    }
}