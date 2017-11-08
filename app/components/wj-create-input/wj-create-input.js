
! function() {
  var importedDoc = document.currentScript.ownerDocument;
  class wjCreateInput extends HTMLElement {
    constructor() {
      super();
      let template =  importedDoc.getElementById('tmpl');
      let clone = document.importNode(template.content, true);
      this.attachShadow({mode: 'open'}).appendChild(clone);
      this.addEventListener('keydown', this.pressEnterHandler);
    }

    pressEnterHandler(e) {
      if (e.which == 13) {
        e.preventDefault();
        restApi.createTask(this.shadowRoot.querySelector('.input').textContent);
        this.shadowRoot.querySelector('.input').textContent = ''
      }

    }

    disconnectedCallback() {
      this.removeEventListener('keydown', this.pressEnderHandler);
    }
    
    connectedCallback() {
      this.shadowRoot.querySelector('.input').focus();
    }
  }
  window.customElements.define('wj-create-input', wjCreateInput);
}();