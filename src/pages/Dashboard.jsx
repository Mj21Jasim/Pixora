import { useEffect, useMemo, useState } from "react";
import "./Dashboard.css";

const games = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    genre: "Action",
    rating: 4.8,
    year: 2020,
    platform: "PC · PlayStation · Xbox",
    image:
      "/images/g1.jpg",
    description: "Explore a futuristic city filled with danger and possibilities.",
  },
  {
    id: 2,
    title: "Valorant",
    genre: "FPS",
    rating: 4.7,
    year: 2020,
    platform: "PC",
    image:
      "/images/g2.jpg",
    description: "Master tactical combat and team-based competitive battles.",
  },
  {
    id: 3,
    title: "Forza Horizon 5",
    genre: "Racing",
    rating: 4.9,
    year: 2021,
    platform: "PC · Xbox",
    image:
      "/images/g3.jpg",
    description: "Race through stunning landscapes and thrilling events.",
  },
  {
    id: 4,
    title: "Elden Ring",
    genre: "Adventure",
    rating: 4.9,
    year: 2022,
    platform: "PC · PlayStation · Xbox",
    image:
      "/images/g4.jpg",
    description: "Discover a mysterious world filled with powerful enemies.",
  },
  {
    id: 5,
    title: "Apex Legends",
    genre: "FPS",
    rating: 4.6,
    year: 2019,
    platform: "PC · PlayStation · Xbox",
    image:
      "/images/g5.jpg",
    description: "Team up, choose your legend, and compete to survive.",
  },
  {
    id: 6,
    title: "Minecraft",
    genre: "Sandbox",
    rating: 4.9,
    year: 2011,
    platform: "PC · Console · Mobile",
    image:
      "/images/g6.jpg",
    description: "Build, explore, and create your own block-based world.",
  },
  {
    id: 7,
    title: "Red Dead Redemption 2",
    genre: "Adventure",
    rating: 4.9,
    year: 2018,
    platform: "PC · PlayStation · Xbox",
    image:
      "/images/g7.jpg",
    description: "Experience an unforgettable adventure in the Wild West.",
  },
  {
    id: 8,
    title: "Grand Theft Auto V",
    genre: "Action",
    rating: 4.8,
    year: 2013,
    platform: "PC · PlayStation · Xbox",
    image:
      "/images/g8.jpg",
    description: "Explore a sprawling city filled with action and adventure.",
  },
  {
    id: 9,
    title: "God of War Ragnarök",
    genre: "Action",
    rating: 4.8,
    year: 2022,
    platform: "PlayStation · PC",
    image:
      "/images/g9.jpg",
    description: "Join Kratos and Atreus on an epic Norse adventure.",
  },
  {
    id: 10,
    title: "Need for Speed Unbound",
    genre: "Racing",
    rating: 4.4,
    year: 2022,
    platform: "PC · PlayStation · Xbox",
    image:
      "/images/g10.jpg",
    description: "Race against rivals and build your reputation on the streets.",
  },
  {
    id: 11,
    title: "Counter-Strike 2",
    genre: "FPS",
    rating: 4.7,
    year: 2023,
    platform: "PC",
    image:
      "/images/g11.jpg",
    description: "Test your precision and strategy in competitive matches.",
  },
  {
    id: 12,
    title: "The Witcher 3",
    genre: "Adventure",
    rating: 4.9,
    year: 2015,
    platform: "PC · PlayStation · Xbox · Switch",
    image:
      "/images/g12.jpg",
    description: "Take on dangerous contracts in a vast fantasy world.",
  },
];

const categories = ["All Games", "Action", "Adventure", "Racing", "FPS", "Sandbox"];

