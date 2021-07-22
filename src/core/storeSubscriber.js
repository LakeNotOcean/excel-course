import { isEqual } from "./utils";

export class StoreSubscriber{
    constructor(store){
        this.store=store;
        this.sub=null;
        this.prevState={};
    }

    subscribeComponents(components){

        this.prevState=this.store.getState();

        this.sub=this.store.subscribe(state=>{

            Object.keys(state).forEach(key=>{
                const stateChange=state[key];
                

                if (!isEqual(this.prevState[key],stateChange)){

                    components.forEach(component=>{
                        if (component.isWatching(key)){
                            const changes={[key]:stateChange};
                            component.storeChanged(changes);
                        };
                    });
                };
            });
            this.prevState=this.store.getState();
        });

    }

    unsubscribeFromStore(){
        this.sub.unsubscribe(); 
    }
}