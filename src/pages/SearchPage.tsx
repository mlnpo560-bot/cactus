import { Search, Sparkles, Share2, ExternalLink, Brain, ImageIcon, Code, Calculator } from 'lucide-react';
import { useState, useEffect } from 'react';
import CodeBlock from '../components/CodeBlock';
import { LogicEngine, type LogicResult } from '../lib/LogicEngine';
import DOMPurify from 'dompurify';

export default function SearchPage({ query }: { query: string }) {
    const [logicResult, setLogicResult] = useState<LogicResult | null>(null);
    const [deepThink, setDeepThink] = useState(false);
    const [thinkingStep, setThinkingStep] = useState('');

    // Derived state for smoother UI
    const aiAnswer = logicResult ? logicResult.content : '';
    const results = logicResult?.results || [];
    const externalLinks = logicResult?.externalLinks || [];

    const useTypingEffect = (text: string) => {
        const [displayed, setDisplayed] = useState('');
        useEffect(() => {
            setDisplayed('');
            if (!text) return;
            let i = 0;
            const interval = setInterval(() => {
                setDisplayed(text.slice(0, i));
                i++;
                if (i > text.length) clearInterval(interval);
            }, 5);
            return () => clearInterval(interval);
        }, [text]);
        return displayed;
    };

    const displayedAnswer = useTypingEffect(aiAnswer);

    useEffect(() => {
        if (!query) return;

        const process = async () => {
            setThinkingStep('Initializing Logic Engine...');
            setLogicResult(null);

            // Simulate step-by-step thinking if deep think is on
            if (deepThink) {
                await new Promise(r => setTimeout(r, 800));
                setThinkingStep('Analyzing query intent...');
            }

            const result = await LogicEngine.processQuery(query, deepThink);

            // If logic engine returned steps, show them roughly
            if (result.steps && result.steps.length > 0) {
                for (const step of result.steps) {
                    setThinkingStep(step);
                    await new Promise(r => setTimeout(r, 800));
                }
            }

            setThinkingStep('');
            setLogicResult(result);
        };

        process();

    }, [query, deepThink]);

    const getIcon = () => {
        if (!logicResult) return <Sparkles size={20} />;
        switch (logicResult.type) {
            case 'image': return <ImageIcon size={20} />;
            case 'code': return <Code size={20} />;
            case 'math': return <Calculator size={20} />;
            default: return <Sparkles size={20} />;
        }
    };

    const getTitle = () => {
        if (!logicResult) return 'Cactus AI thinking...';
        switch (logicResult.type) {
            case 'image': return 'Cactus Imagine';
            case 'code': return 'Cactus Code Synth';
            case 'math': return 'Cactus Math Engine';
            default: return 'Cactus Logic Core';
        }
    };

    return (
        <div className="page-content" style={{ paddingLeft: '80px', paddingTop: '20px', minHeight: '100vh', width: '100%' }}>
            <header style={{ padding: '0 var(--space-lg)', marginBottom: 'var(--space-md)', display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                <div className="search-container" style={{ maxWidth: '800px', margin: 0 }}>
                    <input
                        type="text"
                        className="search-input"
                        defaultValue={query}
                    />
                    <button className="search-btn">
                        <Search size={22} />
                    </button>
                </div>

                <div
                    className={`think-badge ${deepThink ? 'active' : ''}`}
                    onClick={() => setDeepThink(!deepThink)}
                >
                    <Brain size={16} />
                    Deep Think
                </div>
            </header>

            <div style={{ padding: '0 var(--space-lg)', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'var(--space-xl)' }}>

                {/* Left Col: AI Answer & Search Results */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>

                    {/* AI Box */}
                    <div className="glass-panel" style={{ padding: 'var(--space-md)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)', color: 'var(--primary)' }}>
                            {getIcon()}
                            <h3 style={{ fontSize: '1.1rem' }}>{getTitle()}</h3>
                        </div>

                        {thinkingStep && (
                            <div style={{ color: 'var(--secondary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div className="thinking-pulse">
                                    <div className="think-dot"></div>
                                    <div className="think-dot"></div>
                                    <div className="think-dot"></div>
                                </div>
                                {thinkingStep}
                            </div>
                        )}

                        {!thinkingStep && aiAnswer && (
                            <div style={{ lineHeight: '1.7', color: '#eee', minHeight: '60px' }}>
                                {displayedAnswer}

                                {/* Render Image */}
                                {logicResult?.type === 'image' && logicResult.visuals && (
                                    <div className="animate-fade-in" style={{ marginTop: '20px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
                                        <img src={logicResult.visuals.url} alt="Generated" style={{ width: '100%', display: 'block' }} />
                                    </div>
                                )}

                                {/* Render Code */}
                                {logicResult?.type === 'code' && logicResult.visuals && (
                                    <div className="animate-fade-in" style={{ marginTop: '20px' }}>
                                        <CodeBlock language={logicResult.visuals.lang} code={logicResult.visuals.code} />
                                    </div>
                                )}
                            </div>
                        )}

                        <div style={{ marginTop: 'var(--space-md)', display: 'flex', gap: 'var(--space-sm)' }}>
                            {externalLinks.length > 0 && logicResult?.type === 'text' && <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>Sources verified from {externalLinks.length} contexts</span>}
                        </div>
                    </div>


                    {results.length > 0 && (
                        <h3 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--text-muted)' }}>Reliable Sources & Matches</h3>
                    )}

                    {/* External Sources Horizontal Scroll */}
                    {externalLinks.length > 0 && logicResult?.type === 'text' && (
                        <div style={{ display: 'flex', overflowX: 'auto', paddingBottom: '10px' }}>
                            {externalLinks.map((link, i) => (
                                <a key={i} href={link} target="_blank" rel="noreferrer" className="source-tag">
                                    {new URL(link).hostname.replace('www.', '')}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Dynamic Results */}
                    {results.map((res: any) => (
                        <div key={res.pageid} className="card">
                            <a
                                href={`https://en.wikipedia.org/?curid=${res.pageid}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{ display: 'block' }}
                            >
                                <small style={{ color: 'var(--text-muted)' }}>en.wikipedia.org</small>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <h3 style={{ color: 'var(--accent)', marginTop: '4px' }}>{res.title}</h3>
                                    <ExternalLink size={14} color="var(--text-muted)" />
                                </div>
                                <p
                                    style={{ color: 'var(--text-dim)', marginTop: '8px' }}
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(res.snippet) + '...' }}
                                />
                            </a>
                        </div>
                    ))}

                </div>

                {/* Right Col: Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    <div className="card" style={{ borderColor: 'var(--secondary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4 style={{ color: 'var(--secondary)' }}>Live Activity</h4>
                            <Share2 size={16} color="var(--secondary)" />
                        </div>
                        <div style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <p>Logic Engine Active</p>
                            <p>{results.length} results processed.</p>
                            <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)', margin: '8px 0' }} />
                            <p>Analysis complete for "{query}"</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
