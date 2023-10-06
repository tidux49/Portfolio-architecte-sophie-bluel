

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
        console.log(src);
        let alt = projet.title;
        console.log(alt);
        elem = document.createElement("figure");
        img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        elem.appendChild(img);
        figcaption = document.createElement("figcaption");
        figcaption.innerText = alt;
        elem.appendChild(figcaption);

        gallery.appendChild(elem);


    }
    // console.log(figure)

}

fetchget()
