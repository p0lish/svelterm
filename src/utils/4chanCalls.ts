const FCHAN_URL_BASE = 'https://a.4cdn.org/';
const FCHAN_MEDIA_URL_BASE = 'https://i.4cdn.org/';
export async function getBoards() {
    const response = await fetch(`${FCHAN_URL_BASE}boards.json`);
    return response.json();
}


export async function getCatalog(board: string) {
    const response = await fetch(`${FCHAN_URL_BASE}${board}/catalog.json`);
    return { catalog: await response.json(), board };
}

export async function getThread(board: string, thread: string) {
    const response = await fetch(`${FCHAN_URL_BASE}${board}/thread/${thread}.json`);
    const { posts } = await response.json()
    return { posts, board, id: thread };
}


export function getImageUrl(filename: string, board: string) {
    return `${FCHAN_MEDIA_URL_BASE}${board}/${filename}`;
}