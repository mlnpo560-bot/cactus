import { Search, Hash, TrendingUp, Users, Mic, Camera, Paperclip } from 'lucide-react';
import { useState, useRef } from 'react';
import Logo from '../components/Logo';

export default function Home({ onSearch }: { onSearch: (q: string) => void }) {
    const [val, setVal] = useState('');
    const [isListening, setIsListening] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        if (val.trim()) onSearch(val);
    }

    const handleVoice = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Voice search is not supported in this browser.");
            return;
        }

        setIsListening(true);
        // @ts-ignore
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
            const text = event.results[0][0].transcript;
            setVal(text);
            onSearch(text);
            setIsListening(false);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognition.start();
    };

    const handleCamera = () => {
        // Simulation
        const term = prompt("Simulate Image Search: What is in the picture?");
        if (term) onSearch(term);
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onSearch(`Analysis of ${e.target.files[0].name}`);
        }
    }

    return (
        <div className="page-content" style={{ paddingLeft: '80px', minHeight: '100vh', width: '100%' }}>
            <main className="hero-section animate-fade-in">
                <div style={{ marginBottom: 'var(--space-lg)', transform: 'scale(1.5)' }}>
                    <Logo size={120} showText={true} />
                </div>

                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder={isListening ? "Listening..." : "Ask via text, voice, or image..."}
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        style={{ paddingRight: '140px' }}
                    />

                    <div className="input-actions">
                        <button className="action-btn" onClick={handleVoice} style={{ color: isListening ? 'var(--primary)' : '' }}>
                            <Mic size={20} />
                        </button>
                        <button className="action-btn" onClick={handleCamera}>
                            <Camera size={20} />
                        </button>
                        <button className="action-btn" onClick={() => fileInputRef.current?.click()}>
                            <Paperclip size={20} />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFile}
                        />
                    </div>

                    <button className="search-btn" onClick={handleSearch}>
                        <Search size={22} />
                    </button>
                </div>

                <div className="trending-grid">
                    <div className="trend-item" onClick={() => onSearch("AI Revolution")}>
                        <div className="trend-icon" style={{ color: 'var(--secondary)' }}><TrendingUp /></div>
                        <h3>AI Revolution</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>+24k searches today</p>
                    </div>

                    <div className="trend-item" onClick={() => onSearch("Global Connect")}>
                        <div className="trend-icon" style={{ color: 'var(--accent)' }}><Users /></div>
                        <h3>Global Connect</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Join the conversation</p>
                    </div>

                    <div className="trend-item" onClick={() => onSearch("Sustainable Tech")}>
                        <div className="trend-icon" style={{ color: 'var(--primary)' }}><Hash /></div>
                        <h3>Sustainable Tech</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Trending worldwide</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