function readSavedIds(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Games");
  const [favorites, setFavorites] = useState(() =>
    readSavedIds("pixoraFavorites")
  );
  const [explored, setExplored] = useState(() =>
    readSavedIds("pixoraExplored")
  );
  const [notice, setNotice] = useState("");

  const user = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("pixoraUser") || "{}");
    } catch {
      return {};
    }
  }, []);

  const username =
    localStorage.getItem("pixoraUsername") ||
    user.name ||
    user.username ||
    (user.email ? user.email.split("@")[0] : "Gamer");

  const avatar = localStorage.getItem("pixoraAvatar") || "🎮";

  useEffect(() => {
    localStorage.setItem("pixoraFavorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("pixoraExplored", JSON.stringify(explored));
  }, [explored]);

  const filteredGames = games.filter((game) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      game.title.toLowerCase().includes(query) ||
      game.genre.toLowerCase().includes(query) ||
      game.platform.toLowerCase().includes(query);

    const matchesCategory =
      category === "All Games" || game.genre === category;

    return matchesSearch && matchesCategory;
  });

  function toggleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((gameId) => gameId !== id)
        : [...previous, id]
    );
  }

  function exploreGame(game) {
    setExplored((previous) =>
      previous.includes(game.id) ? previous : [...previous, game.id]
    );

    setNotice(`${game.title} added to your explored games!`);
    window.setTimeout(() => setNotice(""), 2500);
  }

  function logout() {
    sessionStorage.removeItem("pixoraUser");
    window.location.href = "/";
  }

  return (
    <div className="pixora-dashboard">
      <header className="dashboard-header">
        <a className="dashboard-logo" href="/dashboard">
          PIX<span>ORA</span>
          <small>GAMING DISCOVERY</small>
        </a>

        <nav className="dashboard-nav">
          <a className="active" href="/dashboard">
            Discover
          </a>
          <a href="/profile">My Profile</a>
        </nav>

        <div className="dashboard-user">
          <a className="dashboard-user-info" href="/profile">
            <span className="dashboard-avatar">{avatar}</span>
            <span>
              <small>PLAYER</small>
              <strong>{username}</strong>
            </span>
          </a>

          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="discovery-hero">
          <div className="hero-content">
            <span className="eyebrow">
              <span className="live-dot" /> YOUR NEXT ADVENTURE STARTS HERE
            </span>

            <h1>
              Find your next
              <br />
              <span>gaming obsession.</span>
            </h1>

            <p>
              Discover incredible worlds, explore new genres, and build your
              personal collection of unforgettable games.
            </p>

            <a className="hero-button" href="#game-library">
              Explore games <span>↗</span>
            </a>
          </div>

          <div className="hero-decoration" aria-hidden="true">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-controller">🎮</div>
            <span className="floating-symbol symbol-one">✦</span>
            <span className="floating-symbol symbol-two">✧</span>
            <span className="floating-symbol symbol-three">+</span>
          </div>
        </section>

        <section className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-icon">🎮</span>
            <div>
              <strong>{games.length}</strong>
              <span>Games to discover</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">❤️</span>
            <div>
              <strong>{favorites.length}</strong>
              <span>Your favorites</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">🧭</span>
            <div>
              <strong>{explored.length}</strong>
              <span>Games explored</span>
            </div>
          </div>
        </section>

        <section className="game-library" id="game-library">
          <div className="library-heading">
            <div>
              <span className="section-eyebrow">THE GAME LIBRARY</span>
              <h2>Discover games<span>.</span></h2>
              <p>Handpicked worlds worth getting lost in.</p>
            </div>

            <div className="library-count">
              <strong>{filteredGames.length.toString().padStart(2, "0")}</strong>
              <span>GAMES FOUND</span>
            </div>
          </div>

          <div className="game-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search games, genres, or platforms..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search games"
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search">
                ×
              </button>
            )}
          </div>

          <div className="category-filters" aria-label="Game categories">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "category-active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {notice && (
            <div className="dashboard-notice" role="status">
              <span>✓</span> {notice}
            </div>
          )}

          {filteredGames.length > 0 ? (
            <div className="game-grid">
              {filteredGames.map((game) => {
                const isFavorite = favorites.includes(game.id);
                const isExplored = explored.includes(game.id);

                return (
                  <article className="game-card" key={game.id}>
                    <div className="game-image-wrapper">
                      <img
                        className="game-image"
                        src={game.image}
                        alt={`${game.title} game artwork`}
                        loading="lazy"
                      />

                      <span className="game-genre">{game.genre}</span>

                      <button
                        className={`favorite-button ${
                          isFavorite ? "is-favorite" : ""
                        }`}
                        onClick={() => toggleFavorite(game.id)}
                        aria-label={
                          isFavorite
                            ? `Remove ${game.title} from favorites`
                            : `Add ${game.title} to favorites`
                        }
                        aria-pressed={isFavorite}
                      >
                        {isFavorite ? "♥" : "♡"}
                      </button>

                      <span className="game-year">{game.year}</span>
                    </div>

                    <div className="game-card-content">
                      <div className="game-title-row">
                        <h3>{game.title}</h3>
                        <span className="game-rating">
                          <span>★</span> {game.rating.toFixed(1)}
                        </span>
                      </div>

                      <p className="game-description">{game.description}</p>

                      <div className="game-platform">{game.platform}</div>

                      <button
                        className={`explore-game-button ${
                          isExplored ? "game-explored" : ""
                        }`}
                        onClick={() => exploreGame(game)}
                      >
                        {isExplored ? "✓ Explored" : "Explore Game"}
                        <span>{isExplored ? "✓" : "↗"}</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-games">
              <span>🔎</span>
              <h3>No games found</h3>
              <p>Try another search term or select a different category.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All Games");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </section>

        <footer className="dashboard-footer">
          <a className="footer-logo" href="/dashboard">
            PIX<span>ORA</span>
          </a>
          <p>Discover new worlds. Find your next obsession.</p>
          <span>© {new Date().getFullYear()} PIXORA Gaming</span>
        </footer>
      </main>
    </div>
  );
}

