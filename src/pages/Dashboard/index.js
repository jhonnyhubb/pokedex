/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import Text from '../../components/Text';
import api from '../../services/api';
import { Box as BoxStyled, Info } from './styles';
import Search from '../../components/Search/search';

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
        setCurrentPokemon((currentPokemonInsideState) => currentPokemonInsideState + 21);
      }
    });

    intersectionObserver.observe(document.querySelector('#scroll-infinite-down'));

    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <div>
      <Text as="h1">Pokedex</Text>
      <Text>Search for Pokémon by name or using the National Pokédex number</Text>
      <Search />
      <BoxStyled>
        {
          pokemon.map((item) => (
            <div key={item.id}>
              <Info key={item.id}>
                <p>Nº{item.id}: {item.name}</p>
                <p>Type: {item.types[0].type.name}</p>
              </Info>
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