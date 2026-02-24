import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import ErrorPage from '../pages/ErrorPage'
import DirectorContainer from '../pages/DirectorContainer'
import DirectorList from '../pages/DirectorList'
import DirectorForm from '../pages/DirectorForm'
import DirectorCard from '../pages/DirectorCard'
import MovieCard from '../pages/MovieCard'
import MovieForm from '../pages/MovieForm'

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/directors",
    element: <DirectorContainer />,
    children: [
      {
        index: true,
        element: <DirectorList />,
      },
      {
        path: "new",
        element: <DirectorForm />,
      },
      {
        path: ":id",
        element: <DirectorCard />,
        children: [
          {
            path: "movies/new",
            element: <MovieForm />,
          },
          {
            path: "movies/:movieId",
            element: <MovieCard />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]

beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url.includes('/directors')) {
      return Promise.resolve({
        ok: true,
        json: async () => [
          {
            id: "1",
            name: 'Christopher Nolan',
            bio: 'Director of mind-bending films.',
            movies: [{ id: 'm1', title: 'Inception', time: 148, genres: ['Sci-Fi', 'Thriller'] }],
          },
        ],
      })
    }
  })
})

describe('🎬 Movie Directory App - Vitest Suite', () => {
  it('renders Home component at root ("/")', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/'] })
    render(<RouterProvider router={router} />)
    expect(await screen.findByText(/Welcome to the Movie Directory/i)).toBeInTheDocument()
  })

  it('displays directors list at "/directors"', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/directors'] })
    render(<RouterProvider router={router} />)
    expect(await screen.findByText(/Christopher Nolan/i)).toBeInTheDocument()
  })

  it('navigates to DirectorForm on "/directors/new"', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/directors/new'] })
    render(<RouterProvider router={router} />)
    expect(await screen.findByText(/Add New Director/i)).toBeInTheDocument()
  })

  it('navigates to a specific DirectorCard page', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/directors/1'] })
    render(<RouterProvider router={router} />)
    expect(await screen.findByText(/Director of mind-bending films/i)).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /Inception/i })).toBeInTheDocument()
  })

  it('navigates to About page when clicking About link', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/about'] })
    render(<RouterProvider router={router} />)
    expect(await screen.findByText(/About the Movie Directory/i)).toBeInTheDocument()
  })

  it('navigates to MovieForm at "/directors/1/movies/new"', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/directors/1/movies/new'] })
    render(<RouterProvider router={router} />)
    expect((await screen.findAllByText(/Add New Movie/i)).length).toBe(2)
  })

  it('renders MovieCard details correctly', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/directors/1/movies/m1'] })
    render(<RouterProvider router={router} />)
    const movieTitle = await screen.findAllByText(/Inception/i)
    expect(movieTitle[1]).toBeInTheDocument() // Ensure checking the right element (second instance is h2)
    expect(await screen.findByText(/Duration: 148 minutes/i)).toBeInTheDocument()
    expect(await screen.findByText(/Sci-Fi, Thriller/i)).toBeInTheDocument()
  })

  it('handles invalid director ID gracefully', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/directors/999'] })
    render(<RouterProvider router={router} />)
    expect(await screen.findByText(/Director not found/i)).toBeInTheDocument()
  })

  it('handles invalid movie ID gracefully', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/directors/1/movies/invalid'] })
    render(<RouterProvider router={router} />)
    expect(await screen.findByText(/Movie not found/i)).toBeInTheDocument()
  })
})
