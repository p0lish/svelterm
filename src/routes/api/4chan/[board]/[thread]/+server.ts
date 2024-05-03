import { getThread } from '../../../../../utils/4chanCalls.js';

export async function GET({ params }) {
    const { board, thread } = params;
    const result = await getThread(board, thread);
    const { posts } = result;
    return new Response(JSON.stringify(posts), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
