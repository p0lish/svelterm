import { getBoards } from "../../../../utils/4chanCalls";

export async function GET() {
    const result = await getBoards();
    return new Response(JSON.stringify(result), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
