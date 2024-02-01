import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import App from './App';

it('renders home page when path is /', () => {
  const history = createMemoryHistory()
  history.push('/')
  render(
    <Router history={history}>
      <App />
    </Router>
  )
  expect(screen.getByText(/home/i)).toBeInTheDocument();
});

it('renders search page when path is /search', () => {
  const history = createMemoryHistory()
  history.push('/search')
  render(
    <Router history={history}>
      <App />
    </Router>
  )
  expect(screen.getByText(/search/i)).toBeInTheDocument();
});

it('renders login page when path is /login', () => {
  const history = createMemoryHistory()
  history.push('/login')
  render(
    <Router history={history}>
      <App />
    </Router>
  )
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

it('renders not found page when path is not defined', () => {
  const history = createMemoryHistory()
  history.push('/not-defined')
  render(
    <Router history={history}>
      <App />
    </Router>
  )
  expect(screen.getByText(/not found/i)).toBeInTheDocument();
});