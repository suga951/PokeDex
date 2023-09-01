let pokemonId = 1;
async function fetchPokemonData(pokemonId) {
  const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const descriptionRequest = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
  const pokemonData = await request.json();
  const pokemonDescription = await descriptionRequest.json();

  const pokemon = {
    name : pokemonData.name,
    id : pokemonData.id,
    artwork : pokemonData["sprites"]["other"]["official-artwork"]["front_default"],
    hp : pokemonData["stats"][0]["base_stat"],
    atk : pokemonData["stats"][1]["base_stat"],
    def : pokemonData["stats"][2]["base_stat"],
    sp_atk : pokemonData["stats"][3]["base_stat"] ,
    sp_def : pokemonData["stats"][4]["base_stat"],
    speed : pokemonData["stats"][5]["base_stat"],
    color : pokemonDescription["color"]["name"],
    description : pokemonDescription["flavor_text_entries"][20]["flavor_text"]
  }
  
  titleBackground(pokemon);
  getPokemonImg(pokemon);
  getPokemonName(pokemon);
  getPokemonTypes(pokemonData);
  getInfo(pokemon);
  titleBackground(pokemon);
}

addEventListener("DOMContentLoaded",() => {
  fetchPokemonData(pokemonId);
});

window.addEventListener("keydown", function(e) {
  if (e.key === 'ArrowRight' && pokemonId <= 151) {
    pokemonId++;
    fetchPokemonData(pokemonId);
    console.log('Enter key was pressed');
  }else if(e.key === 'ArrowLeft' && pokemonId >= 1){
    pokemonId--;
    fetchPokemonData(pokemonId);
  }
});

function getPokemonImg(pokemon) {
  const picture = document.querySelector('#pokemon-image');
  picture.setAttribute("src", pokemon.artwork);
  picture.setAttribute("class", "mx-auto h-full");
}
function getPokemonName(pokemon) {
  const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  document.querySelector("#pokemon-name").innerHTML = "#" + pokemon.id + " " + formattedName;
}
function getPokemonTypes(pokemonData) {
  const keys = pokemonData.types;
  const pokemonTypes = [];
    for(var i = 0; i < keys.length; i++) {
      const type = pokemonData.types[i]["type"]["name"].charAt(0).toUpperCase() + pokemonData.types[i]["type"]["name"].slice(1);
      pokemonTypes.push(type);
    }
  if(pokemonTypes.length > 1) {
    document.querySelector("#pokemon-type-two").innerHTML = pokemonTypes[1];
    document.querySelector("#pokemon-type-one").innerHTML = pokemonTypes[0];
  } else {
    document.querySelector("#pokemon-type-one").innerHTML = pokemonTypes[0];
    document.querySelector("#pokemon-type-two").innerHTML = "";
  }
}

const getInfo = ({atk, hp, def, speed,description}) => {
  document.querySelector('#atk').innerHTML = atk;
  document.querySelector('#hp').innerHTML = hp;
  document.querySelector("#def").innerHTML = def;
  document.querySelector("#speed").innerHTML = speed;
  document.querySelector("#pokemon-description").innerHTML = description;
}

const titleBackground = ({color}) => {
  document.querySelector("#pokemon-name-container").setAttribute("class",`bg-${color}-300 rounded-t-lg`);
<<<<<<< HEAD
}
=======
}
>>>>>>> 66c078a (cleaned up code)
