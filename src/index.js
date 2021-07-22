import { Excel } from '@components/excel/excel'
import { Formula } from './components/formula/formula';
import { Header } from './components/header/header';
import { Table } from './components/table/table';
import { Toolbar } from './components/toolbar/toolbar';
import { createStore } from '@core/createStore';
import { rootReducer } from './redux/rootReducer';
import  './scss/index.scss'
import { storage, debounce } from './core/utils';


const store=createStore(rootReducer,storage('excel-state'));

const stateListener=debounce(state=>{
  storage('excel-state',state);
},300);

store.subscribe(stateListener); 

const excel=new Excel('#app',{
  components:[Header,Toolbar,Formula,Table],
  store
});   

excel.render();