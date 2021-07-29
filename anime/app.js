// <!-- by ibrahim jomaa @div.luffy -->
const containers = document.querySelector('.container')
const btn_search = document.querySelectorAll('.btn_search')
const inpt_search = document.querySelector('.inpt_search')
const myanime = document.querySelector('.myanime')
const search_pagini = document.querySelector('.search_pagini')


btn_search.forEach(btn=>{
    btn.addEventListener('click', ()=>{
    containers.innerHTML = ''
    let query = inpt_search.value
    let page = 1
    let url2 = `https://api.jikan.moe/v3/search/${btn.getAttribute('data-category')}?q=${query}&page=1`
    sendData(url2) 
    window.addEventListener('scroll',()=>{
        const {scrollTop, scrollHeight, clientHeight} = document.documentElement
        if(clientHeight + scrollTop >= scrollHeight - 20){
            page < 8 ? page++ : console.log("last page");
            url2 = `https://api.jikan.moe/v3/search/anime?q=${query}&page=${page}`
            sendData(url2) 
    }})
})})


function sendData(url2){
    fetch(url2).then(getData=>{return getData.json()}).then(data=>{
        for (let x = 0; x < 50; x++) {
            dataCardAnimeList(data, x)
        }
    })

}

function dataCardAnimeList(data, x){
    containers.innerHTML += `
    <div class="card">
       <div class="img-card">
           <img src="${data.results[x].image_url}">
       </div>
       <div class="info-card">
           <div class="type">
               <span>${data.results[x].type}</span>
           </div>
           <div class="title">
               <span>${data.results[x].title}</span>
           </div>
           <div class="synopsis">
               <span>${data.results[x].synopsis}</span>
           </div>
       </div>
    </div>
            `
}
let num = 15
imgHome(num)

window.addEventListener('scroll',()=>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement
    if(clientHeight + scrollTop >= scrollHeight - 20){
        num+=15
        imgHome(num)
}})

// home
function imgHome(num){
let caregory = ['waifu','neko','shinobu','megumin','bully','cuddle','cry','hug','awoo','kiss','lick','pat','smug','bonk','yeet','blush','smile','wave','highfive','handhold','nom','bite','glomp','slap','kill','kick','happy','wink','poke','dance','cringe']
for (let i = 0; i < num; i++) {
    let url = `https://api.waifu.pics/sfw/${caregory[i]}`
    fetch(url).then(getData=>{return getData.json()}).then(data=>{
        // console.log(data.url);
        containers.innerHTML += `
        <div class="img-card-main">
                <img src="${data.url}">
        </div>
        
        `
    })
}
}

myanime.addEventListener('click',()=>{
    location.reload()
})

