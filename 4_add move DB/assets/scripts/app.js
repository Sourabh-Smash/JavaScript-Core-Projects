const addMovieModale = document.getElementById('add-modal');
const startAddMovieBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = addMovieModale.querySelector('.btn--passive');
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModale.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const listRoot = document.getElementById('movie-list');
const deleteMovieModale = document.getElementById('delete-modal');
const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};
const closeMovieDeletionModel = () => {
  toggleBackdrop();
  deleteMovieModale.classList.remove('visible');
};
const deleteMovieHandler = movieId => {
  const movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  //listRoot.children[movieIndex].remove();
  listRoot.removeChild(listRoot.children[movieIndex]);
  closeMovieDeletionModel();
  updateUI();
};
const startDeleteMovieHandler = movieId => {
  deleteMovieModale.classList.add('visible');
  toggleBackdrop();
  const cancelDeletionBtn = deleteMovieModale.querySelector('.btn--passive');
  let confirmDeletionBtn = deleteMovieModale.querySelector('.btn--danger');
  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
  confirmDeletionBtn = deleteMovieModale.querySelector('.btn--danger');
  //confirmDeletionBtn.removeEventListener('click',deleteMovieHandler.bind(null,movieId)); will not work
  cancelDeletionBtn.removeEventListener('click', closeMovieDeletionModel);

  cancelDeletionBtn.addEventListener('click', closeMovieDeletionModel);
  confirmDeletionBtn.addEventListener(
    'click',
    deleteMovieHandler.bind(null, movieId)
  );

  //deleteMovie(movieId);
};
const renderNewMovieElement = (id, title, image, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
  <div class="movie-element__image>
  <img src="${image}" alt="${title}"
  </div>
  <div class="movie-element__info">
  <h2>${title}</h2>
  <p>${rating}/5 stars</p>
  </div>
  `;
  newMovieElement.addEventListener(
    'click',
    startDeleteMovieHandler.bind(null, id)
  );
  listRoot.append(newMovieElement);
};
const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const closeMovieModale = () => {
  addMovieModale.classList.remove('visible');
};
const showMovieModale = () => {
  addMovieModale.classList.add('visible');
  toggleBackdrop();
};
const backdropClickHandler = () => {
  closeMovieModale();
  closeMovieDeletionModel();
  removeMovies();
};
const removeMovies = () => {
  for (const userInput of userInputs) {
    userInput.value = '';
  }
};
const cancelAddMovieHandler = () => {
  closeMovieModale();
  toggleBackdrop();
  removeMovies();
};

const addMoiveHandler = () => {
  const movieTitle = userInputs[0].value;
  // console.log(titleValue);
  const movieImageUrl = userInputs[1].value;
  // console.log(movieImageUrl);
  const movieRating = userInputs[2].value;
  // console.log(movieRating);
  if (
    movieTitle.trim() === ' ' ||
    movieImageUrl.trim() === ' ' ||
    movieRating.trim() === ' ' ||
    +movieRating > 5 ||
    +movieRating < 1
  ) {
    alert('Wrong User Input!');
    return;
  }
  const newMovies = {
    id: Math.random().toString(),
    title: movieTitle,
    imgae: movieImageUrl,
    rating: movieRating,
  };
  movies.push(newMovies);
  console.log(movies);
  closeMovieModale();
  toggleBackdrop();
  removeMovies();
  renderNewMovieElement(
    newMovies.id,
    newMovies.title,
    newMovies.imgae,
    newMovies.rating
  );
  updateUI();
};
startAddMovieBtn.addEventListener('click', showMovieModale);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener('click', addMoiveHandler);
