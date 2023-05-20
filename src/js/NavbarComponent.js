import { html, render } from '../lib/lit-html.js';

class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.data = '¡Hola, mundo!';
    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = html`
    <style>.navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f2f2f2;
      padding: 10px;
    }
    
    .navbar-title {
      font-weight: bold;
      font-size: 20px;
    }
    
    .navbar-links {
      display: flex;
      gap: 10px;
    }
    
    .navbar-link {
      text-decoration: none;
      color: #333333;
    }
    
    </style>
    <div class="navbar">
    <span class="navbar-title">DeliveryApp</span>
    <div class="navbar-links">
      <a class="navbar-link" href="/">Inicio</a>
      <a class="navbar-link" href="/instalar">Instalar</a>
    </div>
  </div>
    `;
    render(template, this.shadowRoot);
  }

  handleClick() {
    this.data = '¡Hiciste clic!';
    this.render();
  }
}

customElements.define('nav-bar', Navbar);
