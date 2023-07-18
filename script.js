const gameBoard = (() =>{
    let board = ['','','','','','','','',''];
    let wincases = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [1,4,8],
        [2,4,6]
    ];
    const checkWin =(marker) =>{
        let winner = 'none'
        wincases.forEach(wincase => {
            if(board[wincase[0]]==marker && board[wincase[1]]==marker && board[wincase[2]]==marker){
                winner = marker;
            }    
        });
        return winner;
    }
    
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
        checkWin
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

    const AnnounceWinner = (winner) =>{
        console.log('The Announced winner is: ', winner);
        const modal = document.querySelector('.modal');
        const win_title = document.querySelector('.winning-marker');
        win_title.textContent = `The winner for this round is: ${winner}`;
        modal.style = 'display:flex';

    }
    return{
        updateDOM,
        AnnounceWinner,
    }
}


const gameFlow = (() =>{
    const blocks = document.querySelectorAll('.block');
    const dc = displayController();
    let marker = 'X'
    let winner = 'none';
    blocks.forEach(block => {
        block.addEventListener('click', ()=>{
            if(dc.updateDOM(block.id, marker)){
                gameBoard.updateBoard(block.id, marker);
                winner = gameBoard.checkWin(marker);
                if(marker=='X'){marker ='O'}
                else{marker='X'}
            };
            if(winner!='none'){
                dc.AnnounceWinner(winner);
            }
        })
    });
})();



