import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          トレンドウォッチャー
        </Link>
        <nav className="nav-links">
          <Link 
            to="/relatedQueries" 
            className={location.pathname === '/relatedQueries' ? 'active' : ''}
          >
            関連トレンド
          </Link>
          <Link 
            to="/dailyTrends"
            className={location.pathname === '/dailyTrends' ? 'active' : ''}
          >
            デイリートレンド
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header; 