export function updateMovieRating(id, rating) {
    const key = "moviesRating";
    const moviesRating = JSON.parse(localStorage.getItem(key) || '[]');
    const movieIndex = Array.isArray(moviesRating) ? moviesRating.findIndex(movie => movie.id === id) : -1;

    if (movieIndex !== -1) {
        moviesRating[movieIndex].rating = rating;
    } else {
        moviesRating.push({ id: id, rating: rating });
    }

    localStorage.setItem(key, JSON.stringify(moviesRating));
}

export function deleteMovieRating(id) {
    const key = "moviesRating";
    let moviesRating = JSON.parse(localStorage.getItem(key) || '[]');
    moviesRating = Array.isArray(moviesRating) && moviesRating.filter(movie => movie.id !== id);
    localStorage.setItem(key, JSON.stringify(moviesRating));
}

