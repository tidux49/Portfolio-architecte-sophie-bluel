

let gallery = document.querySelector("#gallery");
let figure = "";
let fecthedData

async function fetchget() {
    await fetch("http://localhost:5678/api/works").then((response) =>
        response.json().then((data) => {
            console.log(data);
            fecthedData = data;
            tab_maker(data)
        }));
}

function tab_maker(fecthedData) {
    for (let projet of fecthedData) {
        let src = projet.imageUrl;
        let alt = projet.title;
        elem = document.createElement("figure");
        img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        elem.appendChild(img);
        figcaption = document.createElement("figcaption");
        figcaption.innerText = alt;
        elem.appendChild(figcaption);
        if(projet.category.name=="Objets"){
            elem.className = "categorie_objet";
        }
        else if(projet.category.name=="Appartements"){
            elem.className = "categorie_appart";
        }
        else if(projet.category.name=="Hotels & restaurants"){
            elem.className = "categorie_hotel";
        }

        gallery.appendChild(elem);


    }
    // console.log(figure)

}

fetchget();

//categories

let filtres__button_tous = document.getElementById("filtres__button--tous");
let filtres__button_objets = document.getElementById("filtres__button--objets");
let filtres__button_appartements = document.getElementById("filtres__button--appartements");
let filtres__button_hotels = document.getElementById("filtres__button--hotels");

let categorie_objet = document.getElementsByClassName("categorie_objet");
let categorie_appart = document.getElementsByClassName("categorie_appart");
let categorie_hotel = document.getElementsByClassName("categorie_hotel");

function coloration(target){
    filtres__button_tous.style.background = "white";
    filtres__button_objets.style.background = "white";
    filtres__button_appartements.style.background = "white";
    filtres__button_hotels.style.background = "white";
    filtres__button_tous.style.color = "#1D6154";
    filtres__button_objets.style.color = "#1D6154";
    filtres__button_appartements.style.color = "#1D6154";
    filtres__button_hotels.style.color = "#1D6154";

    target.style.background = "#1D6154";
    target.style.color = "white";
}

function tri_tous(){
    for(let objet of categorie_objet){
        objet.style.display = "block";
    }
    for(let appart of categorie_appart){
        appart.style.display = "block";
    }
    for(let hotel of categorie_hotel){
        hotel.style.display = "block";
    }
    coloration(filtres__button_tous);
}

function tri_objets(){
    for(let objet of categorie_objet){
        objet.style.display = "block";
    }
    for(let appart of categorie_appart){
        appart.style.display = "none";
    }
    for(let hotel of categorie_hotel){
        hotel.style.display = "none";
    }
    coloration(filtres__button_objets);
}

function tri_apparts(){
    for(let objet of categorie_objet){
        objet.style.display = "none";
    }
    for(let appart of categorie_appart){
        appart.style.display = "block";
    }
    for(let hotel of categorie_hotel){
        hotel.style.display = "none";
    }
    coloration(filtres__button_appartements);
}

function tri_hotels(){
    for(let objet of categorie_objet){
        objet.style.display = "none";
    }
    for(let appart of categorie_appart){
        appart.style.display = "none";
    }
    for(let hotel of categorie_hotel){
        hotel.style.display = "block";
    }
    coloration(filtres__button_hotels);
}

filtres__button_tous.addEventListener("click",tri_tous);
filtres__button_objets.addEventListener("click", tri_objets);
filtres__button_appartements.addEventListener("click", tri_apparts);
filtres__button_hotels.addEventListener("click", tri_hotels);
