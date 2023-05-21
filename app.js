import { Card } from './src/js/CardComponent.js';
var categorias=[
    {
    title:"Abarrote",
    image:"https://clubdeltrade.com/wp-content/uploads/2019/01/Como_definir_o_mix_de_produtos_ideal.png",
    url:"comercio.html"
},
    {
    title:"Abarrotes",
    image:"https://clubdeltrade.com/wp-content/uploads/2019/01/Como_definir_o_mix_de_produtos_ideal.png",
    url:"comercio.html"
},
    {
    title:"Abarrotes",
    image:"https://clubdeltrade.com/wp-content/uploads/2019/01/Como_definir_o_mix_de_produtos_ideal.png",
    url:"comercio.html"
},
    {
    title:"Abarrotes",
    image:"https://clubdeltrade.com/wp-content/uploads/2019/01/Como_definir_o_mix_de_produtos_ideal.png",
    url:"comercio.html"
},
]
// fetch('https://api.example.com/cards')
//   .then(response => response.json())
//   .then(data => {
//     // Aquí puedes llamar a una función para renderizar los datos obtenidos
//     renderCards(data);
//   })
//   .catch(error => {
//     console.error('Error al obtener los datos de la API:', error);
//   });

function renderCards(categorias) {
    const container = document.getElementById('categorias-container');
    container.innerHTML = ''; // Limpia el contenedor antes de renderizar los nuevos componentes
  
    categorias.forEach(cardData => {
        const card = new Card();
        card.setAttribute('image', cardData.image);
        card.setAttribute('title', cardData.title);
        card.setAttribute('url', cardData.url);
        container.appendChild(card);
      });
  }
  renderCards(categorias);