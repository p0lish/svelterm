export const getData = async (path) => {
    const response = await fetch(path);
    return response.json();
}