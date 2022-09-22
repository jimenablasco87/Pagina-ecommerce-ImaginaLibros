const librosContent = document.querySelector(".detalles__content");
const getURL = new URLSearchParams(window.location.search);
id = getURL.get('id');
console.log(id);



class Libros {
  async getLibros() {
    try {
      let result = await fetch('../json/libros.json');
      let data = await result.json();
      let libros = data.items;

      return result = libros;
    } catch (error) {
      console.log(error);
    }
  }
}

let libros = [];

class LibrosUI {
  displayLibros(libros) {
    let result = "";
    libros.forEach(libro => {
      if(libro.id == id) {
      result += `
      <article class="detalle__container">
      <div class="detalle__img">
        <img src="${libro.image}" alt="">
      </div>
      <div class="detalle__content">
        <h3 class="detalle__title">${libro.title}</h3>
        <div class="detalle__description">
          <p><span>Cubierta: </span> ${libro.desc.cubierta}</p>
          <p><span>Medidas: </span> ${libro.desc.medidas}</p>
          <p><span>Peso: </span> ${libro.desc.peso}</p>
          <p><span>Descripción: </span> ${libro.desc.descripcion}</p>
        </div>
      </div>
    </article>
            `;
          };
    });
    librosContent.innerHTML = result;
  }
}





document.addEventListener("DOMContentLoaded", async () => {
  const librosLista = new Libros();
  const librosUI = new LibrosUI();


  libros = await librosLista.getLibros();

  if(id) {
    librosUI.displayLibros(libros)
  }
});



