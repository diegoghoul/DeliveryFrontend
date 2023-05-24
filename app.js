import { Card } from './src/js/CardComponent.js';
import { Paginacion } from './src/js/PaginacionComponent.js';
import { Desplegable } from './src/js/DesplegableComponent.js';

if ('serviceWorker' in navigator) {
  // Verificar si el Service Worker ya está registrado
  if (navigator.serviceWorker.controller) {
    console.log('El Service Worker ya está registrado.');
  } else {
    // Registrar el Service Worker
    navigator.serviceWorker.register('/serviceWorker.js')
      .then(function(registration) {
        console.log('Service Worker registrado exitosamente:', registration.scope);
      })
      .catch(function(error) {
        console.log('Error al registrar el Service Worker:', error);
      });
  }
} else {
  console.log('Service Worker no es compatible con este navegador.');
}

var categorias = [
    {
        title: "Abarrote",
        image: "https://editorialtelevisa.brightspotcdn.com/wp-content/uploads/2019/04/hot-dog-aderezo-tocino.png",
        url: "comercio.html"
      },
    {
        title: "Comida rapida",
        image: "https://editorialtelevisa.brightspotcdn.com/wp-content/uploads/2019/04/hot-dog-aderezo-tocino.png",
        url: "comercio.html"
      },
    {
        title: "Restaurantes",
        image: "https://clubdeltrade.com/wp-content/uploads/2019/01/Como_definir_o_mix_de_produtos_ideal.png",
        url: "comercio.html"
      },
    {
        title: "Medicina",
        image: "https://copykat.com/wp-content/uploads/2023/01/Air-Fryer-Hot-Dogs-Pin-8.jpg",
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

async function getdata () {
  let valores =   fetch('http://localhost:8080/ParcialTPI/tipocomercio')
                  .then(response => response.json());
  return valores;
}


var items=['Centro', 'Metrocentro', 'Las ramblas']

const cardsPerPage = 6;
let currentPage = 1;



function renderCards(categorias, page) {


  const footer = document.getElementById('footer');
  const container = document.getElementById('categorias-container');
  container.innerHTML = ''; // Limpia el contenedor antes de renderizar los nuevos componentes
  footer.innerHTML = ''; // Limpia el contenedor antes de renderizar los nuevos componentes
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const cardsToRender = categorias.slice(startIndex, endIndex);
 
  cardsToRender.forEach(cardData => {
    const card = new Card();
    card.setAttribute('image', "https://clubdeltrade.com/wp-content/uploads/2019/01/Como_definir_o_mix_de_produtos_ideal.png");
    card.setAttribute('title', cardData.nombre);
    card.setAttribute('url', "hola");
    container.appendChild(card);
  });
  const desplegable=new Desplegable();
  desplegable.setAttribute('items',items)
  container.appendChild(desplegable)

  const paginacion= new Paginacion();
  paginacion.setAttribute('current-page', currentPage);
  paginacion.setAttribute('total-pages', Math.ceil(categorias.length / cardsPerPage));
  paginacion.addEventListener('page-change', (event) => {
    handlePageChange(event.detail);
  });
  footer.appendChild(paginacion);
}

function handlePageChange(page) {
  currentPage = page;
  renderCards(categorias, currentPage);
  const pagination = document.querySelector('paginacion-component');
  pagination.setAttribute('current-page', currentPage);
}





categorias = await getdata();
renderCards(categorias, currentPage);
