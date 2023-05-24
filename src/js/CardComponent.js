import { html, render } from '../lib/lit-html.js';

export class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.image="";
    this.title="";
    this.id="";

    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = html`
    <style> 
    
    .card {
        width: 300px;
        border-radius: 4px;
        padding: 10px;
        text-align: center;
        cursor: pointer; 
        background-color:#fff;
        box-shadow: 5px 3px 10px #989898;
        transition: all 0.3s;
      }
    .card:hover{
      background-color:#E4B1AB;
    }
    
      .card-image {
        border-radius: 4px;
        max-width: 100%;
        height: auto;
        margin-bottom: 10px;
        height: 200px; 
        object-fit: cover; 
      }
  
      .card-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
         color:#DA5552;
      }
    
    </style>
    <div id="${this.id}" class="card" @click="${this.handleClick}">
        <img class="card-image" src="${this.image}" alt="Card Image" />
        <div class="card-title">${this.title}</div>
      </div>
    `;
    render(template, this.shadowRoot);
  }

  handleClick() {
    window.location.href = this.url;
  }
}

customElements.define('card-component', Card);
export default Card;