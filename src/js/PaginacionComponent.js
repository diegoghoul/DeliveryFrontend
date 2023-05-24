import { html, render } from "../lib/lit-html.js";

export class Paginacion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.currentPage = 1;
    this.totalPages = 0;

    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  static get observedAttributes() {
    return ["current-page", "total-pages"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    switch (name) {
      case "current-page":
        this.currentPage = parseInt(newValue, 10);
        break;
      case "total-pages":
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
          background-color: #da5552;
          border: none;
          color: #fff;
          padding: 5px 10px;
          margin: 0 5px;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.3s;
        }

        .pagination button:hover {
          background-color: #e4b1ab;
        }

        .pagination button:disabled {
          cursor: not-allowed;
          background-color: #ccc;
          color: #fff;
        }
        .pagination button svg {
          width: 15px;
          height: 15px;
          margin-top: 3px;
          filter: invert(100%);
        }
      </style>

      <div class="pagination">
        <button
          class="anterior-btn"
          @click="${this.handlePrevious}"
          ?disabled="${this.currentPage === 1}"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 30 30"
          >
            <path
              d="M 19.980469 3.9902344 A 1.0001 1.0001 0 0 0 19.292969 4.2929688 L 9.2929688 14.292969 A 1.0001 1.0001 0 0 0 9.2929688 15.707031 L 19.292969 25.707031 A 1.0001 1.0001 0 1 0 20.707031 24.292969 L 11.414062 15 L 20.707031 5.7070312 A 1.0001 1.0001 0 0 0 19.980469 3.9902344 z"
            ></path>
          </svg>
        </button>
        <span>${this.currentPage} de ${this.totalPages}</span>
        <button
          @click="${this.handleNext}"
          ?disabled="${this.currentPage === this.totalPages}"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 30 30"
          >
            <path
              d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"
            ></path>
          </svg>
        </button>
      </div>
    `;
    render(template, this.shadowRoot);
  }

  handlePrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.dispatchEvent(
        new CustomEvent("page-change", { detail: this.currentPage })
      );
    }
  }

  handleNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.dispatchEvent(
        new CustomEvent("page-change", { detail: this.currentPage })
      );
    }
  }
}

customElements.define("paginacion-component", Paginacion);
export default Paginacion;
