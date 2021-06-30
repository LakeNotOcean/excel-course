const CODES={
    A:65,
    Z:90,
}

function createCol(col,resizeIndex=-1){
    return `
    <div class="column" data-type="resizable" data-col="${resizeIndex}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `;
}

function createCell(row,resizeIndex=-1){
    return `
    <div class="cell" contenteditable="true" 
    data-type="cell"
    data-col="${resizeIndex}" data-id="${row}:${resizeIndex}">
    </div> 
    `;
}

function createRow(index,content){
    const resize=index?`<div class="row-resize" data-resize="row"></div>`:``;
    return `
    <div class="row" data-type="resizable">
        <div class="row-info">
            ${index}
            ${resize}
        </div>
        <div class="row-data">
            ${content}
        </div>
    </div>
    `;
}

function toChar(_,index){
    return String.fromCharCode(CODES.A+index);
}

export function createTable(rowsCount=15){
    const colsCount=CODES.Z-CODES.A+1;

    const rows=[];

    const cols=new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createCol)
    .join('');
    
    
    rows.push(createRow('',cols));


    for (let i=0; i<rowsCount; ++i){
        const cells=new Array(colsCount)
            .fill('').map((_,col)=>createCell(i,col))
            .join('');
        rows.push(createRow(i+1,cells)); 
    }
    return rows.join('');
}