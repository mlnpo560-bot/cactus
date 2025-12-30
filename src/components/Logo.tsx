
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
                {/* Modern Glow Filters */}
                <defs>
                    <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <linearGradient id="cyber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f2ff" />
                        <stop offset="100%" stopColor="#00ffa3" />
                    </linearGradient>
                </defs>

                {/* Cactus Body - Cyber Silhouette */}
                <path
                    d="M50 90 V30 M30 60 H50 M70 50 H50"
                    stroke="url(#cyber-grad)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.3"
                />

                {/* Main Silhouette Path */}
                <path
                    d="M50 85 C50 85 50 15 50 15 C50 15 50 15 50 15 M50 55 C40 55 30 55 30 45 C30 35 30 35 30 35 M50 45 C60 45 70 45 70 35 C70 25 70 25 70 25"
                    stroke="url(#cyber-grad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    filter="url(#neon-glow)"
                    style={{ opacity: 0.9 }}
                />

                {/* Refined Geometric Cactus */}
                <path
                    d="M45 85 V20 C45 15 55 15 55 20 V85"
                    stroke="url(#cyber-grad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
                <path
                    d="M45 55 H35 C30 55 30 50 30 45 V35"
                    stroke="url(#cyber-grad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
                <path
                    d="M55 45 H65 C70 45 70 40 70 35 V25"
                    stroke="url(#cyber-grad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                {/* Cyber Nodes */}
                <circle cx="50" cy="20" r="3" fill="#fff" className="cyber-node" />
                <circle cx="30" cy="35" r="3" fill="#fff" className="cyber-node" />
                <circle cx="70" cy="25" r="3" fill="#fff" className="cyber-node" />

                {/* Digital Energy Traces */}
                <line x1="50" y1="35" x2="50" y2="75" stroke="#fff" strokeWidth="0.5" opacity="0.5" strokeDasharray="2 2" />
                <line x1="30" y1="45" x2="45" y2="45" stroke="#fff" strokeWidth="0.5" opacity="0.5" strokeDasharray="2 2" />
                <line x1="70" y1="35" x2="55" y2="35" stroke="#fff" strokeWidth="0.5" opacity="0.5" strokeDasharray="2 2" />

            </svg>

            {showText && (
                <span className="text-gradient" style={{
                    fontSize: size * 0.7,
                    fontWeight: '900',
                    letterSpacing: '-1px',
                    textTransform: 'uppercase',
                    fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                    Cactus
                </span>
            )}

            <style>{`
        .cyber-node {
            animation: cyberPulse 1.5s infinite alternate ease-in-out;
            filter: drop-shadow(0 0 5px #fff);
        }
        @keyframes cyberPulse {
            from { opacity: 0.4; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1.2); }
        }
        .logo-svg {
            transition: transform 0.3s ease;
        }
        .logo-svg:hover {
            transform: scale(1.1) rotate(5deg);
        }
      `}</style>
        </div>
    );
}
