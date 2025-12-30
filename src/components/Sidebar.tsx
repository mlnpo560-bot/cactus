import { Home, Search, Clock, LogOut } from 'lucide-react';
import Logo from './Logo';

interface SidebarProps {
    activeView: string;
    onNavigate: (view: string) => void;
    onLogout: () => void;
}

export default function Sidebar({ activeView, onNavigate, onLogout }: SidebarProps) {
    return (
        <aside className="sidebar glass-panel">
            <div className="logo-container" onClick={() => onNavigate('home')}>
                <Logo size={40} showText={true} />
            </div>

            <nav className="nav-menu">
                <div
                    className={`nav-item ${activeView === 'home' ? 'active' : ''}`}
                    onClick={() => onNavigate('home')}
                >
                    <div className="nav-icon"><Home size={22} /></div>
                    <span className="nav-label">Home</span>
                </div>

                <div
                    className={`nav-item ${activeView === 'search' ? 'active' : ''}`}
                    onClick={() => onNavigate('search')}
                >
                    <div className="nav-icon"><Search size={22} /></div>
                    <span className="nav-label">Search</span>
                </div>

                <div
                    className={`nav-item ${activeView === 'history' ? 'active' : ''}`}
                    onClick={() => onNavigate('history')}
                >
                    <div className="nav-icon"><Clock size={22} /></div>
                    <span className="nav-label">History</span>
                </div>

                <div style={{ flex: 1 }}></div>

                <div className="nav-item" onClick={onLogout} style={{ color: '#ff4444', marginTop: 'auto' }}>
                    <div className="nav-icon"><LogOut size={22} /></div>
                    <span className="nav-label">Logout</span>
                </div>
            </nav>
        </aside>
    );
}
