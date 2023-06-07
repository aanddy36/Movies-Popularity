let contenedor = document.querySelector(".content");
let btns = document.querySelectorAll(".decision button");
//let btnMovies = document.querySelector(".btn-movies");
//let btnActors = document.querySelector(".btn-actors");
let specialWord = document.querySelector("#title-acent");
let btnPages = document.querySelectorAll(".btn-page");
let actualPage = document.querySelector(".current p");
let page = 1;
let selectedOption = "movie";
btnPages.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        if(btn.classList[1] === "prior"){
            if(page>1){
                page = Number(actualPage.innerHTML)-1;
                actualPage.innerHTML = page;
                btns.forEach((btn)=>{
                    if(btn.classList[1] === "selected-btn"){
                        loadMoviesOrActors(btn.classList[0], page);
                    }
                })
            }
        }else if(btn.classList[1] === "next"){
            if(page < 100){
                page = Number(actualPage.innerHTML)+1;
                actualPage.innerHTML = page;
                btns.forEach((btn)=>{
                    if(btn.classList[1] === "selected-btn"){
                        loadMoviesOrActors(btn.classList[0], page);
                    }
                })
            }}
    });
});
btns.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        if(!(btn.classList[1]=== "selected-btn")){
            btns.forEach(btn=>btn.classList.remove("selected-btn"));
            btn.classList.add("selected-btn");
        }
        if(btn.classList[0]==="person"){
            page = 1;
            actualPage.innerHTML = page;
            specialWord.innerHTML = "actors";
            selectedOption = "person";
            loadMoviesOrActors(selectedOption, page);
        }else{
            page = 1;
            actualPage.innerHTML = page;
            specialWord.innerHTML = "movies";
            selectedOption = "movie";
            loadMoviesOrActors(selectedOption, page);
        }
    });

})

async function loadMoviesOrActors(movieOrPerson, page){
    try{
        const response = await fetch(`https://api.themoviedb.org/3/${movieOrPerson}/popular?api_key=2e7092078ba03dac9c58a1825ce925e1&language=en-US&page=${page}`);
        if(response.status === 200){
            let data = await response.json();
            data = data.results;
            //console.log(data);
            let text = "";
            if(movieOrPerson == "movie"){
                data.forEach((movie, ranking) =>{
                    text += `<div class="movies">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="movies-image">
                    <p class="movies-ranking">${ranking+1+(20*(page-1))}</p>
                    <h1 class="movies-titles">${movie.title}</h1>
                </div>`
                })
            }else if(movieOrPerson == "person"){
                data.forEach((actor, ranking) =>{
                    text += `<div class="movies">
                    <img src="https://image.tmdb.org/t/p/w500/${actor.profile_path}" class="movies-image">
                    <p class="movies-ranking">${ranking+1+(20*(page-1))}</p>
                    <h1 class="movies-titles">${actor.name}</h1>
                </div>`
                })
            }
            contenedor.innerHTML = text;
        }
        else{
            console.log("The request wasnt succesful");
        }
    }catch(error){
        console.log("Something went wrong");
    }
}
loadMoviesOrActors("movie", 1);

//async function loadMoviesOrActors(){
//    try{
//        const response = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=2e7092078ba03dac9c58a1825ce925e1&language=en-US&page=1`);
//        if(response.status === 200){
//           let data = await response.json();
//           data = data.results;
//           //console.log(data);
//           let text = "";
//           data.forEach((actor, ranking) =>{
//               text += `<div class="movies">
//               <img src="https://image.tmdb.org/t/p/w500/${actor.profile_path}" class="movies-image">
//                <p class="movies-ranking">${ranking+1}</p>
//               <h1 class="movies-titles">${actor.name}</h1>
//            </div>`
//           })
//           contenedor.innerHTML = text;
//       }
//       else{
//            console.log("The request wasnt succesful");
//        }
//    }catch(error){
//        console.log("Something went wrong");
//   }
//}