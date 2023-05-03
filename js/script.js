function searchMovie() {
    $('#list-movie').html('');
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'GET',
        dataType: 'json',
        data: {
            'apikey': '4b17b14a',
            's': $('#search-input').val()
        },
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search;
                $.each(movies, function (i, data) {
                    $('#list-movie').append(`
                        <div class="col-md-3">
                            <div class="card mb-5 object-fit-cover">
                                <img src="${data.Poster}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${data.Title}</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">${data.Year}</h6>
                                    <a href="#" class="card-link see-details btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
                            </div>
                        </div>
                    </div>`);
                });
                $('#search-input').val('');
            } else {
                $('#list-movie').html(`<h1 class="text-center">Sorry, ${result.Error} :( <?h1>`)
            }
        }
    });
}
$('#search-button').on('click', function () {
    searchMovie();
});

$('#search-input').on('keyup', function (event) {
    if (event.which === 13) {
        searchMovie();
    }
});

$('#list-movie').on('click', '.see-details', function () {
    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json', type: 'get', data: {
            'apikey': '4b17b14a',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response == "True") {
                $('.modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${movie.Poster}" class="img-fluid">
                        </div>

                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><strong>${movie.Title}</strong></li>
                                <li class="list-group-item"><strong>Released : </strong>${movie.Released}</li>
                                <li class="list-group-item"><strong>Genre : </strong>${movie.Genre}</li>
                                <li class="list-group-item"><strong>Actors : </strong>${movie.Actors}</li>
                                <li class="list-group-item"><strong>Plots : </strong>${movie.Plot}</li>
                                <li class="list-group-item"><strong>Writers : </strong>${movie.Writer}</li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                `)
            }
        }
    })
});

// const button = document.querySelector('')