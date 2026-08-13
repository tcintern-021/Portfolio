export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      color: 'var(--color-text-primary)',
      padding: '2rem'
    }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Page Not Found</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
        The page you are looking for does not exist.
      </p>
      <a href="/" className="btn btn-primary">
        Return Home
      </a>
    </div>
  );
}
