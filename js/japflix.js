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
            h2 = document.createElement('h2'),
            p = document.createElement('p'),
            span = document.createElement('span');
         

         h2.textContent = pelicula.title;
         h2.appendChild(span);
         
         li.appendChild(h2);
         lista.appendChild(li)
      });
   }
   
   if (!(busqueda == "")) {
      
      let 
         resultBusqueda = movies.filter(a => (a.title.toLowerCase().includes(busqueda.toLowerCase()))   ||
                                             (checkGenero(a.genres, busqueda.toLowerCase()))            ||
                                             (a.tagline.toLowerCase().includes(busqueda.toLowerCase())) ||
                                             (a.overview.toLowerCase().includes(busqueda.toLowerCase())));

      mostrarElementos(resultBusqueda);
   }
})
