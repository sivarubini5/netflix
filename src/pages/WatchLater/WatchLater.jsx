import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import MovieCard from '../../components/MovieCard/MovieCard.jsx'
import { useWatchLater } from '../../context/WatchLaterContext.jsx'
import './WatchLater.css'

export default function WatchLater() {
  const { watchLater } = useWatchLater()

  return (
    <>
      <Header />
      <main className="container watch-later-page">
        <h1 className="watch-later-title">Watch Later</h1>

        {watchLater.length === 0 ? (
          <div className="watch-later-empty">
            <p>Your Watch Later list is empty.</p>
            <Link to="/" className="btn btn-primary">
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="movie-grid">
            {watchLater.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
