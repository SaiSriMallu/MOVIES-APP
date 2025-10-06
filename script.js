const API_KEY = '87ade1e3f0a17fefbe399270332d6501';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const moviesContainer = document.getElementById('movies');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const homeBtn = document.getElementById('homeBtn');
const watchlistBtn = document.getElementById('watchlistBtn');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPageSpan = document.getElementById('currentPage');

let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
let currentPage = 1;
let totalPages = 1;
let currentQuery = '';
let showingWatchlist = false;

// ---------------- Fetch Movies ----------------
async function fetchMovies(url, page = 1) {
  try {
    const res = await fetch(`${url}&page=${page}`);
    if (!res.ok) throw new Error('Failed to fetch movies');
    const data = await res.json();
    totalPages = Math.min(data.total_pages, 500); // TMDB max page limit
    showingWatchlist = false;
    document.querySelector('.pagination').style.display = 'flex';
    renderMovies(data.results, 'add');
    updatePagination();
  } catch (err) {
    moviesContainer.innerHTML = `<p style="text-align:center;">Error: ${err.message}</p>`;
  }
}

// ---------------- Render Movies ----------------
function renderMovies(movies, type) {
  moviesContainer.innerHTML = '';
  if (!movies || movies.length === 0) {
    moviesContainer.innerHTML = '<p style="text-align:center;">No movies found.</p>';
    return;
  }

  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    const safeTitle = movie.title.replace(/'/g, "\\'");
    movieDiv.innerHTML = `
      <img src="${IMAGE_BASE_URL + (movie.posterPath || movie.poster_path)}" alt="${movie.title}">
      <p class="movie-title" title="${movie.title}">${movie.title}</p>
      <button class="${type}-btn">
        <i class="fa-solid fa-${type === 'add' ? 'bookmark' : 'trash'}"></i>&nbsp;&nbsp;${type === 'add' ? 'Add to Watchlist' : 'Remove'}
      </button>
    `;

    const btn = movieDiv.querySelector('button');
    if (type === 'add') {
      btn.addEventListener('click', () =>
        addToWatchlist(movie.id, safeTitle, movie.poster_path)
      );
    } else {
      btn.addEventListener('click', () => removeFromWatchlist(movie.id));
    }
    moviesContainer.appendChild(movieDiv);
  });
}

// ---------------- Add to Watchlist ----------------
function addToWatchlist(id, title, posterPath) {
  const exists = watchlist.find(movie => movie.id === id);
  if (!exists) {
    watchlist.push({ id, title, posterPath });
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    alert(`${title} added to your watchlist!`);
  } else {
    alert(`${title} is already in your watchlist.`);
  }
}

// ---------------- Show Watchlist ----------------
function showWatchlist() {
  const storedList = JSON.parse(localStorage.getItem('watchlist')) || [];
  showingWatchlist = true;
  document.querySelector('.pagination').style.display = 'none';
  if (storedList.length === 0) {
    moviesContainer.innerHTML = '<p style="text-align:center;">Your watchlist is empty.</p>';
    return;
  }
  renderMovies(storedList, 'remove');
}

// ---------------- Remove from Watchlist ----------------
function removeFromWatchlist(id) {
  watchlist = watchlist.filter(movie => movie.id !== id);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  showWatchlist();
}

// ---------------- Search Movies ----------------
async function searchMovies() {
  const query = searchInput.value.trim();
  if (!query) return;
  currentQuery = query;
  currentPage = 1;
  const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`;
  fetchMovies(searchURL, currentPage);
}

// ---------------- Pagination ----------------
function updatePagination() {
  currentPageSpan.textContent = currentPage;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadMoviesPage();
  }
});
nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    loadMoviesPage();
  }
});
function loadMoviesPage() {
  if (showingWatchlist) return; // Prevent pagination on watchlist
  let url;
  if (currentQuery) {
    url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${currentQuery}`;
  } else {
    url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`;
  }
  fetchMovies(url, currentPage);
}

searchBtn.addEventListener('click', searchMovies);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchMovies();
});
homeBtn.addEventListener('click', () => {
  currentQuery = '';
  currentPage = 1;
  const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`;
  fetchMovies(popularURL, currentPage);
});
watchlistBtn.addEventListener('click', showWatchlist);

// ---------------- On Load ----------------
window.addEventListener('load', () => {
  const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`;
  fetchMovies(popularURL, currentPage);
});

/* --------- MOBILE HEADER Interactivity ----------- */
const searchToggle = document.querySelector('.search-toggle');
const hamburgerToggle = document.querySelector('.hamburger');
const expandSearch = document.getElementById('expand-search');
const expandNav = document.getElementById('expand-nav');
// Toggle overlays, only one at a time
searchToggle.addEventListener('click', () => {
  expandSearch.classList.toggle('active');
  expandNav.classList.remove('active');
});
hamburgerToggle.addEventListener('click', () => {
  expandNav.classList.toggle('active');
  expandSearch.classList.remove('active');
});
document.addEventListener('click', function(e) {
  if (window.innerWidth <= 800 &&
      !e.target.closest('.header-icons') &&
      !e.target.closest('.expand-section')) {
    expandSearch.classList.remove('active');
    expandNav.classList.remove('active');
  }
});
