const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon/";
let allPokemon = [];

const pokedexContainer = document.getElementById('pokedex-container');
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-btn');
const modal = document.getElementById('modal');
const pokemonDetails = document.getElementById('pokemon-details');

window.onload = async () => {
    await loadPokemons(1, 100); 
    setupEventListeners();
};

async function loadPokemons(start, end) {
    pokedexContainer.innerHTML = '<div class="loading">Cargando Pokémon...</div>';
    
    try {
        const requests = [];
        for (let id = start; id <= end; id++) {
            requests.push(fetch(`${POKEDEX_URL}${id}`).then(res => res.json()));
        }
        
        allPokemon = await Promise.all(requests);
        displayPokemons(allPokemon);
    } catch (error) {
        pokedexContainer.innerHTML = '<div class="error">Error al cargar los Pokémon</div>';
    }
}

function displayPokemons(pokemonList) {
    pokedexContainer.innerHTML = '';
    
    pokemonList.forEach(pokemon => {
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.innerHTML = `
            <div class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</div>
            <img class="pokemon-img" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
            <h3 class="pokemon-name">${pokemon.name}</h3>
            <div class="pokemon-types">
                ${pokemon.types.map(type => `<span class="type" style="background: var(--${type.type.name})">${type.type.name}</span>`).join('')}
            </div>
        `;
        card.addEventListener('click', () => showPokemonDetails(pokemon));
        pokedexContainer.appendChild(card);
    });
}

function searchPokemon() {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = allPokemon.filter(pokemon => 
        pokemon.name.includes(searchTerm) || 
        pokemon.id.toString().includes(searchTerm)
    );
    displayPokemons(filtered);
}

function showPokemonDetails(pokemon) {
    const stats = pokemon.stats.map(stat => `
        <div class="stat">
            <span>${stat.stat.name}:</span>
            <div class="stat-bar">
                <div class="stat-value" style="width: ${stat.base_stat > 100 ? 100 : stat.base_stat}%">${stat.base_stat}</div>
            </div>
        </div>
    `).join('');
    
    pokemonDetails.innerHTML = `
        <div class="detail-header">
            <h2>${pokemon.name.toUpperCase()}</h2>
            <div class="detail-id">#${pokemon.id.toString().padStart(3, '0')}</div>
        </div>
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" class="detail-img">
        <div class="detail-types">
            ${pokemon.types.map(type => `<span class="type" style="background: var(--${type.type.name})">${type.type.name}</span>`).join('')}
        </div>
        <div class="detail-stats">
            <h3>Estadísticas</h3>
            ${stats}
        </div>
        <div class="detail-info">
            <p style="margin: 0 20;"><strong>Altura:</strong> ${pokemon.height / 10} m</p>
            <p style="margin: 0 20;">><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
        </div>
    `;
    
    modal.style.display = 'block';
}

function setupEventListeners() {
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') searchPokemon();
    });
    searchButton.addEventListener('click', searchPokemon);
    
    document.querySelector('.close').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
}