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

    set taskList(newArr) {
      const oldArr = this.data;
      this.data = newArr.reverse();
      if (newArr.length) {
        this.drawTasks(newArr, oldArr);
      }
    }

    get taskList() {
      return this.data;
    }

    drawTasks(newArr = [], oldArr=[]) {
      const list = this;
      const createTask = (element) => {
        const task = document.createElement('wj-task');
        task.textContent = element.name;
        task.dataset.id = element.id;
        return task;
      }

      if (newArr.length > oldArr.length) {
        newArr.forEach((newItem, i) => {
          if (!oldArr.find(oldItem => oldItem.id === newItem.id)) {
            list.insertBefore(createTask(newItem), list.firstChild);
          }
        })
      }

      if (newArr.length < oldArr.length) {
        oldArr.forEach((oldItem, i) => {
          if (!newArr.find(newItem => oldItem.id === newItem.id)) {
            const deletedTask = list.querySelector(`[data-id="${oldItem.id}"]`);
            deletedTask.parentNode.removeChild(deletedTask);
          }
        })
      }

    }

    disconnectedCallback() { }

    connectedCallback() {
      restApi.getTasks();
    }
  }
  window.customElements.define('wj-task-list', wjTaskList);
}();