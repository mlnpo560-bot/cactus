import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Logo from '../components/Logo';

export default function Login({ onLogin }: { onLogin: (user: any) => void }) {
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            const mockUser = {
                name: "Demo User",
                email: "demo@cactus.ai",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cactus"
            };
            localStorage.setItem('cactus_user', JSON.stringify(mockUser));
            onLogin(mockUser);
        }, 1500);
    };

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-app)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Effects */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                width: '300px',
                height: '300px',
                background: 'var(--primary)',
                filter: 'blur(150px)',
                opacity: 0.1,
                borderRadius: '50%'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '20%',
                width: '400px',
                height: '400px',
                background: 'var(--accent)',
                filter: 'blur(150px)',
                opacity: 0.1,
                borderRadius: '50%'
            }} />

            <div className="glass-panel animate-fade-in" style={{
                padding: '4rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem',
                width: '100%',
                maxWidth: '500px',
                border: '1px solid rgba(255,255,255,0.08)'
            }}>
                <div style={{ transform: 'scale(1.2)', marginBottom: '1rem' }}>
                    <Logo size={80} showText={false} />
                </div>

                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                        Welcome to <span className="text-gradient">Cactus</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        The intelligent search engine for the next generation.
                    </p>
                </div>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={{
                        background: '#fff',
                        color: '#333',
                        border: 'none',
                        padding: '12px 24px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderRadius: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        opacity: loading ? 0.7 : 1,
                        marginTop: '1rem'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    {loading ? 'Connecting...' : (
                        <>
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span>Sign in with Google</span>
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '2rem' }}>
                    By connecting, you agree to our Terms of Deep Thought.
                </p>
            </div>
        </div>
    );
}
