
let gallery = document.querySelector("gallery");
let figure="";

get();
async function get (){
await fetch("http://localhost:5678/api/works").then((response)=>
    response.json().then((data)=>{
        console.log(data);
        for (let projet of data) {
            let src  = projet.imageUrl;
            console.log(src);
            let alt = projet.title;
            console.log(alt);
            figure +=`
            <figure>
                <img src=${src} alt="photo"${alt}>
                <figcaption>${alt}</figcaption>
            </figure>
            `;
        };
}
    ));}
    gallery.appendChild(figure); 

