const imageContainer = document.getElementById("image-container")
const loader = document.getElementById("loader")

const count = 30
const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

let photoArray = []
let ready = false;
let imagesLoaded = 0
let Totalimages = 0


function setAttributes(element, attribute){
    for(const key in attribute){
    element.setAttribute(key, attribute[key])
    }

}

function loaded (){
    imagesLoaded++
    if(imagesLoaded === Totalimages){
        ready = true
        loader.hidden = true;

    }
}

function displayPhotot(){
    imagesLoaded = 0
    Totalimages = photoArray.length
    photoArray.forEach(photo=>{
        const item = document.createElement("a")
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        const img = document.createElement("img")
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })  
        img.addEventListener("load", loaded)

        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}



async function getPotoFromApi(){
    try {
        const response = await fetch(apiUrl)
        photoArray = await response.json()
        displayPhotot()
    } catch (error) {
        // Catch Error
    }
}

window.addEventListener("scroll",()=>{
     if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false
        getPotoFromApi()

     }
})

getPotoFromApi()