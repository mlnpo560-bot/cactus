import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import Login from './pages/Login';
import History from './pages/History';
import './styles/components.css';

interface HistoryItem {
  query: string;
  timestamp: number;
}

function App() {
  const [activeView, setActiveView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Init
  useEffect(() => {
    const savedUser = localStorage.getItem('cactus_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedHistory = localStorage.getItem('cactus_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const handleLogin = (u: any) => {
    setUser(u);
    setActiveView('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cactus_user');
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setActiveView('search');

    // Add to history (prevent dupes at top)
    const newEntry = { query: q, timestamp: Date.now() };
    const updatedHistory = [newEntry, ...history.filter(h => h.query !== q)].slice(0, 50);
    setHistory(updatedHistory);
    localStorage.setItem('cactus_history', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('cactus_history');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <Sidebar activeView={activeView} onNavigate={setActiveView} onLogout={handleLogout} />

      <main className="main-content">
        {activeView === 'home' && <Home onSearch={handleSearch} />}
        {activeView === 'search' && <SearchPage query={searchQuery} />}
        {activeView === 'history' && (
          <History
            history={history}
            onSelect={handleSearch}
            onClear={clearHistory}
          />
        )}
      </main>
    </div>
  );
}

export default App;
