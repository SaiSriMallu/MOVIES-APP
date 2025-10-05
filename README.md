# 🎬 Movie Library App

A simple and responsive **Movie Library** web app built using **HTML, CSS, and Vanilla JavaScript**.  
Users can explore popular movies, search by title, and manage a personalized **Watchlist** — all stored locally on their device.

---

## 📁 Folder Structure

```
movie-library/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsiveness
├── script.js           # JavaScript logic (API calls, watchlist, pagination)
└── README.md           # Project documentation
```

---

## 🚀 Features

### 🧭 Core Features
- Fetches and displays **popular movies** from the TMDB API on page load.  
- **Search bar** to find movies by title.  
- Each movie shows its **poster and title**.  
- Add movies to a **personal Watchlist** that persists via `localStorage`.  
- View all saved movies in a separate **Watchlist view**.  
- **Pagination** for navigating through movie results.  

### ✨ Bonus Features
- Remove movies from the watchlist.  
- Responsive header with a **hamburger menu** for small screens.  
- Smooth navigation between **Home** and **Watchlist** views.  

---

## ⚙️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6)  
- **API:** [TMDB API](https://www.themoviedb.org/documentation/api)  
- **Storage:** LocalStorage (Client-side persistence)

---

## 🔑 API Usage

This app uses TMDB’s public API for movie data.

```js
const API_KEY = '87ade1e3f0a17fefbe399270332d6501';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
```

---

## 🧩 How It Works

1. On page load, the app fetches **popular movies** from TMDB.  
2. Users can **search** for any movie title.  
3. Each movie card displays an **Add to Watchlist** button.  
4. Watchlist items are saved in `localStorage`, so they persist across sessions.  
5. Clicking the **Watchlist** button shows all saved movies, with an option to remove them.  
6. Pagination buttons allow navigating through multiple result pages.  

---

## 🧠 Key JavaScript Concepts Used

- **Fetch API** for asynchronous data retrieval  
- **Dynamic DOM manipulation** using `createElement` and `innerHTML`  
- **LocalStorage API** for persistence  
- **Responsive event handling** (clicks, keypress, etc.)  
- **Modular functions** for fetching, rendering, searching, and pagination  

---

## 📱 Responsive Design

- Header adjusts layout for smaller screens.  
- Navigation collapses into a **hamburger menu** below 900px width.  
- Search bar and movie grid adapt for tablets and mobile devices.  

---

## 🧪 Example Screens

| Page | Description |
|------|--------------|
| 🏠 **Home** | Displays trending movies from TMDB |
| 🔍 **Search** | Filters movies by title |
| 📺 **Watchlist** | Shows user’s saved movies with remove option |

*(Add screenshots here if you have any — e.g., `![Home Page](./images/home.png)`)*
  
---

## 💾 LocalStorage Structure

```json
[
  {
    "id": 12345,
    "title": "Inception",
    "posterPath": "/abc123.jpg"
  }
]
```

---

## 🧰 Setup Instructions

### Option 1: Run Locally
1. Clone or download the repository.
2. Open `index.html` directly in your browser.
3. Make sure you have a valid TMDB API key in `script.js`.

### Option 2: Use Live Server (Recommended)
If using VS Code:
```bash
Right-click index.html → "Open with Live Server"
```

---

## 🔗 Project Flow

| Action | File Responsible |
|--------|------------------|
| Fetch popular movies | `script.js` → `fetchMovies()` |
| Search movies | `script.js` → `searchMovies()` |
| Add/Remove watchlist | `script.js` → `addToWatchlist()`, `removeFromWatchlist()` |
| Responsive header | `style.css` + `hamburger` logic in JS |

---

## 🧠 Future Enhancements
- Add movie details modal (rating, overview, release date)  
- Integrate **client-side routing** (e.g., using Hash routing)  
- Include genre filters and sorting  
- Dark/light theme toggle  

---

## 🙋‍♂️ Author

**Gopi Sai Sri Mallu**  
Frontend Developer | Java Enthusiast  
📧 Feel free to connect for collaboration or feedback!
