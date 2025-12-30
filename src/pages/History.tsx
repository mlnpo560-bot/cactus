import { Clock, Search, Trash2, ArrowRight } from 'lucide-react';

interface HistoryItem {
    query: string;
    timestamp: number;
}

interface HistoryProps {
    history: HistoryItem[];
    onSelect: (q: string) => void;
    onClear: () => void;
}

export default function History({ history, onSelect, onClear }: HistoryProps) {

    // Group logic could be added here (Today, Yesterday, etc.)

    return (
        <div className="page-content" style={{ paddingLeft: '80px', paddingRight: '40px', paddingTop: '40px', minHeight: '100vh' }}>
            <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem' }}>Search History</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Rediscover your past explorations.</p>
                </div>

                {history.length > 0 && (
                    <button
                        onClick={onClear}
                        className="action-btn"
                        style={{ color: '#ff4444', borderColor: 'rgba(255, 68, 68, 0.2)' }}
                    >
                        <Trash2 size={18} />
                        Clear History
                    </button>
                )}
            </header>

            {history.length === 0 ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '400px',
                    color: 'var(--text-dim)'
                }}>
                    <Clock size={48} style={{ opacity: 0.3, marginBottom: '20px' }} />
                    <p>No search history found yet.</p>
                </div>
            ) : (
                <div className="animate-fade-in" style={{ display: 'grid', gap: '16px' }}>
                    {history.map((item, i) => (
                        <div
                            key={i}
                            className="glass-panel"
                            onClick={() => onSelect(item.query)}
                            style={{
                                padding: '20px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer',
                                marginBottom: 0
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Search size={18} color="var(--primary)" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{item.query}</h3>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                                        {new Date(item.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="arrow-icon" style={{ opacity: 0.5 }}>
                                <ArrowRight size={20} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
