import { getData } from './api';
import { createCards } from './markup';
import { Notify } from 'notiflix';
// import axios from 'axios';

const formEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const btnEl = document.querySelector('.js-btn');
let page = 1;
let value = '';

formEl.addEventListener('submit', onSubmit);
btnEl.addEventListener('click', onClick);

async function onSubmit(e) {
  try {
    e.preventDefault();
    btnEl.classList.add('hidden');
    value = e.target.elements.searchQuery.value.trim();
    if (!value) {Notify.warning(`Sorry, there are no images matching your search query. Please try again.`)
      return;
    }
    page = 1;
    const { totalHits, hits } = await getData(value, page);
    const markup = createCards(hits);
    clearMarkup();
    addMarkup(markup);
    if (hits.length === 40) {
      btnEl.classList.remove('hidden');
    }
    console.log(hits.length)
    if (hits.length >0){Notify.success(`Hooray! We found ${totalHits} images.`)}
    
    if(hits.length===0){Notify.warning(`Sorry, there are no images matching your search query. Please try again`)}
  } catch (error) {
    console.log(error.message);
    Notify.failure(`We're sorry, but you've reached the end of search results.`)
  }
}

async function onClick() {
  try {
    page += 1;
    console.log(page*40)
    // if(hits=[]){Notify.failure(`123  Sorry, there are no images matching your search query. Please try again.`)}
    
    const { totalHits, hits } = await getData(value, page);
    const markup = createCards(hits);
    addMarkup(markup);
    if (hits.length * page >= totalHits) {
      btnEl.classList.add('hidden')
      Notify.failure(`We're sorry, but you've reached the end of search results.`)
    }
  } catch (error) {
    // console.log(error.message);
    Notify.failure(`Щось підшло не так(`)
  }
}

function addMarkup(markup = '') {
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  galleryEl.innerHTML = '';
}


