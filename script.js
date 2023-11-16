const API_KEY = "b937cf05ae5b452ea97044dc9d74c7c9";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query) {
    const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}
function reload(){
    window.location.reload();
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const templateCards = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "";

    // Use slice to get the first 10 elements
    articles.slice(0, 17).forEach((article) => {
        if (!article.urlToImage) return;
        const cardsClone = templateCards.content.cloneNode(true);
        fillDataInCard(cardsClone, article);
        cardsContainer.appendChild(cardsClone);
    });
}


function fillDataInCard(cardsClone, article) {
    const newsImg = cardsClone.querySelector("#news-img");
    const newsSrc = cardsClone.querySelector("#img-source");
    const newsTitle = cardsClone.querySelector("#news-title");
    const newsDesc = cardsClone.querySelector("#news-description");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US', {
        timeZone: "Asia/Jakarta"
    });
    newsSrc.innerHTML = `${article.source.name} . ${date}`;

    cardsClone.firstElementChild.addEventListener("click" , ()=>{
        window.open(article.url , "_blank");
    })
}

let curSelectedItem = null;
function onNavItemClick(id){
    fetchNews(id);  
    const navItem = document.getElementById(id);
    curSelectedItem?.classList.remove('active');
    curSelectedItem = navItem;
    curSelectedItem.classList.add('active')
}
const srcUrl = "https://newsapi.org/v2/top-headlines?sources=";

async function fetchNewscategories(source) {
    const res = await fetch(`${srcUrl}${source}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function footerclick(id) {
    fetchNewscategories(id);
    const navItem = document.getElementById(id);
    curSelectedItem?.classList.remove('active');
    curSelectedItem = navItem;
    curSelectedItem.classList.add('active');
}


function onFooterItemClick(id){
    fetchNews(id);  
    const navItem = document.getElementById(id);
    curSelectedItem?.classList.remove('active');
    curSelectedItem = navItem;
    curSelectedItem.classList.add('active')
}






const searchButton = document.getElementById('search-btn');
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click" , () => {
    const value = searchText.value;
    if(!value) return ;
    fetchNews(value);
    curSelectedItem?.classList.remove('active');
    curSelectedItem = null;

})


