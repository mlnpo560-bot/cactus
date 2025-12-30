import { evaluate } from 'mathjs';

export interface LogicResult {
    type: 'text' | 'image' | 'code' | 'math' | 'loading';
    content: string; // The main answer text or image URL or code snippet
    steps?: string[]; // Deep thinking steps
    visuals?: any; // Extra data like code language or image prompt
    results?: any[]; // Search results from Wiki
    externalLinks?: string[]; // Links found
}

const generateMockCode = (lang: string, q: string): string => {
    if (lang === 'python') return "def main():\n    print('Hello form Cactus AI')\n\nif __name__ == '__main__':\n    main()";
    if (lang === 'html') return "<!DOCTYPE html>\n<html>\n<body>\n    <h1>Generated Page</h1>\n</body>\n</html>";
    if (lang === 'java') return "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello\");\n    }\n}";
    return "// Code for " + lang + " (query: " + q + ") goes here";
};

export class LogicEngine {

    static async processQuery(query: string, deepThink: boolean): Promise<LogicResult> {
        const lowerQ = query.toLowerCase();

        // 1. Math Check
        try {
            if (/[\d\+\-\*\/\^\(\)]/.test(query) && !/[a-zA-Z]{3,}/.test(query)) {
                const result = evaluate(query);
                const steps = deepThink ?
                    ["Parsing mathematical structure...", "Applying arithmetic rules...", "Verifying calculation..."] : [];

                return {
                    type: 'math',
                    content: `Calculated Result: ${result}`,
                    steps,
                    visuals: { result }
                };
            }
        } catch (e) { /* Not math */ }

        // 2. Image Gen Check
        const imgMatch = lowerQ.match(/(generate|create|make) an? image (of|for)?\s*(.+)/i);
        if (imgMatch && imgMatch[3]) {
            const prompt = imgMatch[3];
            const steps = deepThink ? ["Analyzing visual requirements...", "Compose scene descriptors...", "Rendering pixels..."] : [];
            /* Wait a bit to simulate work if deepthink is on */
            if (deepThink) await new Promise(r => setTimeout(r, 1500));

            return {
                type: 'image',
                content: `Generating image for: "${prompt}"`,
                steps,
                visuals: {
                    url: `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true`,
                    prompt
                }
            };
        }

        // 3. Code Gen Check
        const codeMatch = lowerQ.match(/(write|generate|show) (python|java|c\+\+|cpp|html|javascript|js|typescript|ts) code/i);
        if (codeMatch) {
            const lang = codeMatch[2];
            const steps = deepThink ? [`Analyzing ${lang} syntax...`, "Structuring logic blocks...", "Optimizing performance..."] : [];
            if (deepThink) await new Promise(r => setTimeout(r, 1500));

            return {
                type: 'code',
                content: `Here is the ${lang} code you requested:`,
                steps,
                visuals: {
                    lang,
                    code: generateMockCode(lang, query)
                }
            };
        }

        // 4. Conversational Logic
        if (lowerQ.includes('who are you') || lowerQ.includes('what are you') || (lowerQ.includes('cactus') && lowerQ.includes('hello'))) {
            return {
                type: 'text',
                content: "I am Cactus, a next-generation AI search engine designed to provide logic-driven answers, creative tools, and deep insights.",
                steps: []
            };
        }

        // 5. Default: Knowledge Search (Wiki)
        // Perform search
        let steps: string[] = [];
        if (deepThink) {
            steps = ["Analyzing query semantics...", "Scanning global knowledge nodes...", "Cross-referencing sources...", "Synthesizing answer..."];
            // Delays happen in UI or here? Let's assume UI handles the step display timing or we return them to be shown.
            // For a real async feel, we might want to delay here, but returning a Promise is fine.
            await new Promise(r => setTimeout(r, 2000));
        }

        try {
            // Search
            const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`);
            const searchData = await searchRes.json();

            if (searchData.query?.search?.length > 0) {
                const topResult = searchData.query.search[0];
                const results = searchData.query.search;

                // Fetch Summary
                const prop = 'extracts|extlinks';
                const summaryRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=${prop}&exintro&explaintext&ellimit=5&pageids=${topResult.pageid}&origin=*`);
                const summaryData = await summaryRes.json();
                const page = summaryData.query.pages[topResult.pageid];

                let answer = page.extract || "No summary available.";
                let externalLinks = [];

                if (page.extlinks) {
                    // @ts-ignore
                    externalLinks = page.extlinks.map(o => o['*']).slice(0, 5);
                }

                // Refine answer for non-deep-think
                if (!deepThink) {
                    answer = answer.split('. ').slice(0, 3).join('. ') + '.';
                }

                return {
                    type: 'text',
                    content: answer,
                    steps,
                    results,
                    externalLinks
                };
            } else {
                return {
                    type: 'text',
                    content: "I couldn't find any relevant results in my database.",
                    steps
                };
            }

        } catch (error) {
            return {
                type: 'text',
                content: "I encountered a connection error while trying to think.",
                steps
            };
        }
    }
}
