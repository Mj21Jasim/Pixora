import { useEffect, useState } from 'react';
import './Profile.css';

const avatars = ['🎮', '👾', '🦊', '🐉', '🤖', '👑', '🚀', '⚡'];

const games = [
{
id: 1,
title: 'Cyberpunk 2077',
genre: 'RPG',
image:
'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80',
},
{
id: 2,
title: 'Valorant',
genre: 'FPS',
image:
'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=500&q=80',
},
{
id: 3,
title: 'Forza Horizon',
genre: 'Racing',
image:
'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=500&q=80',
},
{
id: 4,
title: 'Elden Ring',
genre: 'RPG',
image:
'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=500&q=80',
},
{
id: 5,
title: 'Apex Legends',
genre: 'FPS',
image:
'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=500&q=80',
},
{
id: 6,
title: 'Minecraft',
genre: 'Sandbox',
image:
'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=500&q=80',
},
];

function Profile() {
const [user, setUser] = useState(null);
const [username, setUsername] = useState('');
const [avatar, setAvatar] = useState('🎮');
const [editing, setEditing] = useState(false);
const [notice, setNotice] = useState('');

const [favorites, setFavorites] = useState([]);
const [explored, setExplored] = useState([]);

useEffect(() => {
const savedUser = sessionStorage.getItem('pixoraUser');


if (!savedUser) {
  window.location.replace('/');
  return;
}

try {
  const parsedUser = JSON.parse(savedUser);

  setUser(parsedUser);

  const emailUsername = parsedUser.email?.split('@')[0] || 'Player';

  setUsername(
    localStorage.getItem('pixoraUsername') || emailUsername
  );

  setAvatar(localStorage.getItem('pixoraAvatar') || '🎮');

  setFavorites(
    JSON.parse(localStorage.getItem('pixoraFavorites') || '[]')
  );

  setExplored(
    JSON.parse(localStorage.getItem('pixoraExplored') || '[]')
  );
} catch {
  sessionStorage.removeItem('pixoraUser');
  window.location.replace('/');
}


}, []);

const handleSaveProfile = () => {
const cleanUsername = username.trim();


if (!cleanUsername) {
  setNotice('Please enter a display name.');
  return;
}

localStorage.setItem('pixoraUsername', cleanUsername);
localStorage.setItem('pixoraAvatar', avatar);

setUsername(cleanUsername);
setEditing(false);
setNotice('Your profile has been updated successfully!');

window.setTimeout(() => setNotice(''), 3000);


};

const handleLogout = () => {
sessionStorage.removeItem('pixoraUser');
window.location.replace('/');
};

if (!user) {
return ( <main className="profile-loading"> <div className="profile-loading-orb"></div> <p>LOADING PLAYER PROFILE...</p> </main>
);
}

const email = user.email || '';
const favoriteGames = games.filter((game) =>
favorites.includes(game.id)
);

const level = Math.floor(explored.length / 2) + 1;
const xp = (explored.length % 2) * 50;
const xpProgress = Math.min(xp, 100);

return ( <main className="profile-page"> <div className="profile-glow profile-glow-one"></div> <div className="profile-glow profile-glow-two"></div>


  <header className="profile-header">
    <a href="/dashboard" className="profile-brand">
      <span className="profile-brand-icon">P</span>
      PIXORA<span className="profile-brand-dot">.</span>
    </a>

    <nav className="profile-navigation">
      <a href="/dashboard">Discover Games</a>
      <span className="profile-nav-active">My Profile</span>
    </nav>

    <button
      className="profile-logout"
      type="button"
      onClick={handleLogout}
    >
      Logout ↗
    </button>
  </header>

  <section className="profile-container">
    <div className="profile-page-heading">
      <p className="profile-eyebrow">PLAYER CENTER / ACCOUNT</p>
      <h1>Your <span>Profile.</span></h1>
      <p>Everything about your gaming identity, in one place.</p>
    </div>

    {notice && (
      <div className="profile-notice" role="status">
        ✓ {notice}
      </div>
    )}

    <section className="profile-hero-card">
      <div className="profile-avatar-section">
        <div className="profile-avatar-large">
          {avatar}
          <span className="profile-avatar-online"></span>
        </div>

        <div className="profile-identity">
          <span className="profile-online-label">
            <span></span> PLAYER ONLINE
          </span>

          {editing ? (
            <div className="profile-edit-fields">
              <label htmlFor="profile-username">Display name</label>
              <input
                id="profile-username"
                type="text"
                value={username}
                maxLength={24}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter your gamer name"
              />

              <label>Choose your avatar</label>
              <div className="profile-avatar-options">
                {avatars.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={
                      avatar === item ? 'avatar-option-selected' : ''
                    }
                    onClick={() => setAvatar(item)}
                    aria-label={`Choose ${item} avatar`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="profile-edit-actions">
                <button
                  type="button"
                  className="profile-save-button"
                  onClick={handleSaveProfile}
                >
                  SAVE CHANGES
                </button>

                <button
                  type="button"
                  className="profile-cancel-button"
                  onClick={() => {
                    setUsername(
                      localStorage.getItem('pixoraUsername') ||
                        email.split('@')[0] ||
                        'Player'
                    );
                    setAvatar(
                      localStorage.getItem('pixoraAvatar') || '🎮'
                    );
                    setEditing(false);
                    setNotice('');
                  }}
                >
                  CANCEL
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2>{username}</h2>
              <p className="profile-email">{email}</p>
              <p className="profile-member-label">
                ✦ PIXORA GAMER
              </p>

              <button
                type="button"
                className="profile-edit-button"
                onClick={() => setEditing(true)}
              >
                ✎ EDIT PROFILE
              </button>
            </>
          )}
        </div>

        <div className="profile-level-card">
          <span className="profile-level-label">PLAYER LEVEL</span>
          <strong>{String(level).padStart(2, '0')}</strong>
          <span className="profile-level-rank">GAME EXPLORER</span>

          <div className="profile-xp-label">
            <span>EXPERIENCE</span>
            <span>{xp}/100 XP</span>
          </div>

          <div
            className="profile-xp-track"
            role="progressbar"
            aria-label="Experience progress"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={xpProgress}
          >
            <div style={{ width: `${xpProgress}%` }}></div>
          </div>
        </div>
      </div>
    </section>

    <section className="profile-stats-grid">
      <article className="profile-stat-card">
        <span className="profile-stat-icon">◈</span>
        <p>AVAILABLE GAMES</p>
        <h3>{String(games.length).padStart(2, '0')}</h3>
        <span>In your gameverse</span>
      </article>

      <article className="profile-stat-card">
        <span className="profile-stat-icon pink-stat-icon">♥</span>
        <p>FAVORITE GAMES</p>
        <h3>{String(favorites.length).padStart(2, '0')}</h3>
        <span>Your personal collection</span>
      </article>

      <article className="profile-stat-card">
        <span className="profile-stat-icon cyan-stat-icon">✧</span>
        <p>GAMES EXPLORED</p>
        <h3>{String(explored.length).padStart(2, '0')}</h3>
        <span>Worlds you discovered</span>
      </article>

      <article className="profile-stat-card">
        <span className="profile-stat-icon green-stat-icon">✓</span>
        <p>ACCOUNT STATUS</p>
        <h3 className="profile-active-status">ACTIVE</h3>
        <span>Ready to play</span>
      </article>
    </section>

    <section className="profile-favorites-section">
      <div className="profile-section-heading">
        <div>
          <p className="profile-eyebrow">YOUR PERSONAL COLLECTION</p>
          <h2>Favorite <span>Games.</span></h2>
        </div>

        <a href="/dashboard#games" className="profile-browse-link">
          BROWSE GAMES ↗
        </a>
      </div>

      {favoriteGames.length > 0 ? (
        <div className="profile-favorites-grid">
          {favoriteGames.map((game) => (
            <article className="profile-favorite-card" key={game.id}>
              <img src={game.image} alt={game.title} loading="lazy" />
              <div className="profile-favorite-overlay"></div>

              <div className="profile-favorite-content">
                <span>{game.genre}</span>
                <h3>{game.title}</h3>
                <span className="profile-favorite-heart">♥</span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="profile-empty-favorites">
          <span>♡</span>
          <h3>Your collection starts here</h3>
          <p>
            You haven't added any favorite games yet.
            Visit Discover Games and tap the heart on a game you love.
          </p>
          <a href="/dashboard#games">EXPLORE GAMES ↗</a>
        </div>
      )}
    </section>

    <section className="profile-bottom-banner">
      <span>✦</span>
      <div>
        <p>READY FOR YOUR NEXT ADVENTURE?</p>
        <h2>Keep leveling up.</h2>
      </div>
      <a href="/dashboard#games">DISCOVER GAMES ↗</a>
    </section>
  </section>

  <footer className="profile-footer">
    <a href="/dashboard">PIXORA.</a>
    <p>LEVEL UP YOUR WORLD.</p>
    <p>PLAYER: {username}</p>
  </footer>
</main>


);
}

export default Profile;
