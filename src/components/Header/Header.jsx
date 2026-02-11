import './Header.css';

const Header = ({ title = "Scale Builder", subtitle = "Learn music scales through interactive building" }) => {
  return (
    <div className="card header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

export default Header;
