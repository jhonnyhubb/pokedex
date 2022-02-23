/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import Text from '../../components/Text';
import api from '../../services/api';
import { Box as BoxStyled } from './styles';
import * as styles from './styles';

function Dashboard() {
  const [query, setQuery] = useState('');
  const [pokemon, setPokemon] = useState([]);
  const [searchForPokemon, setSearchForPokemon] = useState([]);
  const [searchPokemonImg, setSearchPokemonImg] = useState('');
  const [currentPokemon, setCurrentPokemon] = useState(0);

  const handleClear = () => {
    setQuery('');
  };

  /* pokemons */
  // eslint-disable-next-line no-shadow
  const loadPokemon = async (query = '') => {
    try {
      const response = await api.get(`https://pokeapi.co/api/v2/pokemon/${query}`);

      setSearchForPokemon(response.data);
      setSearchPokemonImg(searchForPokemon.sprites.front_default);
    } catch (error) {
      console.log('i dont find:', error);
    }
  };

  // eslint-disable-next-line no-shadow
  const searchPokemon = (query) => {
    loadPokemon(query);
  };

  const handleSearch = () => {
    searchPokemon(query);
  };

  useEffect(() => {
    async function getItems() {
      const { data } = await api.get(`/pokemon/?offset=0&limit=${currentPokemon + 20}`);

      const resp = await Promise.all(data.results.map((item) => api.get(item.url)));

      const format = resp.map((req) => req.data);
      setPokemon(format);
    }

    getItems();
  }, [currentPokemon]);

  /* scroll Infinity */
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCurrentPokemon((currentPokemonInsideState) => currentPokemonInsideState + 20);
      }
    });

    intersectionObserver.observe(document.querySelector('#scroll-infinite-down'));

    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <div>
      <Text as="h1">Pokedex</Text>
      <Text>Search for Pokémon by name or using the National Pokédex number</Text>
      <styles.Search>
        <styles.Label htmlFor="query" />
        <styles.Input
          type="text"
          name="query"
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <styles.Button onClick={handleSearch}>Search</styles.Button>
        <styles.Button onClick={handleClear}>Clear</styles.Button>
      </styles.Search>
      <BoxStyled>
        <div key={searchForPokemon.id}>
          Nº{searchForPokemon.id}: {searchForPokemon.name}
          <img src={searchPokemonImg} alt={searchForPokemon.name} />
        </div>
      </BoxStyled>
      <BoxStyled>
        {
          pokemon.map((item) => (
            <div key={item.id}>
              Nº{item.id}: {item.name}
              <img src={item.sprites.front_default} alt={item.name} />
            </div>
          ))
        }
      </BoxStyled>
      <p id="scroll-infinite-down" />
    </div>
  );
}

export default Dashboard;