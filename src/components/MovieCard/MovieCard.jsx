import { Link } from 'react-router-dom'
import './MovieCard.css'

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`} className="movie-card">
      <div className="movie-card-poster-wrap">
        <img
          className="movie-card-poster"
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
        />
        <span className="movie-card-rating">
          <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2l2.9 6.26 6.9.6-5.2 4.53 1.57 6.77L12 16.9l-6.17 3.26 1.57-6.77L2.2 8.86l6.9-.6L12 2z"
            />
          </svg>
          {movie.rating}
        </span>
        <div className="movie-card-play">
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path fill="currentColor" d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <h3 className="movie-card-title">{movie.title}</h3>
      <p className="movie-card-meta">
        {movie.genre} · {movie.year} · {movie.duration}
      </p>
    </Link>
  )
}
