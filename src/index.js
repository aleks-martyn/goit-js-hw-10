import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', handleInput);

function handleInput(event) {
  fetchCountries(name)
    .then(countries => renderList(countries))
    .catch(error => console.log(error));
}

function fetchCountries(name) {
  return;
  fetch(
    'https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags.svg,languages'
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
