! function() {
  class wjTask extends HTMLElement {
    constructor() {
      super();
      let template =  document.currentScript.ownerDocument.getElementById('tmpl');
      let clone = document.importNode(template.content, true);
      this.attachShadow({mode: 'open'}).appendChild(clone);
      this.clickHandler = this.clickHandler.bind(this);
      this.shadowRoot.querySelector('.checkbox').addEventListener('click', this.clickHandler);
    }

    clickHandler() {
      let evt = new Event('alert-box-click', {bubbles: true, composed: true});
      this.dispatchEvent(evt);
      this.classList.add('done');
      setTimeout(() => {
        this.parentNode.removeChild(this);
      }, 1000);
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