import { Link } from 'react-router-dom'
import './MovieCarousel.css'

export default function MovieCarousel({ title, movies, direction = 'left' }) {
  // Duplicate the list so the CSS animation can loop seamlessly.
  const loopMovies = [...movies, ...movies]

  return (
    <section className="carousel">
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel-viewport">
        <div
          className={`carousel-track carousel-track-${direction}`}
          style={{ '--item-count': movies.length }}
        >
          {loopMovies.map((movie, index) => (
            <Link
              to={`/movies/${movie.id}`}
              className="carousel-item"
              key={`${movie.id}-${index}`}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="carousel-item-img"
                loading="lazy"
              />
              <div className="carousel-item-overlay">
                <p className="carousel-item-title">{movie.title}</p>
                <p className="carousel-item-meta">
                  {movie.genre} · {movie.rating}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
