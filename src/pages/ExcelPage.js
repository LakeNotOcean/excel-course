import { Excel } from "@/components/excel/excel";
import { Formula } from "@/components/formula/formula";
import { Header } from "@/components/header/header";
import { Table } from "@/components/table/table";
import { Toolbar } from "@/components/toolbar/toolbar";
import { createStore } from "@core/store/createStore";
import { rootReducer } from "@/redux/rootReducer";
import { StateProcessor, LocalStorageClient } from "@core/page/StateProcessor";
import { Page } from "@core/page/Page";
import { normalizeInitialState } from "@/redux/initialState";

export class ExcelPage extends Page {
  constructor(param) {
    super(param);

    this.storeSub = null;
    this.processor = new StateProcessor(new LocalStorageClient(this.params));
  }

  async getRoot() {
    //const params = this.params ? this.params : Date.now().toString();
    //const pageName = storageName(this.params);

    // const state = storage(pageName);
    // const initialState = normalizeInitialState(state);

    // const stateListener = debounce((state) => {
    //   storage(pageName, state);
    // }, 300);

    // this.storeSub = store.subscribe(stateListener);

    const state = await this.processor.get();
    const initialState = normalizeInitialState(state);
    const store = createStore(rootReducer, initialState);
    this.storeSub = store.subscribe(this.processor.listen);

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
    this.storeSub.unsubscribe();
  }
}
