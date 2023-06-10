// variables //

const pokedex = document.getElementById("pokedex");

// api fetching //

const fetchPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
  const res = await fetch(url);
  const data = await res.json();
  const pokemon = data.results.map((result, index) => ({
    ...result,
    apiURL: result.url,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
  }));
  displayPokemon(pokemon);
};

// pokemon card //

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      (pokemon) => `
      <li class="card" onclick="selectPokemon(${pokemon.id})">
          <img class="card-image" src="${pokemon.image}"/>
          <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
      </li>  
      `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  displayPopup(pokemon);
};

// popup //
const displayPopup = (pokemon) => {
  const type = pokemon.types.map((type) => type.type.name).join(", ");
  const image = pokemon.sprites["front_default"];
  const htmlString = `
  <div class="popup> 
    <button id="closeBtn"
    onclick="closePopup()">close</button>
    <div class="card">
      <img class="card-image" src="${image}"/>
      <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
      <p><small>Height: </small>${pokemon.height} | <small>Weight: </small>${pokemon.weight} | 
      <small>Type: </small>${type}
    </div> 
  </div`;
  pokedex.innerHTML = htmlString + pokedex.innerHTML;
  console.log(htmlString);
};

const closePopup = () => {
  const popup = document.querySelector('.popup');
  popup.parentElement.removeChild(popup);
};

fetchPokemon();
