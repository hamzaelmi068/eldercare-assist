import { useNavigate, useLocation } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../Pages/utils/constants';

export function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg py-6" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-primary-600 text-3xl">
            <button 
              onClick={() => navigate('/')} 
              className="hover:text-primary-700 transition-colors"
              aria-label="Go to home page"
            >
              ElderCareAssist
            </button>
          </h1>
          <div className="flex gap-6" role="navigation">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`btn-primary text-2xl ${isActive ? 'bg-primary-700 ring-4 ring-primary-200' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Go to ${item.name} page`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}