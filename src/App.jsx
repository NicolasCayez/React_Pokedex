import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemon, setPokemon] = useState({});

  useEffect(()=>{
    const ABORT_CONTROLLER = new AbortController();

    fetch('https://pokebuildapi.fr/api/v1/pokemon/limit/20', {signal : ABORT_CONTROLLER.signal})
      .then(response => response.json())
      .then(json => {
        console.log("JSON : ", json);
        console.log('FETCH !');
        setPokemonList(json);
      })
      return ()=>{
        //Nettoyage
        ABORT_CONTROLLER.abort();
      }
  }, [])

  useEffect(()=>{
    const ORIGINAL_TITLE = document.title;
    document.title = pokemon.name;

    return ()=>{
      //Nettoyage
      document.title = ORIGINAL_TITLE;
    }
  }, [pokemon])

  console.log("PokemonList :", pokemonList);
  console.log("Pokemon :", pokemon);

  return (
    <>
      <h1>Pokedex</h1>
      {pokemon.name != null && <ProfilPokemon pokemon={pokemon}/>}
      <div className='pokeList'>
        {pokemonList.map((pokemon, index) => (<CardPokemon key={index} id={pokemon.pokedexId} name={pokemon.name} image={pokemon.image} onClick={()=>setPokemon(pokemon)} />))}
      </div>
    </>
  )
}

function CardPokemon({id, name, image, onClick}) {
  return (
    <>
      <article className='pokemon' onClick={onClick}>
        <img src={image} alt="image_pokemon" />
        <p>{id} - {name}</p>
      </article>
    </>
  )
}

function ProfilPokemon({pokemon}) {
  return (
    <>
      <article className='profilPokemon'>
        <div className='profilDetail'>
          <h2 className='pokemonName'>{pokemon.name}</h2>
          <img src={pokemon.image} alt="image_pokemon" />
        </div>
        <div className='typeDetail'>
          {pokemon.apiTypes.map((type, index)=>(
            <div>
              <p>{type.name}</p>
              <img src={type.image} alt="image_type" />
            </div>
          ))}
        </div>
        <div className='statsDetail'>
          <p>HP : <span>{pokemon.stats.HP}</span></p>
          <p>Attack : <span>{pokemon.stats.attack}</span></p>
          <p>Defense : <span>{pokemon.stats.defense}</span></p>
          <p>Special attack : <span>{pokemon.stats.special_attack}</span></p>
          <p>Special defense : <span>{pokemon.stats.special_defense}</span></p>
          <p>Speed : <span>{pokemon.stats.speed}</span></p>
        </div>
        
      </article>
    </>
  )
}