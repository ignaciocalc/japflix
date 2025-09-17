const 
   linkMovies = "https://japceibal.github.io/japflix_api/movies-data.json",
   lista = document.getElementById("lista"),
   buscar = document.getElementById("btnBuscar"),
   inputBuscar = document.getElementById("inputBuscar");

let 
   movies = [];


fetch(linkMovies)
   .then(response => response.json())
   .then(response => movies = response);

buscar.addEventListener("click", function(){
   const 
      busqueda = inputBuscar.value;
   
   function checkGenero(arreglo, busqueda) {
      for (let genero of arreglo)
         if (genero.name.toLowerCase().includes(busqueda))
            return true
         else
            return false
   }
   
   function mostrarElementos(resultBusqueda){
      resultBusqueda.forEach(pelicula => {
         const
            li = document.createElement('li'),
            h2 = document.createElement('h1'),
            p = document.createElement('p'),
            estrellas = document.createElement('span'),
            estrellasVoto = Math.trunc(pelicula.vote_average/2); 

         h2.textContent = pelicula.title;
         estrellas.className = "contEstrellas"
         h2.appendChild(estrellas);

         //crear estrellas marcadas
         for (let i = 1; i <= estrellasVoto; i++) {
            const
               estrella = document.createElement('span');
            
            estrella.className = "fa fa-star checked";
            estrellas.appendChild(estrella);
         }

         //crear strellas faltantes
         for (let i = 1; i <= 5 - estrellasVoto; i++) {
            const
               estrella = document.createElement('span');
            
            estrella.className = "fa fa-star";
            estrellas.appendChild(estrella);
         }

         p.textContent = pelicula.tagline;
         
         li.appendChild(h2);
         li.appendChild(p)
         lista.appendChild(li)
      });   
   }
   
   if (!(busqueda == "")) {
      
      let 
         resultBusqueda = movies.filter(a => (a.title.toLowerCase().includes(busqueda.toLowerCase()))   ||
                                             (checkGenero(a.genres, busqueda.toLowerCase()))            ||
                                             (a.tagline.toLowerCase().includes(busqueda.toLowerCase())) ||
                                             (a.overview.toLowerCase().includes(busqueda.toLowerCase())));
      
      lista.replaceChildren();
      
      mostrarElementos(resultBusqueda);
   }
})
