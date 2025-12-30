import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
    language: string;
    code: string;
}

export default function CodeBlock({ language, code }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{
            background: '#1e1e2e',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid var(--border-light)',
            marginBottom: 'var(--space-md)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.05)',
                borderBottom: '1px solid var(--border-light)'
            }}>
                <span style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    fontWeight: 600
                }}>
                    {language}
                </span>
                <button
                    onClick={handleCopy}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: copied ? 'var(--secondary)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '4px'
                    }}
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
            </div>
            <div style={{ padding: '16px', overflowX: 'auto' }}>
                <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.5', color: '#a6accd' }}>
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
}
