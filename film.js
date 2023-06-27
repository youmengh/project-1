const baseUrl = `https://swapi2.azurewebsites.net/api`;

addEventListener('DOMContentLoaded', () => {
    filmText = document.querySelector('span#film')

    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id') //film id query
    getFilm(id)
});

async function getFilm(id) {
    let film;
    try {
        film = await fetchFilm(id)
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
}


