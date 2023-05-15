const URL = 'https://restcountries.com/v3.1/name';
const fields = 'name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${URL}/${name}?fields=${fields}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('ERROR');
      }
      return res.json();
    });
}

export { fetchCountries };