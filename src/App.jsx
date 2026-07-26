import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import SignIn from './pages/SignIn/SignIn.jsx'
import Home from './pages/Home/Home.jsx'
import MovieDetails from './pages/MovieDetails/MovieDetails.jsx'
import WatchLater from './pages/WatchLater/WatchLater.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/movies/:id"
        element={
          <ProtectedRoute>
            <MovieDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/watch-later"
        element={
          <ProtectedRoute>
            <WatchLater />
          </ProtectedRoute>
        }
      />

      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
