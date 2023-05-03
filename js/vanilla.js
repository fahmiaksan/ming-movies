const searchButton = document.querySelector('#search-button');
searchButton.addEventListener('click', async function () {
    try {
        const searchInput = document.querySelector('#search-input').value;
        const movies = await getMovies(searchInput);
        updateUI(movies);
    } catch (error) {
        console.log(error);
    }
});


function getMovies(keyword) {
    return fetch('https://www.omdbapi.com/?apikey=4b17b14a&s=' + keyword)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
            // console.log(response.json());
        })
        .then(response => {
            if (response.Response === "False") {
                throw new Error(response.Error);
            }
            return response.Search;
            // console.log(response);
        });
}


function updateUI(movies) {
    let cards = '';
    movies.forEach(element => cards += showCards(element));
    const container = document.querySelector('#list-movie');
    container.innerHTML = cards;
}

function showCards(m) {
    return `<div class="col-md-3">
<div class="card mb-5 object-fit-cover">
    <img src="${m.Poster}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${m.Title}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
        <a href="#" class="card-link see-details btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${m.imdbID}">See Detail</a>
</div>
</div>
</div>`
}

// see details

// event binding
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('see-details')) {
        const imdbid = e.target.dataset.id;
        const movieDetail = await getMoviesDetail(imdbid);
        // console.log(imdbid);
        updateUIDetail(movieDetail);
    }
})

function getMoviesDetail(imdbid) {
    return fetch('https://www.omdbapi.com/?apikey=4b17b14a&i=' + imdbid)
        .then(response => response.json())
        .then(m => m);
}

function updateUIDetail(movie) {
    const movieDetail = showMovieDetail(movie);
    const container = document.querySelector('.modal-body');
    container.innerHTML = movieDetail;
}

function showMovieDetail(m) {
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" alt="avengers" class="img-fluid">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item">
                    <h4>${m.Title}</h4>
                </li>
                <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
            </ul>
        </div>
    </div>
</div>`
}