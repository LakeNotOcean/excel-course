import {evaluate} from 'mathjs';

export function parse(value=''){
    if (value.startsWith('=')){
        let res='';

        try {
            res=evaluate(value.slice(1));
        }
        catch(e){
            return value;
        }
        return res;
    }
    console.log('value in parse is: ',typeof(value));
    return value;
}