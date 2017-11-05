
! function() {
  var importedDoc = document.currentScript.ownerDocument;
  class wjTaskList extends HTMLElement {
    constructor() {
      super();
      let template =  importedDoc.getElementById('tmpl');
      let clone = document.importNode(template.content, true);
      this.attachShadow({mode: 'open'}).appendChild(clone);
      this.taskList = [];
    }

    set taskList(arr) {
      this.data = arr;
      if (arr.length) {
        this.drawTasks(arr);
      }
    }

    get taskList() {
      return this.data;
    }

    drawTasks(arr = []) {
      this.innerHTML = ''
      arr.forEach(element => {
        const task = document.createElement('wj-task');
        task.textContent = element.text;
        this.appendChild(task);
      });
    }

    disconnectedCallback() { }

    connectedCallback() {}
  }
  window.customElements.define('wj-task-list', wjTaskList);
}();