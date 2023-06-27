const baseUrl = `https://swapi2.azurewebsites.net/api`;

addEventListener('DOMContentLoaded', () => {
    planetText = document.querySelector('span#planet');
    filmsUl = document.querySelector('#films>ul');
    charactersUl = document.querySelector('#characters>ul');
    const sp = new URLSearchParams(window.location.search);
    const id = sp.get('id'); //film id query
    getPlanet(id);
});

async function getPlanet(id) {
    let planet;
    try {
        planet = await fetchPlanet(id);
        planet.films = await fetchFilms(id);
        planet.characters = await fetchCharacters(id);
    }
    catch (ex) {
        console.error(`Error reading film ${id} data.`, ex.message);
    }
    console.log(planet)
    renderPlanet(planet);

}

async function fetchPlanet(id) {
    let planetUrl = `${baseUrl}/planets/${id}`;
    return await fetch(planetUrl)
        .then(res => res.json())
}

async function fetchFilms(id) {
    let filmsUrl = `${baseUrl}/planets/${id}/films`;
    return await fetch(filmsUrl)
        .then(res => res.json())
}

async function fetchCharacters(id) {
    let charactersUrl = `${baseUrl}/planets/${id}/characters`;
    return await fetch(charactersUrl)
        .then(res => res.json())
}

const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;
    planetText.innerHTML = `<a>Name: ${planet?.name}</a>
                            <br>
                            <a>Population: ${planet?.population}</a>`;
    const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    filmsUl.innerHTML = filmsLis.join("");
    const charactersLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = charactersLis.join("");
}
