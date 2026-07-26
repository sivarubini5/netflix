import { useMemo, useState } from 'react'
import Header from '../../components/Header/Header.jsx'
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel.jsx'
import GenreFilterBar from '../../components/GenreFilterBar/GenreFilterBar.jsx'
import MovieCard from '../../components/MovieCard/MovieCard.jsx'
import movies from '../../data/movies.js'
import { useWatchLater } from '../../context/WatchLaterContext.jsx'
import './Home.css'

export default function Home() {
  const [activeGenre, setActiveGenre] = useState('All')
  const { watchLater } = useWatchLater()

  const trendingNow = useMemo(
    () =>
      [...movies]
        .sort((a, b) => Number(b.rating) - Number(a.rating))
        .slice(0, 16),
    [],
  )

  const freshReleases = useMemo(
    () => movies.filter((movie) => movie.year >= 2015).slice(0, 16),
    [],
  )

  const filteredMovies = useMemo(() => {
    if (activeGenre === 'All') return movies
    return movies.filter((movie) => movie.genre === activeGenre)
  }, [activeGenre])

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-overlay" />
          <div className="hero-content container">
            <p className="eyebrow">Nxtflix</p>
            <h1>Discover your next favourite</h1>
            <p className="hero-subtitle">
              Browse {movies.length} movies across every genre, and keep track of
              what you want to watch with your personal Watch Later list
              {watchLater.length > 0 ? ` — you have ${watchLater.length} saved.` : '.'}
            </p>
          </div>
        </section>

        <div className="container home-content">
          <MovieCarousel title="Trending Now" movies={trendingNow} direction="left" />
          <MovieCarousel title="Fresh Releases" movies={freshReleases} direction="right" />

          <section className="browse-section">
            <h2 className="browse-title">Browse by Genre</h2>
            <GenreFilterBar activeGenre={activeGenre} onSelect={setActiveGenre} />

            {filteredMovies.length === 0 ? (
              <p className="empty-state">No movies found for this genre.</p>
            ) : (
              <div className="movie-grid">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  )
}
