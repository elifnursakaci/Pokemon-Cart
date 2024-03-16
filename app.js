// HTML'den gelen DOM elemanlarını seçme
const poke_container = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchBtn");

// Pokemon sayısı
const pokemon_count = 151;

// Pokemon tiplerine göre arka plan renkleri
const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

// Arama butonuna tıklama olayı
searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
});

// Arama kutusunda yazı değiştiğinde olay
searchInput.addEventListener("input", (e) => {
  const searchValue = searchInput.value.toLowerCase();
  const pokemonNames = document.querySelectorAll(".poke-name");

  // Her bir Pokemon ismini kontrol etme
  pokemonNames.forEach((pokemonName) => {
    pokemonName.parentElement.parentElement.style.display = "block";

    // Aranan kelime Pokemon ismi içermiyorsa, kartı gizle
    if (!pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
      pokemonName.parentElement.parentElement.style.display = "none";
    }
  });
});

// Tüm Pokemonları getiren fonksiyon
const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

// Belirli bir Pokemon'un bilgilerini getiren fonksiyon
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  // Pokemon kartı oluşturma fonksiyonunu çağırma
  createPokemonCard(data);
};

// Pokemon kartı oluşturan fonksiyon
const createPokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");

  const pokemonId = pokemon.id.toString().padStart(3, "0");
  const pokemonType = pokemon.types[0].type.name;
  const pokemonBg = bg_color[pokemonType];

  // Kartın stilini ayarlama
  pokemonDiv.style.backgroundColor = `${pokemonBg}`;

  // Kartın içeriğini oluşturma
  const pokemonInnerHTML = `
    <div class="image-container">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
        alt="Pokemon 1 image"
      />
    </div>
    <div class="poke-info">
      <span class="poke-id">#${pokemonId}</span>
      <h3 class="poke-name">${pokemon.name}</h3>
      <div class="small">
        <small class="poke-exp">
          <i class="fa-solid fa-flask"></i> <span>${pokemon.base_experience} Exp</span>
        </small>
        <small class="poke-weight">
          <i class="fa-solid fa-weight-scale"></i> <span>${pokemon.weight} Kg</span>
        </small>
      </div>
      <div class="poke-type">
        <i class="fa-brands fa-uncharted"></i> <span>${pokemonType}</span>
      </div>
    </div>
  `;

  // Kartın içeriğini ayarlama
  pokemonDiv.innerHTML = pokemonInnerHTML;

  // Pokemon kartını ekrana ekleyerek konteynera eklemek
  poke_container.appendChild(pokemonDiv);
};

// Tüm Pokemonları getirme işlemini başlatma
fetchPokemons();
