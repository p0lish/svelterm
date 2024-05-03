const getBoards = async () => {
    const response = await fetch(`/api/4chan/boards`);
    const result = await response.json();
    console.log('result', result)
}


const chanCommands = {
    boards: getBoards
}

export default chanCommands;