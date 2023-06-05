import { getData } from './api';
import { createCards } from './markup';
import { Notify } from 'notiflix';
// import axios from 'axios';

const formEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const btnEl = document.querySelector('.js-btn');
let page = 1;
let value = '';//2)перезаписуємо

formEl.addEventListener('submit', onSubmit);
btnEl.addEventListener('click', onClick);

async function onSubmit(e) {
  try {
    e.preventDefault();
    btnEl.classList.add('hidden');// по замовчуваню скрита
    value = e.target.elements.searchQuery.value.trim();//1)вводимо данні
    if (!value) {Notify.warning(`Sorry, there are no images matching your search query. Please try again.`)//3)перевіряємо якщо є дані, якщо є продувжуємо
      return;
    }
    page = 1;//4)викликаємо getData з value і page, отримуємо обєкт з 2 властивостями totalHits і hits.
    const { totalHits, hits } = await getData(value, page);
    console.log(hits) // [{},{},{}, .....], кожен обєкт це данні фото
    const markup = createCards(hits);//5) створюємо розмітку, з hit
    clearMarkup();//чистимо розмітку
    addMarkup(markup);//6)додаємо розмітку в html
    if (hits.length < 40){
      btnEl.classList.add("hidden")
    }
    else{
      btnEl.classList.remove("hidden")
    }
    //7)якщо зображень >= 40, то показуємо кнопку
    // if (hits.length >= 40) {
    //   btnEl.classList.remove("hidden");
    //   }
    console.log(hits.length*page)
    //8)якщо зображення є
    if (hits.length >0){Notify.success(`Hooray! We found ${totalHits} images.`)}
    //9)якщо зображень немає
    if(hits.length===0){Notify.warning(`Sorry, there are no images matching your search query. Please try again`)}
  } catch (error) {
    console.log(error.message);
    Notify.failure(`We're sorry, but you've reached the end of search results.`)
  }
}

async function onClick() {
  try {
    page += 1;    
    
    const { totalHits, hits } = await getData(value, page);
    const markup = createCards(hits);
    addMarkup(markup);
  
    if (page>totalHits/40) {
      btnEl.classList.add("hidden")
      Notify.failure(`We're sorry, but you've reached the end of search results.`)
    }
  } catch (error) {
    // console.log(error.message);
    Notify.failure(`Щось пішло не так(`)
  }
}

function addMarkup(markup = '') {
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  galleryEl.innerHTML = '';
}


// hits.length * page >= totalHits)