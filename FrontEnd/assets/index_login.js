
let gallery = document.querySelector("#gallery");
let modal_gallery = document.querySelector("#modal_gallery");
let figure = "";
let fecthedData
let btn_modifier = document.getElementById("modification");
let add_modal = document.getElementById("modal1");
let elem_modal = ""
let modal2 = document.getElementById("modal2");
let btn_modal = document.getElementById("modal_btn");
let photo = document.getElementById("photo");
let titre = document.getElementById("Titre");
let categorie = document.getElementById("categorie");
let filtres__button_tous = document.getElementById("filtres__button--tous");
let filtres__button_objets = document.getElementById("filtres__button--objets");
let filtres__button_appartements = document.getElementById("filtres__button--appartements");
let filtres__button_hotels = document.getElementById("filtres__button--hotels");
let token = localStorage.getItem("token");
let project_number = 0;

async function fetchget() {
    await fetch("http://localhost:5678/api/works").then((response) =>
        response.json().then((data) => {
            console.log(data);
            fecthedData = data;
            tab_maker(data)
            modal_maker(data)
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
        // ajout de la catégorie de l'élément

        gallery.appendChild(elem);
    }
}
// Partie modals, ici réutilisation du fetch pour charger iamge de la première modal
function modal_maker(fecthedData) {
        project_number = 0;
    for (let m_projet of fecthedData) {
        let div_img = document.createElement("div");
        div_img.className = "div_img";
        let m_src = m_projet.imageUrl;
        let m_alt = m_projet.title;
        m_img = document.createElement("img");
        m_img.src = m_src;
        m_img.alt = m_alt;
        m_img.className = "m_img"
        modal_gallery.appendChild(div_img);
        div_img.appendChild(m_img)
        // création logo suppression
        bin = document.createElement("div");
        div_img.appendChild(bin);
        bin_logo = document.createElement("i");
        bin_logo.className ="fa-solid fa-trash-can";
        bin.appendChild(bin_logo); 
        // association projet bouton
        bin.className = "bin";
        bin.id = m_projet.id;

    }
    suppression();
}
//partie refresh
function add_classname_reset(element){
    element.className = "reset";
}
function refresh(){
    let All_refresh_gallery = gallery.children;
    for(element of All_refresh_gallery){
        add_classname_reset(element);
    }
    let All_refresh_Modalgallery = modal_gallery.children;
    for(element of All_refresh_Modalgallery){
        add_classname_reset(element);
    }
    gallery.children.className = "reset";
    modal_gallery.children.className = "reset";
    image_reset = document.querySelectorAll(".reset");
    image_reset.forEach(element =>{
        element.style.display = "none";
    })
    fetchget();

}

// change css pour appartion modals
hors_modal1 = document.getElementById("modal1");
hors_modal2 = document.getElementById("modal2");

add_modal.style.display = "none";
modal2.style.display = "none";

function modal(){
    add_modal.style.display = "block";
    add_modal.style.zIndex = 1;
    hors_modal1.style.zIndex= 0;
    ferme_modal2();

}
function next_modal(){
    modal2.style.display = "block";
    modal2.style.zIndex = 1;
    add_modal.style.display = "none";
}
function sans_modal1(){
    add_modal.style.display = "none";
}
function sans_modal2(){
    reset_modal2();
    ferme_modal2();
}
function ferme_modal2(){
    modal2.style.display = "none";
    reset_preview_image();
}

function reset_preview_image(){
    let fa_image = document.querySelector(".fa-image");
    let photo_label = document.querySelector(".photo_label");
    let image_remove = document.getElementById("image_selection");
    if (fa_image.style.display == "none"){
        image_remove.remove();
        fa_image.style.display = "block";
        photo_label.style.display = "block";}
    document.getElementById("form_modal").reset();   

}

//fin appartion des modals
fetchget();
btn_modifier.addEventListener("click", modal);
btn_modal.addEventListener("click", next_modal);

//fermeture des modals

//femreture par clique exterieur

hors_modal1.addEventListener("click",(e) => {
    if(e.target == add_modal){
        sans_modal1();
    }
});

hors_modal2.addEventListener("click",(e) => {
    if(e.target == modal2){
        ferme_modal2();
    }
});

//fermeture par icone
croix_modal1 = document.getElementById("fermeture_modal1");
croix_modal2 = document.getElementById("fermeture_modal2");
retour_modal2 = document.getElementById("retour_modal2");

croix_modal1.addEventListener("click",sans_modal1);
croix_modal2.addEventListener("click",ferme_modal2);
retour_modal2.addEventListener("click",modal);



// partie ajouter une nouvelle photo, (new_photo = récup info + fetchpost)

//Ajout de la photo
const image_pré_ajout = document.querySelector("[name=photo]");
function affichage_image(){
let image_selection = document.createElement("img");
image_selection.id = "image_selection";
image_selection.className = "image_preview";
console.log(image_pré_ajout.files[0]);
let file_data = image_pré_ajout.files[0];

// récupération de l'image pour l'afficher
if (file_data) {
    const reader = new FileReader();

    reader.onload = function(e) {
        image_selection.src = e.target.result;
    };

    reader.readAsDataURL(file_data);}
let fa_image = document.querySelector(".fa-image");
let photo_label = document.querySelector(".photo_label");
fa_image.style.display = "none";
photo_label.style.display = "none";
// form_photo_p.style.display = "none";
const form_photo = document.querySelector(".form-photo");
form_photo.appendChild(image_selection);
}
image_pré_ajout.addEventListener("change", affichage_image);

function reset_modal2(){
    let fa_image = document.querySelector(".fa-image");
let photo_label = document.querySelector(".photo_label");
let form_photo_p = document.querySelector(".form-photo_p");
let image_selection = document.querySelector(".image_preview"); 
    fa_image.style.display = "block";
    photo_label.style.display = "flex";
    form_photo_p.style.display = "block";
    image_selection.style.display = "none";    
}
//formulaire valider
const formul = document.querySelector("#form_modal");




function Getmultipart(event){
    const title= event.target.querySelector("[name=Titre]").value;
    const image= event.target.querySelector("[name=photo]").files[0];
    const categoryId= event.target.querySelector("[name=categorie]").value;

    console.log("GetCredentials" +title+" "+image+" "+categoryId);

    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("title", title);
    formdata.append("category", +categoryId);
    console.log("Getmultipart" +formdata);

    return (formdata);
}

async function fetchLogin(multipart) {
    return fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: multipart,
        headers: {"Authorization" : "bearer "+token}
    });
}

