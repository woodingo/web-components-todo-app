! function() {
  var importedDoc = document.currentScript.ownerDocument;
  class wjTaskList extends HTMLElement {
    constructor() {
      super();
      let template =  importedDoc.getElementById('tmpl');
      let clone = document.importNode(template.content, true);
      this.attachShadow({mode: 'open'}).appendChild(clone);
      this.taskList = [];
      this.deleteTask = this.deleteTask.bind(this);
    }

    set taskList(arr) {
      this.data = arr.reverse();
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
        task.addEventListener('task-delete', this.deleteTask);
        task.textContent = element.name;
        task.dataset.id = element.id;
        this.appendChild(task);
      });
    }

    deleteTask(ev) {
      const taskList = this.taskList;
      taskList.splice(ev.target.dataset.id, 1)
      this.taskList = taskList;
    }

    disconnectedCallback() { }

    connectedCallback() {}
  }
  window.customElements.define('wj-task-list', wjTaskList);
}();