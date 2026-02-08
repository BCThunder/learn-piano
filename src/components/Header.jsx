const Header = () => {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '30px',
      marginBottom: '30px',
      maxWidth: '800px',
      width: '100%',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
    }}>
      <h1 style={{
        margin: '0 0 10px 0',
        fontSize: '32px',
        fontWeight: '700',
        color: '#1a1a1a'
      }}>
        Scale Builder
      </h1>
      <p style={{
        margin: '0',
        color: '#666',
        fontSize: '16px'
      }}>
        Learn music scales through interactive building
      </p>
    </div>
  );
};

export default Header;