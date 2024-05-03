import { getCatalog } from '../../../../../utils/4chanCalls.js';

export async function GET({ params }) {
    const allThreads = [];
    const { board } = params;
    const result = await getCatalog(board);
    const { catalog } = result;
    for (const page of catalog) {
        for (const thread of page.threads) {
            allThreads.push(thread);
        }
    }
    return new Response(JSON.stringify(allThreads), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
