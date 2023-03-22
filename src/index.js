import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from "./my-module";

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
            .includes(event.target.value.toLowerCase().trim())
        )
          array.push(country);
      }

      console.log(array);
      if(array.length > 10) {Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")}
      else if (array.length > 1) {
        renderList(array);
      } else {
        renderCountryInfo(array);
      }
    })
    .catch(error => console.log(error));
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
  if (countries.length > 0) {
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
}