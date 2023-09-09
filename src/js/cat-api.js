import { BASE_URL } from './constants';

function fetchBreeds() {
  const url = `${BASE_URL}/breeds`;
  return fetchUrl(url);
}

function fetchCatByBreed(breedId) {
  const url = `${BASE_URL}/images/search?breed_ids=${breedId}`;
  return fetchUrl(url);
}

function fetchUrl(url) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
