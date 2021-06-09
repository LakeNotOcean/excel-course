import { Excel } from '@components/excel/excel'
import { Formula } from './components/formula/formula';
import { Header } from './components/header/header';
import { Table } from './components/table/table';
import { Toolbar } from './components/toolbar/toolbar';
import  './scss/index.scss'


const excel=new Excel('#app',{
  components:[Header,Toolbar,Formula,Table]
});   

excel.render();