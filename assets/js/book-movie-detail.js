const getParamsFromUrl = (params) => {
    const urlParams = new URLSearchParams(location.search)
    return urlParams.get(params)
}


const movieId = getParamsFromUrl("movieid")

const dataDetailMovie = await $.ajax({
    url: `http://localhost:8000/api/v1/movie/${movieId}`,
    method: "GET",
    contentType: "application/json",

    success: (response) => {
        return response
    },

    error: (error) => {
        return error
    }
})

if (dataDetailMovie) {
    $('.movie__detail-info').html(`
    <h2 class="movie__detail-info-name">${dataDetailMovie.title}</h2>
            <p class="movie__detail-info-type">${dataDetailMovie.name_category}</p>
            <p class="movie__detail-info-duration">
                <i class="fa-regular fa-clock"></i>
                ${dataDetailMovie.duration}
            </p>`)
}