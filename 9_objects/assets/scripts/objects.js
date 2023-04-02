const addMovieBtn = document.querySelector('#add-movie-btn');
const searchMovieBtn = document.querySelector('#search-btn');
const Movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.querySelector('#movie-list');

  if (Movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';
  const filteredMovies = !filter ?
    Movies :
    Movies.filter(movie => movie.info.title.includes(filter));

  filteredMovies.forEach(movie => {
    const movieEl = document.createElement('li');
    const {
      info,
      ...otherProps
    } = movie;
    // const {title:movieTitle}=info;
    let {
      getFormattedTitle
    } = movie;
    // getFormattedTitle=getFormattedTitle.bind(movie);
    let text = getFormattedTitle.call(movie) + ' - ';
    for (const key in info) {
      if (key !== 'title'&&key!=='_title') {
        text = text + `${key}:${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.appendChild(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.querySelector('#title').value;
  const extraName = document.querySelector('#extra-name').value;
  const extraValue = document.querySelector('#extra-value').value;

  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }
  const newMovie = {
    info: {
      set title(val) {
        if (val.trim() === '') {
          this._title = 'DEFAULT';
          return;
        }
        this._title = val;
      },
      get title() {
        return this._title.toUpperCase();
      },
      [extraName]: extraValue,
    },
    id: Math.random(),
    getFormattedTitle() {
      // console.log(this);
      return this.info.title.toUpperCase();
    },
  };

  newMovie.info.title=title;
  console.log(newMovie.info.title);
  Movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  // console.log(this)
  const filterMovie = document.querySelector('#filter-title').value.toUpperCase();
  renderMovies(filterMovie);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchMovieBtn.addEventListener('click', searchMovieHandler);