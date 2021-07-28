import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom";
import { changeTitle } from "@/redux/action";
import { debounce } from "@core/utils";
import { ActiveRoute } from "@core/routes/ActiveRoute";
import { changeDate } from "@/redux/action";

export class Header extends ExcelComponent {
  static className = "excel__header";

  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input", "click"],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().title || "Новая Таблица";
    return `
        <input type="text" class="input" value="${title}"/>
        <div>
            <div class="button">
                <i class="material-icons" data-type="delete">delete</i>
            </div>
            <div class="button">
                <i class="material-icons" data-type="exit">exit_to_app</i>
            </div>
        </div>`;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === "exit") {
      ActiveRoute.navigate("");
    } else if ($target.data.type === "delete") {
      const isRemove = confirm("Удалить таблицу?");

      if (isRemove) {
        console.log("exel:" + ActiveRoute.param);
        localStorage.removeItem("excel:" + ActiveRoute.param);
        ActiveRoute.navigate("");
      }
    }
  }
}
