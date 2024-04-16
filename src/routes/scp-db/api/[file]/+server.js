
export async function GET({ params: { file } }) {
    const fileInput = file ? file.replaceAll('..', '') : 'content_index.json';
    try {
        const content = (await import(`../../../../data/scp/items/${fileInput}`)).default;
        return new Response(JSON.stringify(content), {
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }
    catch (error) {
        return new Response(JSON.stringify({ error: "resource not found" }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

}