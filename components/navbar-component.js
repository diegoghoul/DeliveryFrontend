import { html, css, LitElement } from 'lit';

class Navbar extends LitElement {
  static styles = css`
    .navbar {
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
  `;

  render() {
    return html`
      <div class="navbar">
        <span class="navbar-title">DeliveryApp</span>
        <div class="navbar-links">
          <a class="navbar-link" href="/">Inicio</a>
          <a class="navbar-link" href="/instalar">Instalar</a>
        </div>
      </div>
    `;
  }
}

customElements.define('navbar-component', Navbar);