

export default function Logo({ size = 40, showText = true }: { size?: number, showText?: boolean }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="logo-svg"
            >
                {/* Premium Glow Filters */}
                <defs>
                    <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <linearGradient id="main-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00E5FF" />
                        <stop offset="100%" stopColor="#2E7D32" />
                    </linearGradient>
                </defs>

                {/* Cactus Main Stem - Rounded & Smooth */}
                <path
                    d="M50 85 V30 Q50 20 60 20 Q70 20 70 30 V40"
                    stroke="url(#main-grad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    filter="url(#soft-glow)"
                    opacity="0.9"
                />

                {/* Left Arm */}
                <path
                    d="M50 60 H40 Q30 60 30 50 V40"
                    stroke="url(#main-grad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    filter="url(#soft-glow)"
                    opacity="0.9"
                />

                {/* Right Arm */}
                <path
                    d="M50 50 H60 Q70 50 70 40 V30"
                    stroke="url(#main-grad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    filter="url(#soft-glow)"
                    opacity="0.9"
                />

                {/* Central Core Line (Energy) */}
                <path
                    d="M50 82 V25"
                    stroke="#fff"
                    strokeWidth="1"
                    strokeLinecap="round"
                    opacity="0.6"
                    strokeDasharray="4 4"
                />

                {/* Glowing Nodes at terminals */}
                <circle cx="50" cy="25" r="4" fill="#fff" className="pulse-node" style={{ animationDelay: '0s' }} />
                <circle cx="30" cy="40" r="4" fill="#fff" className="pulse-node" style={{ animationDelay: '0.3s' }} />
                <circle cx="70" cy="30" r="4" fill="#fff" className="pulse-node" style={{ animationDelay: '0.6s' }} />

                {/* Base Shadow */}
                <ellipse cx="50" cy="90" rx="15" ry="3" fill="var(--primary)" opacity="0.2" />

            </svg>

            {showText && (
                <span className="text-gradient" style={{
                    fontSize: size * 0.7,
                    fontWeight: '800',
                    letterSpacing: '-1px',
                    fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                    Cactus
                </span>
            )}

            <style>{`
        .pulse-node {
            animation: pulseGlow 2s infinite alternate ease-in-out;
            filter: drop-shadow(0 0 8px #fff);
        }
        @keyframes pulseGlow {
            from { opacity: 0.5; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1.2); }
        }
        .logo-svg {
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .logo-svg:hover {
            transform: scale(1.15) rotate(-5deg);
        }
      `}</style>
        </div>
    );
}
