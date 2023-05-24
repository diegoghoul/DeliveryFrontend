import { Card } from "./src/js/CardComponent.js";
import { Paginacion } from "./src/js/PaginacionComponent.js";
import { Desplegable } from "./src/js/DesplegableComponent.js";

if ("serviceWorker" in navigator) {
  // Verificar si el Service Worker ya está registrado
  if (navigator.serviceWorker.controller) {
    console.log("El Service Worker ya está registrado.");
  } else {
    // Registrar el Service Worker
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(function (registration) {
        console.log(
          "Service Worker registrado exitosamente:",
          registration.scope
        );
      })
      .catch(function (error) {
        console.log("Error al registrar el Service Worker:", error);
      });
  }
} else {
  console.log("Service Worker no es compatible con este navegador.");
}
var categoriasImgs = [
  "https://equipment21.com/wp-content/uploads/lista-de-productos-para-abarrotes.jpg",
  "https://www.vivamisalud.com/wp-content/uploads/2018/08/comidarapida_web2.jpg",
  "https://m.media-amazon.com/images/I/711P8bnZSTL._AC_UF894,1000_QL80_.jpg",
  "https://media.admagazine.com/photos/618a5d11532cae908aaf27ab/master/w_1600%2Cc_limit/96644.jpg",
  "https://www.america-retail.com/static//2021/04/cafeteria900-e1623425806925.jpeg",
  "https://s2.abcstatics.com/media/estilo/2021/05/07/apertura-joyas-small-ku5B--1248x698@abc.jpg",
  "https://globalestacionesdeservicio.com/wp-content/uploads/2015/10/gasolineras.jpg",
  "https://i0.wp.com/www.silocreativo.com/wp-content/uploads/2014/01/descripcion-categorias-wordpress.png?fit=666%2C370&quality=100&strip=all&ssl=1",
  "https://equipment21.com/wp-content/uploads/lista-de-productos-para-abarrotes.jpg",
  "https://www.vivamisalud.com/wp-content/uploads/2018/08/comidarapida_web2.jpg",
  "https://m.media-amazon.com/images/I/711P8bnZSTL._AC_UF894,1000_QL80_.jpg",
  "https://media.admagazine.com/photos/618a5d11532cae908aaf27ab/master/w_1600%2Cc_limit/96644.jpg",
  "https://www.america-retail.com/static//2021/04/cafeteria900-e1623425806925.jpeg",
  "https://s2.abcstatics.com/media/estilo/2021/05/07/apertura-joyas-small-ku5B--1248x698@abc.jpg",
  "https://globalestacionesdeservicio.com/wp-content/uploads/2015/10/gasolineras.jpg",
  "https://i0.wp.com/www.silocreativo.com/wp-content/uploads/2014/01/descripcion-categorias-wordpress.png?fit=666%2C370&quality=100&strip=all&ssl=1",
];
var categorias;
var comercios;

// async function getdata () {
//   let valores =   fetch('http://localhost:8080/ParcialTPI/tipocomercio')
//                   .then(response => response.json());
//   return valores;
// }
async function cargarJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    const jsonData = await response.json();
    return jsonData.sort(((a, b) => b.comercioTipoComercioList.length - a.comercioTipoComercioList.length));;
  } catch (error) {
    console.log(error);
  }
}

const cardsPerPage = 6;
let currentPage = 1;
var estado = {
  view: "categorias",
  idCategoria: "",
  nombreCategoria: "populares",
  idComercio: "",
  nombreComercio: "",
};

function renderCategorias(categorias, id) {
  //Deshabilitar boton retroceder en la pagina principal
  const retrocederBtn = document.getElementById("retroceder-btn");
  retrocederBtn.setAttribute("disabled", "");

  const footer = document.getElementById("footer");
  const container = document.getElementById("categorias-container");
  const titulo = document.getElementById("main-title");
  container.innerHTML = ""; // Limpia el contenedor antes de renderizar los nuevos componentes
  footer.innerHTML = ""; // Limpia el contenedor antes de renderizar los nuevos componentes

  var cardsToRender;

  //Renderizar dependiendo de si quiere ver las categorias mas populares o todas
  if (id == "todas") {
    //Si se quieren renderizar todas
    titulo.innerHTML = "Todas las categorias";
    cardsToRender = categorias;
    cardsToRender.forEach((categoriaCard) => {
      const card = new Card();
      card.setAttribute(
        "image",
        categoriasImgs[categoriaCard.idTipoComercio - 1]
      );
      card.setAttribute("title", categoriaCard.nombre);
      card.setAttribute("id", categoriaCard.idTipoComercio);
      card.addEventListener("click", (event) => {
        renderComercios(
          categoriaCard.nombre,
          categoriaCard.idTipoComercio,
          currentPage
        );
      });
      container.appendChild(card);
    });
  } else {
    //Si se quieren renderizar solo las populares
    titulo.innerHTML = " Categorias populares";
    cardsToRender = categorias.slice(0, 6);
    cardsToRender.forEach((categoriaCard) => {
      const card = new Card();
      card.setAttribute(
        "image",
        categoriasImgs[categoriaCard.idTipoComercio - 1]
      );
      card.setAttribute("title", categoriaCard.nombre);
      card.setAttribute("id", categoriaCard.idTipoComercio);
      card.addEventListener("click", (event) => {
        renderComercios(
          categoriaCard.nombre,
          categoriaCard.idTipoComercio,
          currentPage
        );
      });
      container.appendChild(card);
    });
    const card = new Card();
    card.setAttribute("image", categoriasImgs[7]);
    card.setAttribute("title", "Ver todas las categorias");
    card.setAttribute("id", "todas");
    card.addEventListener("click", (event) => {
      setTimeout(() => {
        renderCategorias(categorias, "todas");
      }, "500");
    });

    container.appendChild(card);
  }
}

