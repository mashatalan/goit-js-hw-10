import '../css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import refs from './refs';
import { fetchCountries } from './fetchCountries';


const DEBOUNCE_DELAY = 300;
const onHandleInputChangeDebounced = debounce(onHandleInputChange, DEBOUNCE_DELAY);


refs.input.addEventListener('input', onHandleInputChangeDebounced);

function onHandleInputChange(event) {
  event.preventDefault();

  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  const value = event.target.value.trim();
  if (value === '') {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(value)
    .then(data => {
      if (data.length > 9) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      }
      if (data.length > 1 && data.length < 10) {
        createCountryListMarkup(data);
      }
      if (data.length === 1) {
        createCountryInfoMarkup(data);
      }
    })
    .catch(err => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}


function createCountryListMarkup(arr) {
  const markup = arr
    .map(({ name, flags }) => `<li class='country-item'>
        <img class='flag' src='${flags.svg}' alt='flag'>
         <h3>${name.official}</h3>
       </li>`)
    .join(' ');
  refs.countryList.innerHTML = markup;

}

function createCountryInfoMarkup(arr) {
  const markup = arr
    .map(({ name, capital, population, flags, languages }) => `<li class='country-info'>
          <img class='flag' src='${flags.svg}' alt='flag'>
           <h3>${name.official}</h3>
           <h3>Capital: ${capital}</h3>
           <h3>Population: ${population}</h3>
           <h3>Languages: ${Object.values(languages)}</h3>
         </li>`)
    .join(' ');
  refs.countryInfo.innerHTML = markup;
}