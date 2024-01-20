const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=2b1d8a9fbd904564b4ecbdd2d5129fbf";
const backupImage = " https://images.unsplash.com/photo-1495020689067-958852a7765e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D"

const cards = document.querySelector(".cards")
const category = document.querySelector(".category")
const categorySpan = document.querySelectorAll(".category span")

const sendRequest = async (url) => {
    try{
        const response = await fetch(url);
        const data = await response.json()
       return data;
    }

    catch(error){
       console.log(error)
    }
}
function SendUrlRequest(url){
    sendRequest(url).then((data)=>{
        data.articles.forEach((article)=>{
         console.log(article)
           cards.innerHTML += `<div class="card">
           <div class="image">
               <img src="${article.urlToImage ? article.urlToImage : backupImage }"/>
           </div>
                <div class="information">
               <div>
                   <p class="title">${article.title}</p>
                   <p class="description">${article.description ? article.description : "No description given." }</p>
                   <p class="time">
                       <span>${article.publishedAt.replace("Z", "").split("T")[1]}</span>
                       <span>${article.publishedAt.replace("Z", "").split("T")[0]}</span>
                   </p>
               </div>
               <div class="other">
                   <span class="source">${article.source.name ? article.source.name : "Unknown Source"}</span>
                   <a href="${article.url}" class="url"  target="_blank">Read Article<ion-icon name="arrow-forward-outline" class="link-icon"></ion-icon></a>
               </div>
           </div>
       </div>`
        })
     })
     .catch((error)=>{console.log(error)})
}

category.addEventListener("click",(e)=>{
    if(e.target.tagName === "SPAN"){
        cards.innerHTML = "";
        categorySpan.forEach((item)=>{item.classList.remove("active")})
        e.target.classList.add("active")
        SendUrlRequest(e.target.dataset.url)
    }
})

SendUrlRequest(url)