async function new_photo(event) {


    const multipart =  Getmultipart (event);

    const response = await fetchLogin(multipart);
    console.log("fetch" +response);
    modal();
    refresh();
 if (response.status === 400) {
    alert("Merci de remplir tous les champs");
} else if (response.status === 500) {
    alert("Erreur serveur");
} else if (response.status === 401) {
    alert("Vous n'êtes pas autorisé à ajouter un projet");}

    //const ResponseJson = await response.json();

    //console.log(ResponseJson);
}
function unlock_btn(){
    const title= document.querySelector("[name=Titre]").value;
    const image= document.querySelector("[name=photo]").files[0];
    const categoryId= document.querySelector("[name=categorie]").value;

    const unlock_btn = document.getElementById("modal2_btn");
    
    if(title != null & image != null & categoryId != null){
        unlock_btn.style.background = "#1D6154";
    }
    else{
        unlock_btn.style.background = "grey";
    }
}

formul.addEventListener("change", unlock_btn);

formul.addEventListener("submit", async function (event) {
    event.preventDefault();
    await new_photo(event);
    sans_modal2();
})




//fin partie ajouter nouvelle photo


//Partie suppression des images


function suppression(){
bin_click = document.querySelectorAll(".bin");
bin_click.forEach(element => {
    element.addEventListener("click", () => {
        fetch("http://localhost:5678/api/works/"+element.id,{
            method : "DELETE",
            headers : {"Authorization" : "bearer "+token}
        }).then(response => {

            if(response.status==204){
                refresh();

            }
            else{
                console.log("erreur" + response.status);
            }
        });
        })
    })

    }
    
