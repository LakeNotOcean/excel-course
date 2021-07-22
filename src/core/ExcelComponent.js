import { DomListener } from '@core/DOMListeners';

export class ExcelComponent extends DomListener{
    constructor($root,options={}){
        super($root,options.listeners);
        this.name=options.name || '';
        this.emitter=options.emitter;
        this.subscribe=options.subscribe || [];
        this.store=options.store;
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

    $dispatch(action){
        this.store.dispatch(action);
    }

    // $subscribe(func){
    //     this.storeSub=this.store.subscribe(func);
    // }

    // Изменения по тем полям, на которые подписались

    storeChanged(){}

    isWatching(key){
        return this.subscribe.includes(key);
    }

    init(){
        this.initDOMListeners();
    }
    
    destroy(){
        this.removeDOMListeners();
        this.unsubs.forEach(unsub=>unsub());
    }
}