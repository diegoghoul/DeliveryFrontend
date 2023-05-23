import { html, render } from '../lib/lit-html.js';

class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
 
  
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = html`
    <style>
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #8e79ba;
      padding: 10px;
      height:40px;
      border-radius: 0 0 8px 8px;
    }
    
    .navbar-title {
      font-weight: bold;
      font-size: 20px;
      color: white;
    }
    
    .navbar-links {
      display: flex;
      gap: 10px;
      
    }
    
    .navbar-link {
      text-decoration: none;
      color: #ffffff;
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

  
}

customElements.define('nav-bar', Navbar);
