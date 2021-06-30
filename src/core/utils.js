export function capitalize(string){
    if (typeof string !=='string')
        return '';
    return string.charAt(0).toUpperCase()+string.slice(1);
}

export function range(start,end){
    if (start>end){
        start=start^end;
        end=start^end;
        start=start^end;
    }
    return [...Array(end-start+1).keys()].map(i=>i+start);
}

export function matrix(target,current){

    const cols=range(current.col,target.col);
    const rows=range(current.row,target.row);   

    return cols.reduce((acc,col)=>{
        rows.forEach(row=>acc.push(`${row}:${col}`));
        return acc;
    },[]);
}

export function nextSelector(key,col,row){
    console.log(key);
    switch(key){
        case 'Enter':
        case 'ArrowDown':
            row++;
            break;
        case 'Tab':
        case 'ArrowRight':
            col++;
            break;
        case 'ArrowLeft':
            col--;
            break;
        case 'ArrowUp':
            row--;
            break;
        
    }
    return `[data-id="${row}:${col}"]`;

}