import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loaderNotif: document.querySelector('p.loader'),
  errorNotif: document.querySelector('p.error'),
};
let breedsArr = [];

showElem(refs.loaderNotif);

fetchBreeds()
  .then(breeds => {
    showElem(refs.breedSelect);
    renderBreedsOptions(breeds);
    breedsArr = [...breeds];
  })
  .catch(err => {
    showElem(refs.errorNotif);
  })
  .finally(() => {
    hideElem(refs.loaderNotif);
  });

refs.breedSelect.addEventListener('change', onBreedSelect);

function onBreedSelect() {
  const breedId = refs.breedSelect.value;
  const breed = breedsArr.find(breed => breed.id === breedId);

  hideElem(refs.errorNotif);
  hideElem(refs.catInfo);
  showElem(refs.loaderNotif);

  fetchCatByBreed(breedId)
    .then(cat => {
      showElem(refs.catInfo);
      renderCat(breed, cat[0].url);
    })
    .catch(err => {
      showElem(refs.errorNotif);
    })
    .finally(() => {
      hideElem(refs.loaderNotif);
    });
}

function renderBreedsOptions(breeds) {
  const markup = breeds
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  refs.breedSelect.innerHTML = markup;
}

function renderCat(breed, imgUrl) {
  const markup = `<img src="${imgUrl}" alt="${breed.name}" width="500">
      <h2>${breed.name}</h2>
      <p>Temperament: ${breed.temperament}</p>
      <p>${breed.description}</p>`;
  refs.catInfo.innerHTML = markup;
}

function showElem(elem) {
  elem.classList.remove('hidden');
}

function hideElem(elem) {
  elem.classList.add('hidden');
}
