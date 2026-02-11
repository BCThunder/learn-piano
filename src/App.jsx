import { useState } from 'react';
import './App.css';
import './styles/global.css';
import Navigation from './components/Navigation';
import SimplePiano from './pages/Piano';
import ScaleBuilder from './pages/ScaleBuilder';
import ChordBuilder from './pages/ChordBuilder';

function App() {
  const [currentPage, setCurrentPage] = useState('piano');

  const renderPage = () => {
    switch (currentPage) {
      case 'piano':
        return <SimplePiano />;
      case 'scale':
        return <ScaleBuilder />;
      case 'chord':
        return <ChordBuilder />;
      default:
        return <SimplePiano />;
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      overflow: 'hidden'
    }}>
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="app-container">
        {renderPage()}
      </div>
    </div>
  );
}

export default App
