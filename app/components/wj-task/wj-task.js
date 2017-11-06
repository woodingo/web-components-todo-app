
! function() {
  var importedDoc = document.currentScript.ownerDocument;
  class wjTask extends HTMLElement {
    constructor() {
      super();
      let template =  importedDoc.getElementById('tmpl');
      let clone = document.importNode(template.content, true);
      this.attachShadow({mode: 'open'}).appendChild(clone);
      this.clickHandler = this.clickHandler.bind(this);
      this.shadowRoot.querySelector('.checkbox').addEventListener('click', this.clickHandler);
    }

    clickHandler() {
      this.classList.add('done');
      setTimeout(() => {
        deleteTask(this.dataset.id);
      }, 200);
    }

    disconnectedCallback() {
      this.removeEventListener('click', this.clickHandler);
    }
    
    connectedCallback() {
      // this.classList.add('ready');
    }
  }
  window.customElements.define('wj-task', wjTask);
}();