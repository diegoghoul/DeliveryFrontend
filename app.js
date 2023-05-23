import { Card } from './src/js/CardComponent.js';

var categorias = [
    {
        title: "Abarrote",
        image: "https://clubdeltrade.com/wp-content/uploads/2019/01/Como_definir_o_mix_de_produtos_ideal.png",
        url: "comercio.html"
      },
    {
        title: "Abarrote",
        image: "https://clubdeltrade.com/wp-content/uploads/2019/01/Como_definir_o_mix_de_produtos_ideal.png",
        url: "comercio.html"
      },
    {
        title: "Abarrote",
        image: "https://clubdeltrade.com/wp-content/uploads/2019/01/Como_definir_o_mix_de_produtos_ideal.png",
        url: "comercio.html"
      },
    {
        title: "Abarrote",
        image: "https://clubdeltrade.com/wp-content/uploads/2019/01/Como_definir_o_mix_de_produtos_ideal.png",
        url: "comercio.html"
      },
    {
        title: "Abarrote",
        image: "https://clubdeltrade.com/wp-content/uploads/2019/01/Como_definir_o_mix_de_produtos_ideal.png",
        url: "comercio.html"
      },
    {
        title: "Abarrote",
        image: "https://clubdeltrade.com/wp-content/uploads/2019/01/Como_definir_o_mix_de_produtos_ideal.png",
        url: "comercio.html"
      },
    {
        title: "Abarrote",
        image: "https://clubdeltrade.com/wp-content/uploads/2019/01/Como_definir_o_mix_de_produtos_ideal.png",
        url: "comercio.html"
      },
    {
        title: "Abarrote",
        image: "https://clubdeltrade.com/wp-content/uploads/2019/01/Como_definir_o_mix_de_produtos_ideal.png",
        url: "comercio.html"
      },
    {
        title: "Abarrote",
        image: "https://clubdeltrade.com/wp-content/uploads/2019/01/Como_definir_o_mix_de_produtos_ideal.png",
        url: "comercio.html"
      },

];

const cardsPerPage = 6;
let currentPage = 1;

function renderCards(categorias, page) {
  const container = document.getElementById('categorias-container');
  container.innerHTML = ''; // Limpia el contenedor antes de renderizar los nuevos componentes

  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const cardsToRender = categorias.slice(startIndex, endIndex);

  cardsToRender.forEach(cardData => {
    const card = new Card();
    card.setAttribute('image', cardData.image);
    card.setAttribute('title', cardData.title);
    card.setAttribute('url', cardData.url);
    container.appendChild(card);
  });
}

function handlePageChange(page) {
  currentPage = page;
  renderCards(categorias, currentPage);
  const pagination = document.querySelector('paginacion-component');
  pagination.setAttribute('current-page', currentPage);
}


customElements.whenDefined('paginacion-component').then(() => {
  const pagination = document.querySelector('paginacion-component');
  pagination.setAttribute('current-page', currentPage);
  pagination.setAttribute('total-pages', Math.ceil(categorias.length / cardsPerPage));
  pagination.addEventListener('page-change', (event) => {
    handlePageChange(event.detail);
  });
});

renderCards(categorias, currentPage);
