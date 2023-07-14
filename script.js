const gameBoard = (() =>{
    let board = ['','','','','','','','',''];
    
    const updateBoard = (index, marker) =>{
        if(checkIfEmpty(index))
        {board[index] = marker;}
    }
    const getBoard = () => board;
    const checkIfEmpty = (index) =>{
        return board[index] ==='';
    }
    return{
        updateBoard,
        getBoard,
        checkIfEmpty,
    };
})()


const displayController = () =>{
    const updateDOM = (index, marker) =>{
        if(gameBoard.checkIfEmpty(index)){
            const block = document.getElementById(index);
            block.textContent = marker;
            return 1;
        }
        else {return 0}
    }
    return{
        updateDOM,
    }
}


const gameFlow = (() =>{
    const blocks = document.querySelectorAll('.block');
    const dc = displayController();
    let marker = 'X'
    blocks.forEach(block => {
        block.addEventListener('click', ()=>{
            if(dc.updateDOM(block.id, marker)){
                if(marker=='X'){marker ='O'}
                else{marker='X'}
            };
            gameBoard.updateBoard(block.id, marker)

        })
    });
})();



