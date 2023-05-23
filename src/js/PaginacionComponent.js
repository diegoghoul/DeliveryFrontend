import { html, render } from '../lib/lit-html.js';

export class Paginacion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentPage = 1;
    this.totalPages = 0;

    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  static get observedAttributes() {
    return ['current-page', 'total-pages'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    switch (name) {
      case 'current-page':
        this.currentPage = parseInt(newValue, 10);
        break;
      case 'total-pages':
        this.totalPages = parseInt(newValue, 10);
        break;
    }
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = html`
      <style>
        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .pagination button {
          background-color: #8e79ba;
          border: none;
          color: white;
          padding: 5px 10px;
          margin: 0 5px;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.3s;
        }

        .pagination button:hover {
          background-color: #cfbcdf;
        }

        .pagination button:disabled {
          cursor: not-allowed;
          background-color: #ccc;
        }
      </style>
      <div class="pagination">
        <button @click="${this.handlePrevious}" ?disabled="${this.currentPage === 1}">
          Anterior
        </button>
        <span>Pagina ${this.currentPage} de ${this.totalPages}</span>
        <button @click="${this.handleNext}" ?disabled="${this.currentPage === this.totalPages}">
          Siguiente
        </button>
      </div>
    `;
    render(template, this.shadowRoot);
  }

  handlePrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.dispatchEvent(new CustomEvent('page-change', { detail: this.currentPage }));
    }
    
  }

  handleNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.dispatchEvent(new CustomEvent('page-change', { detail: this.currentPage }));
    }
   
  }
}

customElements.define('paginacion-component', Paginacion);
export default Paginacion;