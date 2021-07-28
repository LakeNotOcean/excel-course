import { Excel } from "@/components/excel/excel";
import { Formula } from "@/components/formula/formula";
import { Header } from "@/components/header/header";
import { Table } from "@/components/table/table";
import { Toolbar } from "@/components/toolbar/toolbar";
import { createStore } from "@core/createStore";
import { rootReducer } from "@/redux/rootReducer";
import { storage, debounce } from "@core/utils";
import { Page } from "@core/Page";
import { normalizeInitialState } from "@/redux/initialState";

function storageName(param) {
  return "excel:" + param;
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    const pageName = storageName(this.params);

    const state = storage(pageName);
    const initialState = normalizeInitialState(state);
    const store = createStore(rootReducer, initialState);

    const stateListener = debounce((state) => {
      storage(pageName, state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
