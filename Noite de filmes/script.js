const API_KEY = '87049f01ed713c1a9ab738e22a86583d';
const genresByDay = {
    segunda: 35, // Comédia Romântica
    terca: 27, // Terror
    quarta: 878, // Ficção Científica
    quinta: 53, // Suspense
    sexta: 28, // Ação
    sabado: 18, // Drama
    domingo: 16 // Infantil
};
document.getElementById('suggestButton').addEventListener('click', async () => {
  const selectedDay = document.getElementById('daySelect').value;
  const genreId = genresByDay[selectedDay];
  const randomMovie = await getRandomMovie(genreId);
  displayMovie(randomMovie, genreId);
});

async function getRandomMovie(genreId) {
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`);
  const data = await response.json();
  
  if (data.results.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * data.results.length);
  return data.results[randomIndex];
}

function displayMovie(movie, genreId) {
  const movieSuggestionDiv = document.getElementById('movieSuggestion');

  if (!movie) {
      movieSuggestionDiv.innerHTML = "<p>Nenhum filme encontrado.</p>";
      return;
  }

  const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '';
  const rating = movie.vote_average ? movie.vote_average : 'N/A';

  movieSuggestionDiv.innerHTML = `
      <h2>${movie.title}</h2>
      <img src="${imageUrl}" alt="${movie.title}" class="movie-image">
      <div class="movie-details">
          <p><strong>Gênero:</strong> ${getGenreName(genreId)}</p>
          <p><strong>Avaliação:</strong> ${rating} ★</p>
          <p><strong>Sinopse:</strong> ${movie.overview}</p>
      </div>
  `;
}

function getGenreName(genreId) {
  const genreNames = {
      35: 'Comédia Romântica',
      27: 'Terror',
      878: 'Ficção Científica',
      53: 'Suspense',
      28: 'Ação',
      18: 'Drama',
      16: 'Infantil'
  };
  return genreNames[genreId];
}