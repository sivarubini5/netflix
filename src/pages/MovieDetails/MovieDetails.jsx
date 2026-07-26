import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import movies from '../../data/movies.js'
import { useWatchLater } from '../../context/WatchLaterContext.jsx'
import './MovieDetails.css'

export default function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isInWatchLater, toggleWatchLater } = useWatchLater()

  const movie = movies.find((item) => String(item.id) === id)

  if (!movie) {
    return <Navigate to="/not-found" replace />
  }

  const saved = isInWatchLater(movie.id)

  return (
    <>
      <Header />
      <main className="details">
        <div className="details-backdrop" style={{ backgroundImage: `url(${movie.backdrop})` }}>
          <div className="details-backdrop-overlay" />
        </div>

        <div className="container details-content">
          <button className="btn btn-ghost details-back" onClick={() => navigate(-1)}>
            ← Go Back
          </button>

          <div className="details-body">
            <img className="details-poster" src={movie.poster} alt={movie.title} />

            <div className="details-info">
              <h1 className="details-title">{movie.title}</h1>

              <div className="details-meta">
                <span className="details-genre-tag">{movie.genre}</span>
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
                <span className="details-rating">
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 2l2.9 6.26 6.9.6-5.2 4.53 1.57 6.77L12 16.9l-6.17 3.26 1.57-6.77L2.2 8.86l6.9-.6L12 2z"
                    />
                  </svg>
                  {movie.rating}
                </span>
              </div>

              <p className="details-overview">{movie.overview}</p>

              <button
                className={`btn ${saved ? 'btn-ghost' : 'btn-primary'} details-watch-later`}
                onClick={() => toggleWatchLater(movie)}
              >
                {saved ? '✓ Added to Watch Later' : '+ Watch Later'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
