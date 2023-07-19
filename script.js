const gameBoard = (() =>{
    let board = ['','','','','','','','',''];
    let wincases = [
        [0,1,2],    //straight
        [3,4,5],    //straight  
        [6,7,8],    //straight
        [0,3,6],    //straight  
        [1,4,7],    //straight  
        [2,5,8],    //straight  
        [0,4,8],    //across
        [2,4,6]     //across
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
    const checkSpaces = () =>{
        if(board.includes(''))
        {
            return 1;
        }
        else {
            return 0;
        }
    }

    const resetGame = () =>{
        board = ['','','','','','','','',''];
    }

    return{
        updateBoard,
        getBoard,
        checkIfEmpty,
        checkWin,
        checkSpaces,
        resetGame,
    };
})()


const displayController = () =>{
    const emptyTable =() =>{
        const modal = document.querySelector('.modal');
        modal.style = 'display:none';
        const blocks = document.querySelectorAll('.block');
        blocks.forEach(block => {
            block.textContent = '';
        });
    }
    const updateDOM = (index, marker) =>{
        if(gameBoard.checkIfEmpty(index)){
            const block = document.getElementById(index);
            block.textContent = marker;
            return 1;
        }
        else {return 0}
    }

    const AnnounceWinner = (winner) =>{
        const modal = document.querySelector('.modal');
        const win_title = document.querySelector('.winning-marker');
        win_title.textContent = `The winner for this round is: ${winner}`;
        modal.style = 'display:flex';
    }

    const gameOver = () =>{
        const modal = document.querySelector('.modal');
        const win_title = document.querySelector('.winning-marker');
        win_title.textContent = `It's a Tie`;
        modal.style = 'display:flex';
    }


    return{
        updateDOM,
        AnnounceWinner,
        gameOver,
        emptyTable,
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
            if(!gameBoard.checkSpaces()){
                dc.gameOver();
                const play_again = document.querySelector('.play-again');
                play_again.addEventListener('click', () =>{
                    gameBoard.resetGame();
                    dc.emptyTable();
                })
            }
        })
    });
})();



