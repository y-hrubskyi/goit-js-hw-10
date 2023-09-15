import SlimSelect from 'slim-select';
import { Notify } from 'notiflix';
import { TheCatApiService } from './thecatapi-service';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loaderNotif: document.querySelector('p.loader'),
  errorNotif: document.querySelector('p.error'),
};

const theCatApiService = new TheCatApiService();

theCatApiService
  .fetchBreeds()
  .then(breeds => {
    showElem(refs.breedSelect);
    createBreedsOptions(breeds);
    new SlimSelect({
      select: refs.breedSelect,
    });
    theCatApiService.breedsArr = [...breeds];
  })
  .catch(err => {
    showError();
  })
  .finally(() => {
    hideElem(refs.loaderNotif);
  });

refs.breedSelect.addEventListener('change', onBreedSelect);

function onBreedSelect() {
  const breedId = refs.breedSelect.value;
  const breed = theCatApiService.breedsArr.find(breed => breed.id === breedId);

  hideElem(refs.catInfo);
  showElem(refs.loaderNotif);

  theCatApiService
    .fetchCatByBreed(breedId)
    .then(cat => {
      showElem(refs.catInfo);
      renderCat(breed, cat[0].url);
    })
    .catch(err => {
      showError();
    })
    .finally(() => {
      hideElem(refs.loaderNotif);
    });
}

function createBreedsOptions(breeds) {
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

function showError(elem) {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}
