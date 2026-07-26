import { GENRES } from '../../data/movies.js'
import './GenreFilterBar.css'

export default function GenreFilterBar({ activeGenre, onSelect }) {
  return (
    <div className="genre-bar" role="tablist" aria-label="Filter movies by genre">
      {GENRES.map((genre) => (
        <button
          key={genre}
          role="tab"
          aria-selected={activeGenre === genre}
          className={`genre-chip ${activeGenre === genre ? 'genre-chip-active' : ''}`}
          onClick={() => onSelect(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}
