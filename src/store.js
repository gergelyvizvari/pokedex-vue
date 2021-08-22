import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    pokemons: [],
    loaded: false,
    total: 0,
    selected: [],
    hasMatch: true,
    isSearch: false,
};

const apiUrl = "https://pokeapi.co/api/v2";

const loadPokemon = async (name) => {
    return fetch(`${apiUrl}/pokemon/${name}`)
        .then(result => result.json());
};

export default new Vuex.Store({
    state,
    actions: {
        async loadAllPokemons({ commit }) {
            await fetch(`${apiUrl}/pokemon?limit=9999`)
                .then(result => result.json())
                .then(response => {
                    commit('LOAD_ALL_POKEMONS', response.results.map(result => {
                        return {
                            name: result.name,
                            data: null,
                            loaded: false
                        };
                    }));
                })
                .catch(err => console.error(err));
        },
        async selectPokemon({ commit, state }, name) {
            commit('SET_IS_SEARCH', false);
            commit('SET_HAS_MATCH', true);
            const pokemon = state.pokemons.find(pokemon => pokemon.name == name);
            if (pokemon && !pokemon.loaded) {
                loadPokemon(pokemon.name).then(result => {
                    commit('LOAD_POKEMON', { name: pokemon.name, result });
                });
            }
            commit('SELECT_POKEMONS', [name]);
        },
        async searchPokemons({ commit, state }, search) {
            const matches = [];
            const searchLower = search.toLowerCase();
            state.pokemons.forEach(pokemon => {
                if (pokemon.name.toLowerCase().indexOf(searchLower) !== -1) {
                    loadPokemon(pokemon.name).then(result => {
                        commit('LOAD_POKEMON', { name: pokemon.name, result });
                    });
                    matches.push(pokemon.name);
                }
            });
            commit('SET_IS_SEARCH', true);
            commit('SET_HAS_MATCH', matches.length > 0);
            commit('SELECT_POKEMONS', matches);
        },
    },
    mutations: {
        LOAD_ALL_POKEMONS(state, pokemons) {
            state.pokemons = pokemons;
            state.loaded = true;
            state.total = pokemons.length;
        },
        SELECT_POKEMONS(state, nameList) {
            state.selected = nameList;
        },
        SET_IS_SEARCH(state, isSearch) {
            state.isSearch = isSearch;
        },
        SET_HAS_MATCH(state, hasMatch) {
            state.hasMatch = hasMatch;
        },
        LOAD_POKEMON(state, { name, result }) {
            const pokemons = state.pokemons.map(pokemon => {
                if (pokemon.name == name) {
                    pokemon.data = result;
                    pokemon.loaded = true;
                }
                return { ...pokemon };
            });
            state.pokemons = [...pokemons];
        }
    }
});