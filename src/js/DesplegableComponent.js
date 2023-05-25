import { html, render } from '../lib/lit-html.js';

export class Desplegable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.items = [];

    this.handleClick = this.handleClick.bind(this);
  }

  static get observedAttributes() {
    return ['items'];
  }

  attributeChangedCallback(nameAtr, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    
    if (nameAtr === 'items') {
      this.items = newValue.split(',');
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = html`
      <style>
        .dropdown {
          position: relative;
          display: inline-block;
          
        }
        .dropdown button {
            background-color:#DA5552;
            border: none;
            border-radius: 8px;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
        }
        .dropdown button svg {
            width: 25px;
            height: 25px;
            margin-right: 8px;
            margin-bottom: -5px;
          }
        .dropdown-content {
          display: none;
          text-align:center;
          position: absolute;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
        }

        .dropdown-content a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          cursor:pointer;
          transition: all 0.3s;
        }
        .dropdown-content a:hover {
          background-color:#E4B1AB;
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }
      </style>

      <div class="dropdown">
        <button @click="${this.handleClick}">Sucursales <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 9l-7 7-7-7"></path>
      </svg></button>
        <div class="dropdown-content">
          ${this.items.map((item) => html`<a href='https://goo.gl/maps/pqJNUSHZLvjx8U6Q9' target="_blank">${item}</a>`)}

        </div>
      </div>
    `;
    
    render(template, this.shadowRoot);
  }

  handleClick() {
   
  }
}

customElements.define('desplegable-component', Desplegable);
export default Desplegable;
