// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "名字 " + (spec.names || []).length + " 个，点按钮看去重结果。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    (spec.names || []).forEach(function (name, spot) {
      const card = document.createElement("div");
      card.className = "card" + (view.finals[spot] === name ? "" : " on");
      const head = document.createElement("h3");
      head.textContent = name;
      card.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip" + (view.finals[spot] === name ? "" : " ok");
      mark.textContent = view.finals[spot] === name ? "原样保留" : "改成 " + view.finals[spot];
      card.appendChild(mark);
      parts.stage.appendChild(card);
    });
    parts.legend.textContent = "改过名的条数 " + view.renamed + "，条数 " + view.count;
    parts.log.textContent = "是否都唯一 " + view.unique;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "去重并改名";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "再来一个同名";
  addButton.addEventListener("click", function () {
    spec.names = (spec.names || []).concat(["report"]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一个";
  dropButton.addEventListener("click", function () {
    spec.names = (spec.names || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一个名字";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "report";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { names: (spec.names || []).concat([box.value]) }));
      parts.out.textContent = box.value + " 被改成 " + view.finals[view.finals.length - 1];
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看改了几个";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "改过 " + view.renamed + " 个，是否都唯一 " + view.unique;
  });
  parts.controls.appendChild(readButton);

  draw();
}
