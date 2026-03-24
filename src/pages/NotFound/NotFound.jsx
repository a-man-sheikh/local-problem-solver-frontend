import { Link } from 'react-router-dom';

/**
 * 404 — Not Found Page
 */
export default function NotFound() {
  return (
    <section className="page not-found-page">
      <h1>404</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </section>
  );
}
