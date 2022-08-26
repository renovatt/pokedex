//Capturando DOM
const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')

const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let searchPokemon = 1

//Tratando API
const fetchAPI = async (pokemon) => {
    const responseAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(responseAPI.status == 200){
        const data = responseAPI.json()
        return data
    }
}

//Renderizando dados
const render = async (pokemon) => {
    pokemonName.innerHTML = 'Loading..'
    pokemonNumber.innerHTML = ''
    pokemonImage.src = ''
    input.value = ''

    const data = await fetchAPI(pokemon)
        if(data){
            pokemonName.innerHTML = data.name
            /*pokemonName.innerHTML = data.types[0].type.name*/
            pokemonNumber.innerHTML = data.id
            pokemonImage.src = data['sprites']['versions']
            ['generation-v']['black-white']['animated']
            ['front_default']
            input.value = ''
            searchPokemon = data.id

        } else{
            pokemonName.innerHTML = 'Not found'
            pokemonNumber.innerHTML = ''
            pokemonImage.src = ''
            input.value = ''
        }
}

//Eventos
form.addEventListener('submit', (e) => {
    e.preventDefault()
    render(input.value.toLowerCase())
})

btnNext.addEventListener('click', () => {
    searchPokemon += 1
    render(searchPokemon)
})

btnPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1
        render(searchPokemon)
    }
})

render(searchPokemon)

