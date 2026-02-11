import './Navigation.css';

const Navigation = ({ currentPage, onPageChange }) => {
  const pages = [
    { id: 'piano', label: 'Piano' },
    { id: 'scale', label: 'Scale Builder' },
    { id: 'chord', label: 'Chord Builder' }
  ];

  return (
    <div className="navigation">
      {pages.map(page => (
        <button
          key={page.id}
          className={`nav-tab ${currentPage === page.id ? 'active' : ''}`}
          onClick={() => onPageChange(page.id)}
        >
          {page.label}
        </button>
      ))}
    </div>
  );
};

export default Navigation;
