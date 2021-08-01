import "./scss/index.scss";
import { Router } from "@core/routes/Router";
import { DashboardPage } from "@/pages/DashBoardPage";
import { ExcelPage } from "@/pages/ExcelPage";

// const store=createStore(rootReducer,storage('excel-state'));

// const stateListener=debounce(state=>{
//   storage('excel-state',state);
// },300);

// store.subscribe(stateListener);

// const excel=new Excel('#app',{
//   components:[Header,Toolbar,Formula,Table],
//   store
// });

// excel.render();

new Router("#app", {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
