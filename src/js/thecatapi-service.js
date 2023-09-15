export class TheCatApiService {
  #BASE_URL;
  #API_KEY;

  constructor() {
    this.breedsArray = [];

    this.#BASE_URL = 'https://api.thecatapi.com/v1';
    this.#API_KEY =
      'live_GIm3L1A7z07oZ1YMdbJ3yUYKSgG5KUN0oRDsa1nPSYa57eIYnHAJLvpJiG707HOV';
  }

  fetchBreeds() {
    const url = `${this.#BASE_URL}/breeds`;
    return this.fetchUrl(url);
  }

  fetchCatByBreed(breedId) {
    const url = `${this.#BASE_URL}/images/search?
  breed_ids=${breedId}`;
    return this.fetchUrl(url);
  }

  fetchUrl(url) {
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }

  get breedsArr() {
    return this.breedsArray;
  }
  set breedsArr(newArray) {
    this.breedsArray = newArray;
  }
}
