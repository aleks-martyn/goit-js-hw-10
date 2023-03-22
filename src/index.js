import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(event) {
  fetchCountries(event)
    .then(countries => {
      const array = [];
      for (const country of countries) {
        if (
          country.name.official
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        )
          array.push(country);
      }
      console.log(array);
      if (array.length === 1) {
        renderCountryInfo(array);
      } else {
        renderList(array);
      }
    })
    .catch(error => console.log(error));
}

function fetchCountries(name) {
  return fetch(
    'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages'
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function renderList(countries) {
  const markup = countries
    .map(country => {
      return `<li style="display:flex; align-items:center; gap:10px">
        <img src="${country.flags.svg}" alt="${country.flags.alt}" width=35 height=25 />
        <p>${country.name.official}</p>
      </li>`;
    })
    .join('');

  listEl.innerHTML = markup;
}

function renderCountryInfo(countries) {
  const languagesArray = Object.values(countries[0].languages);

  const markup = countries
    .map(country => {
      return `<div>
        <img src="${country.flags.svg}" alt="${country.flags.alt}" width=35 height=25 />
        <p>${country.name.official}</p>
        <p><b>Capital</b>: ${country.capital}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Languages</b>: ${languagesArray}</p>
      </div>`;
    })
    .join('');
  console.log(markup);

  infoEl.innerHTML = markup;
}
