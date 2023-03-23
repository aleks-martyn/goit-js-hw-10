import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from "./fetchCountries";

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(event) {
  const countryName = event.target.value.trim();
  clearMarkup();

  fetchCountries(countryName)
    .then(countries => {
      console.log(countries);

      if (countries.length > 10) { Notiflix.Notify.info("Too many matches found. Please enter a more specific name."); }
      else if (countries.length > 1) {
        renderList(countries);
      } else {
        renderCountryInfo(countries);
      }
    })
    .catch(error => Notiflix.Notify.failure("Oops, there is no country with that name"));
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
        <div style="display:flex; align-items:center; gap:10px; height:50px">
        <img src="${country.flags.svg}" alt="${country.flags.alt}" width=35 height=25 />
        <p style="font-size:24px; font-weight:bold; color:black">${country.name.official}</p>
        </div>
        <p><b>Capital</b>: ${country.capital}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Languages</b>: ${languagesArray}</p>
      </div>`;
      })
      .join('');

    infoEl.innerHTML = markup;
  }
}

function clearMarkup() {
  listEl.innerHTML = "";
  infoEl.innerHTML = "";
}