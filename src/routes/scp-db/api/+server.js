import content from '../../../data/scp/items/content_index.json';

export function GET() {

    return new Response(JSON.stringify(content), {
        headers: {
            'Content-Type': 'application/json'
        },
    });
}