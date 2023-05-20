import { html, css, LitElement } from 'lit';

class CardComponent extends LitElement {
  static styles = css`
    /* Estilos del componente de la tarjeta */
    .card {
      width: 300px;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 10px;
      text-align: center;
      cursor: pointer; /* Cursor cambia a una mano al pasar por encima */
    }

    .card-image {
      max-width: 100%;
      height: auto;
      margin-bottom: 10px;
    }

    .card-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  `;

  static properties = {
    image: { type: String },
    title: { type: String },
    url: { type: String },
  };

  handleClick() {
    // Redirigir a la URL al hacer clic en la tarjeta
    window.location.href = this.url;
  }

  render() {
    return html`
      <div class="card" @click="${this.handleClick}">
        <img class="card-image" src="${this.image}" alt="Card Image" />
        <div class="card-title">${this.title}</div>
      </div>
    `;
  }
}

customElements.define('card-component', CardComponent);