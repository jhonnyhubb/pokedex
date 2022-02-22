import React, { useEffect, useState } from 'react';
import Text from '../../components/Text';
import api from '../../services/api';
import { Box as BoxStyled } from './styles';
import * as styles from './styles';

function Dashboard() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(0);

  /* pokemons */
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
        />
        <styles.Button>Search</styles.Button>
        <styles.Button>Clear</styles.Button>
      </styles.Search>
      <BoxStyled>
        {
            pokemon.length > 0 && pokemon.map((item) => (
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