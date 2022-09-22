const librosContent = document.querySelector(".libros__content");

class Libros {
  async getLibros() {
    try {
      let result = await fetch("../json/libros.json");
      let data = await result.json();
      let libros = data.items;

      libros = libros.map((item) => {
        const title = item.title;
        const subtitle = item.subtitle;
        const image = item.image;
        const desc = item.desc.cubierta;
        const id = item.id;
        const category = item.category;

        return {
          title,
          subtitle,
          image,
          desc,
          id,
          category
        };
        
      });
      return result = libros;

    } catch (error) {
      console.log(error);
    }
  }
}


class LibrosUI {
  displayLibros(libros) {
    let result = "";
    libros.forEach(libro => {
      result += `
                <article class="libros__item">
                    <div class="libros__item--img">
                        <img src=${libro.image} alt="libro">
                    </div>
                    <div class="libros__item--text">
                        <h3>${libro.title}</h3>
                        <p>${libro.desc}</p>
                    </div>
                    <div class="libros__item--btn">
                        <a href="detalle.html?id=${libro.id}" class="btn btn--primary btn-detalle" data-id="${libro.id}">Detalle</a>
                    </div>
                </article>
            `;
    });
    librosContent.innerHTML = result;
  }
}



let category = "";
let libros = [];
let librosCategory = [];

function categoryValue() {
  let btnItems = document.querySelectorAll("[data-category]");
  btnItems.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let category = e.target.dataset.category;

      const ui = new LibrosUI();

      if (category === "todos") {
        ui.displayLibros(libros);
        btn.classList.add("active");

        if (btn.classList.contains("active")) {
          btnItems.forEach((btn) => {
            btn.classList.remove("active");
          });
          btn.classList.add("active");
        }

      } else {
        let librosCategory = libros.filter((libro) => libro.category === category);
        ui.displayLibros(librosCategory);
        btn.classList.add("active");

        if (btn.classList.contains("active")) {
          btnItems.forEach((btn) => {
            btn.classList.remove("active");
          });
          btn.classList.add("active");
        }
      }
    });
  });

}
categoryValue();


const query = new URLSearchParams(window.location.search)
let idQuery = query.get('id')


document.addEventListener("DOMContentLoaded", async () => {
  const librosLista = new Libros();
  const librosUI = new LibrosUI();

  libros = await librosLista.getLibros();

  if (idQuery) {
    librosUI.displayLibros(librosCategory);
  } else {
    librosUI.displayLibros(libros);
  };
});

