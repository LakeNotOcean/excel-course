export function createStore(rootReducer,initialState={}) {

    let state=rootReducer({...initialState}, {type:'__INIT__'});
    const listeners=[];

    
    return {
        subscribe(func){
            listeners.push(func);
            return {
                unsubscribe() {
                    listeners=listeners.filter(l=>l!==func);
                }   
            }   
        },
        dispatch(action){   
            state=rootReducer(state,action);
            listeners.forEach(listener=>listener(state));
        },
        getState(){
            console.log('return state');
            return JSON.parse(JSON.stringify(state));
        }
    }
}