function renderComercios(nombreCategoria, idCategoria, page) {
  estado.view = "comercios";
  estado.idCategoria = idCategoria;
  estado.nombreCategoria = nombreCategoria;
  estado.idComercio = "";
  estado.nombreComercio = "";

  //Controlar el boton retroceder
  const retrocederBtn = document.getElementById("retroceder-btn");
  retrocederBtn.removeAttribute("disabled");
  retrocederBtn.addEventListener("click", (event) => {
    currentPage = 1;
    renderCategorias(categorias, "populares");
  });

  const footer = document.getElementById("footer");
  const container = document.getElementById("categorias-container");
  const titulo = document.getElementById("main-title");
  titulo.innerHTML = `Comercios de ${nombreCategoria}`; //Cambiar titulo de la pagina
  container.innerHTML = ""; // Limpia el contenedor antes de renderizar los nuevos componentes
  footer.innerHTML = ""; // Limpia el contenedor antes de renderizar los nuevos componentes
  //Encontrar los comercios que son de la categoria seleccionada
  var comerciosTotales = [];
  comercios.forEach((comercio) => {
    if (
      comercio.comercioTipoComercioList[0].comercioTipoComercioPK
        .idTipoComercio == idCategoria
    ) {
      comerciosTotales.push(comercio);
    }
  });
  //Manejar la paginacion
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const cardsToRender = comerciosTotales.slice(startIndex, endIndex);
  //Renderizar solo las primeras 6 cards de los comercios
  cardsToRender.forEach((comercioCard) => {
    const card = new Card();
    card.setAttribute("image", categoriasImgs[comercioCard.idComercio - 1]);
    card.setAttribute("title", comercioCard.nombre);
    card.setAttribute("id", comercioCard.idComercio);
    card.addEventListener("click", (event) => {
      estado.view = "productos";
      estado.id = comercioCard.idComercio;
      estado.nombre = comercioCard.nombre;
      renderProductos(
        comercioCard.nombre,
        comercioCard.idComercio,
        currentPage
      );
    });
    container.appendChild(card);
  });

  //Renderizar la paginacion
  const paginacion = new Paginacion();
  paginacion.setAttribute("current-page", currentPage);
  paginacion.setAttribute(
    "total-pages",
    Math.ceil(comerciosTotales.length / cardsPerPage)
  );
  paginacion.addEventListener("page-change", (event) => {
    handlePageChange(event.detail);
  });
  footer.appendChild(paginacion);
}

function renderProductos(nombreComercio, idComercio, page) {
  estado.view = "productos";
  estado.idComercio = idComercio;
  estado.nombreComercio = nombreComercio;

  //Controlar el boton retroceder
  const retrocederBtn = document.getElementById("retroceder-btn");
  retrocederBtn.addEventListener("click", (event) => {
    currentPage = 1;
    renderComercios(estado.nombreCategoria, estado.idCategoria, currentPage);
  });
  const footer = document.getElementById("footer");
  const container = document.getElementById("categorias-container");
  const titulo = document.getElementById("main-title");
  titulo.innerHTML = `Productos de ${nombreComercio}`; //Cambiar titulo de la pagina
  container.innerHTML = ""; // Limpia el contenedor antes de renderizar los nuevos componentes
  footer.innerHTML = ""; // Limpia el contenedor antes de renderizar los nuevos componentes
  //Encontrar los comercios que son de la categoria seleccionada
  var productosTotales = [];
  var sucursales=[];
  comercios.forEach((comercio) => {
    if (comercio.idComercio == idComercio) {
      productosTotales = comercio.productoComercioList;
      for(var i=0;i<comercio.sucursalList.length;i++){
        sucursales.push(comercio.sucursalList[i].nombre)
      }
    }
  });
  //Manejar la paginacion
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const cardsToRender = productosTotales.slice(startIndex, endIndex);
  //Renderizar solo las primeras 6 cards de los comercios
  cardsToRender.forEach((productoCard) => {

    const card = new Card();
    card.setAttribute("image", categoriasImgs[productoCard.index]);
    card.setAttribute("title", productoCard.nombre);
    card.setAttribute("id", productoCard.idProducto);
    container.appendChild(card);
    
    
  });

  //Renderizar la paginacion
  const paginacion = new Paginacion();
  paginacion.setAttribute("current-page", currentPage);
  paginacion.setAttribute(
    "total-pages",
    Math.ceil(productosTotales.length / cardsPerPage)
  );
  paginacion.addEventListener("page-change", (event) => {
    handlePageChange(event.detail);
  });
  footer.appendChild(paginacion);

  const desplegable = new Desplegable();
  desplegable.setAttribute("items",sucursales );
  container.appendChild(desplegable);
}

function handlePageChange(page) {
  if (estado.view == "comercios") {
    currentPage = page;
    renderComercios(estado.nombreCategoria, estado.idCategoria, currentPage);
    const pagination = document.querySelector("paginacion-component");
    pagination.setAttribute("current-page", currentPage);
  } else if (estado.view == "productos") {
    currentPage = page;
    renderProductos(estado.nombreComercio, estado.idComercio, currentPage);
    const pagination = document.querySelector("paginacion-component");
    pagination.setAttribute("current-page", currentPage);
  }
}

// categorias = await getdata();
categorias = await cargarJSON("/src/js/tipocomercio.json");
comercios = await cargarJSON("/src/js/comercio.json");

renderCategorias(categorias, estado.nombreCategoria);
