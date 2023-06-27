const baseUrl = `https://swapi2.azurewebsites.net/api`;

addEventListener('DOMContentLoaded', () => {
    filmText = document.querySelector('span#film');
    charactersUl = document.querySelector('#characters>ul');
    planetsUl = document.querySelector('#planets>ul');
    const sp = new URLSearchParams(window.location.search);
    const id = sp.get('id'); //film id query
    getFilm(id);
});

async function getFilm(id) {
    let film;
    try {
        film = await fetchFilm(id);
        film.characters = await fetchCharacters(id);
        film.planets =await fetchPlanets(id);
    }
    catch (ex) {
        console.error(`Error reading film ${id} data.`, ex.message);
    }
    console.log(film)
    renderFilm(film);

}

async function fetchFilm(id) {
    let filmUrl = `${baseUrl}/films/${id}`;
    return await fetch(filmUrl)
        .then(res => res.json())
}

async function fetchCharacters(id) {
    let charactersUrl = `${baseUrl}/films/${id}/characters`;
    return await fetch(charactersUrl)
        .then(res => res.json())
}

async function fetchPlanets(id) {
    let planetsUrl = `${baseUrl}/films/${id}/planets`;
    return await fetch(planetsUrl)
        .then(res => res.json())
}

const renderFilm = film => {
    document.title = `SWAPI - ${film?.title}`;
    filmText.innerHTML = `<a>Film: ${film?.title}</a>
                            <br>
                            <a>Director: ${film?.director}</a>
                            <br>
                            <a>Producer: ${film?.producer}</a>
                            <br>
                            <a>Release Date: ${film?.release_date}</a>
                            <br>
                            <a>Opening Crawl: ${film?.opening_crawl}</a>`;
    const charactersLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = charactersLis.join("");
    const planetsLis = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`)
    planetsUl.innerHTML = planetsLis.join("");
}
