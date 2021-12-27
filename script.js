'use strict';
document.body.innerHTML += `<nav class="navbar navbar-light bg-light">Anime Search</nav>
<div class="container jumbotron">
    <form class="form input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Enter the Anime series</span>
        </div>
        <input type="text" class="form-control" name="searchbar" id="searchbox" placeholder="Search any keywords"/>
    </form>

    <div class="display conatiner" id="output"></div>
</div>`;

let data = [];
const getAPI = async() =>{
    try {
        const api_data = await fetch("https://api.jikan.moe/v3/search/anime?q=anime");
        let json_data = await api_data.json();
        console.log(json_data);
        data = await json_data.results;
        console.log(data);
        let textEntered= searchbox.value;
        console.log(textEntered);
    
        //create an empty array 
        let filteredAnime=[];
        if(textEntered!==""){
            filteredAnime=data.filter(function(anime){
            return anime.title.toUpperCase().includes(textEntered.toUpperCase())
            });
            console.log(filteredAnime);
            anime_list.innerHTML="";
            displayAnime(filteredAnime);
        
        }else{
                anime_list.innerHTML="";
        }
    } catch (error) {
        console.log("error", error);
    }
};


let anime_list = document.getElementById("output");
let search_anime = document.getElementById("searchbox");

searchbox.addEventListener("keyup",function(){
    getAPI();
});

function displayAnime(elements){
    let temp= "";
    elements.forEach(element => {
        temp = `<div class="card" style="width: 18rem; height:45rem">
            <img src="${element.image_url}" class="card-img-top" alt="poster" style="max-height:20rem">
            <div class="card-body">
            <h4 class="card-title">${element.title}</h4>
            <p class="card-text"><b>Start date</b>: ${element.start_date} <br> <b>End date</b>: ${element.end_date}</p>
            <p class="card-text">Type: ${element.type}</p>
            <p class="card-text">IMDB rating: ${element.score}</p>
            <a href="${element.url}" class="btn btn-link">Learn more -></a>
            </div>
            </div>`;
            anime_list.innerHTML += temp;        
    });
};