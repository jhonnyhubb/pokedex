import React, { useState } from 'react';
import api from '../../services/api';
import { BoxSearch as BoxStyledSearch, Info } from '../../pages/Dashboard/styles';
import * as styles from '../../pages/Dashboard/styles';

function Search() {
  const [query, setQuery] = useState('');
  const [searchForPokemon, setSearchForPokemon] = useState([]);
  const [searchPokemonImg, setSearchPokemonImg] = useState('');

  const handleClear = () => {
    setQuery('');
  };

  /* pokemons */
  // eslint-disable-next-line no-shadow
  const loadPokemon = async (response) => {
    try {
      setSearchForPokemon(response.data);
      setSearchPokemonImg(searchForPokemon.sprites.front_default);
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line no-shadow
  const searchPokemon = async (query = '') => {
    const response = await api.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
    loadPokemon(response);
  };

  const handleSearch = async () => {
    searchPokemon(query);
  };

  // eslint-disable-next-line no-shadow
  const handleChange = (query) => {
    setQuery(query.target.value);
  };

  return (
    <div>
      <styles.Search>
        <styles.Label htmlFor="query" />
        <styles.Input
          type="text"
          name="query"
          id="query"
          value={query}
          onChange={(e) => handleChange(e)}
          placeholder="Search a pokemon"
        />
        <styles.Button onClick={handleSearch}>Search</styles.Button>
        <styles.Button onClick={handleClear}>Clear</styles.Button>
      </styles.Search>
      {searchPokemonImg !== '' ? (
        <BoxStyledSearch>
          <div key={searchForPokemon.id}>
            <Info>
              <p>
                Nº{searchForPokemon.id}: {searchForPokemon.name}
              </p>
              <p>
                Type: {searchForPokemon.types[0].type.name}
              </p>
            </Info>
            <img src={searchPokemonImg} alt={searchForPokemon.name} />
          </div>
        </BoxStyledSearch>
      ) : null}
    </div>
  );
}

export default Search;