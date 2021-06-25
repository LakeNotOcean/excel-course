import { capitalize } from "@core/utils";

export class DomListener{
    constructor($root,listeners=[]){
        if (!$root){
            throw Error('No $root provided');
        }
        this.$root=$root;
        this.listeners=listeners;
    }

    initDOMListeners(){
        
        this.listeners.forEach(listener =>{
            const method=getMethodName(listener);
            if (!this[method])
                throw new Error(`Methdo ${method} is not implemented`);
            this[method]=this[method].bind(this);
            this.$root.on(listener,this[method]);
        });
    }
    removeDOMListeners(){
        this.listeners.forEach(listener=>{
            const method=getMethodName(listener);
            if (!this[method])
                throw new Error(`Methdo ${method} is not implemented`);
            this.$root.off(listener,this[method]);
        });
    }
}

function getMethodName(eventName){
    return 'on'+capitalize(eventName);
}