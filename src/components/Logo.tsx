

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
                {/* Glow Filter */}
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Stem */}
                <path
                    d="M50 85 V 25"
                    stroke="var(--primary)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    filter="url(#glow)"
                />

                {/* Arms */}
                <path
                    d="M50 55 H 25 V 35"
                    stroke="var(--primary)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    filter="url(#glow)"
                />
                <path
                    d="M50 45 H 75 V 25"
                    stroke="var(--primary)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    filter="url(#glow)"
                />

                {/* Neural Nodes (Circles) */}
                <circle cx="50" cy="25" r="5" fill="#fff" className="node-pulse" style={{ animationDelay: '0s' }} />
                <circle cx="25" cy="35" r="5" fill="#fff" className="node-pulse" style={{ animationDelay: '0.2s' }} />
                <circle cx="75" cy="25" r="5" fill="#fff" className="node-pulse" style={{ animationDelay: '0.4s' }} />
                <circle cx="50" cy="55" r="4" fill="var(--accent)" />
                <circle cx="50" cy="85" r="4" fill="var(--accent)" />

            </svg>

            {showText && (
                <span className="text-gradient" style={{ fontSize: size * 0.6, fontWeight: 'bold', letterSpacing: '-0.5px' }}>
                    Cactus
                </span>
            )}

            <style>{`
        .node-pulse {
            animation: nodePulse 2s infinite ease-in-out;
        }
        @keyframes nodePulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
        </div>
    );
}
