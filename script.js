const gameBoard = (() =>{
    let board = ['','','','','','','','',''];
    
    const updateBoard = (index, marker) =>{
        board[index] =marker;
    }
    const getBoard = () => board;
    const checkIfEmpty = (index) =>{
        console.log('index recieved: ', index)
        return board[index] ==='';
    }
    return{
        updateBoard,
        getBoard,
        checkIfEmpty,
    };
})()


const displayController = () =>{
    const updateBoard = (index) =>{
        if(gameBoard.checkIfEmpty(index)){
            const block = document.getElementById(index);
            block.textContent = 'X';
        }
    }
    return{
        updateBoard,
    }
}


const gameFlow = (() =>{
    const blocks = document.querySelectorAll('.block');
    const dc = displayController();
    blocks.forEach(block => {
        block.addEventListener('click', ()=>{
            dc.updateBoard(block.id);
            console.log(gameBoard.getBoard());
            gameBoard.updateBoard(block.id, 'X');
            console.log(gameBoard.getBoard());
        })
    });
})();



