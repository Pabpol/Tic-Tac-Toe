const GameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    const grid = document.querySelectorAll('.gridItem');
    const fillGameBoard = () => {
        grid.forEach((square, index) => {

            square.innerHTML = GameBoard.board[index] === 'X' ?`<p class="p-X">${GameBoard.board[index]}</p>`:`<p class="p-O">${GameBoard.board[index]}</p>`;
        })

    };
    return { board, grid, fillGameBoard };
})();

const Player = (weapon, turn, name) => {

    return { weapon, turn, name };
};

const DisplayController = (() => {


    const displayTurns = (player1, player2) => {
        if (player1.turn) {

            player1.turn = false;
            document.querySelector('.title > span').textContent = player2.name;
            return player1.weapon;
        } else {

            player1.turn = true;
            document.querySelector('.title > span').textContent = player1.name;

            return player2.weapon;
        }
    };
    const showWinner = (player) => {
        document.querySelector('.modal-overlay').style.display = 'flex';
        document.querySelector('.modal-overlay > .modal-content > .modal-header >h2').textContent = `${player.name} Won!`;
        document.querySelector('.title').style.display = 'none';
        document.querySelector('.finish').style.display = 'flex';

    };

    const cleanBoard = () => {
        GameBoard.board = ['', '', '', '', '', '', '', '', ''];
        GameBoard.fillGameBoard();

    };


    const findWinner = (player1, player2) => {

        if (GameBoard.board[0] + GameBoard.board[1] + GameBoard.board[2] === 'XXX' ||
            GameBoard.board[3] + GameBoard.board[4] + GameBoard.board[5] === 'XXX' ||
            GameBoard.board[6] + GameBoard.board[7] + GameBoard.board[8] === 'XXX' ||
            GameBoard.board[0] + GameBoard.board[3] + GameBoard.board[6] === 'XXX' ||
            GameBoard.board[1] + GameBoard.board[4] + GameBoard.board[7] === 'XXX' ||
            GameBoard.board[2] + GameBoard.board[5] + GameBoard.board[8] === 'XXX' ||
            GameBoard.board[0] + GameBoard.board[4] + GameBoard.board[8] === 'XXX' ||
            GameBoard.board[2] + GameBoard.board[4] + GameBoard.board[6] === 'XXX') {

                player1.turn = player1.weapon === 'X' ? true : false;
                player2.turn = player2.weapon === 'X' ? true : false;
                showWinner(player1.weapon === 'X' ? player1 : player2);

        } else if (GameBoard.board[0] + GameBoard.board[1] + GameBoard.board[2] === 'OOO' ||
            GameBoard.board[3] + GameBoard.board[4] + GameBoard.board[5] === 'OOO' ||
            GameBoard.board[6] + GameBoard.board[7] + GameBoard.board[8] === 'OOO' ||
            GameBoard.board[0] + GameBoard.board[3] + GameBoard.board[6] === 'OOO' ||
            GameBoard.board[1] + GameBoard.board[4] + GameBoard.board[7] === 'OOO' ||
            GameBoard.board[2] + GameBoard.board[5] + GameBoard.board[8] === 'OOO' ||
            GameBoard.board[0] + GameBoard.board[4] + GameBoard.board[8] === 'OOO' ||
            GameBoard.board[2] + GameBoard.board[4] + GameBoard.board[6] === 'OOO') {

                player1.turn = player1.weapon === 'X' ? true : false;
                player2.turn = player2.weapon === 'X' ? true : false;
                showWinner(player1.weapon === 'O' ? player1 : player2);

        }

    };
    const closeModal = (modal, player) => {
        document.querySelector(modal).style.display = 'none';
        cleanBoard();
        document.querySelector('.finish').style.display = 'none';
        document.querySelector('.title').style.display = 'flex';
        document.querySelector('.playerName').textContent = player.name;



    };
    const isDraw = (player1, player2) => {

        count = 0;
        GameBoard.board.forEach((e) => {
            if (e != '') {
                count++
            }
        });
        if (count === GameBoard.board.length) {
            document.querySelector('.modal-overlay').style.display = 'flex';
            document.querySelector('.modal-overlay > .modal-content > .modal-header >h2').textContent = `It's a draw`;
            document.querySelector('.title').style.display = 'none';
            document.querySelector('.finish').style.display = 'flex';
            player1.turn = player1.weapon === 'X' ? true : false;
            player2.turn = player2.weapon === 'X' ? true : false;

        }
    };

    return { displayTurns, findWinner, closeModal, isDraw };
})();


document.querySelector('#modeSelect').style.display = 'grid';

document.querySelector('.player-vs-player > a').addEventListener('click', () => {
    document.querySelector('.chooseMode').style.display = 'none';
    document.querySelector('.two-players').style.display = 'grid';


});

document.querySelector('.player-vs-IA > a').addEventListener('click', () => {
    document.querySelector('.chooseMode').style.display = 'none';
    document.querySelector('.one-player').style.display = 'grid';

});


document.getElementById('play').addEventListener('click', (e) => {
    e.preventDefault();
    console.log('aqui')
    if ((document.getElementById('weaponXPlayer1').checked && document.getElementById('weaponXPlayer2').checked) || (document.getElementById('weaponOPlayer1').checked && document.getElementById('weaponOPlayer2').checked) ) {
        alert("Can't be the same weapon")
        console.log('aqui2')

    }else{
        console.log(document.getElementById('namePlayer1').value)

        const namePlayer1 = document.getElementById('namePlayer1').value;
        const weaponPlayer1 = document.getElementById('weaponXPlayer1').checked ? document.getElementById('weaponXPlayer1').value : document.getElementById('weaponOPlayer1').value;
        const namePlayer2 = document.getElementById('namePlayer2').value === '' || null ? 'IA' : document.getElementById('namePlayer2').value;
        const weaponPlayer2 = document.getElementById('weaponXPlayer2').checked ? document.getElementById('weaponXPlayer2').value : document.getElementById('weaponOPlayer2').value;
    
        const playerOne = Player(weaponPlayer1, weaponPlayer1 === 'X' ? true : false, namePlayer1);
        const playerTwo = Player(weaponPlayer2, weaponPlayer2 === 'X' ? true : false, namePlayer2);
        DisplayController.closeModal('#modeSelect', weaponPlayer1 === 'X' ? playerOne.name : playerTwo.name);
    
        document.querySelector('.playerName').textContent = weaponPlayer1 === 'X' ? playerOne.name : playerTwo.name;
    
        const clickElement = GameBoard.grid.forEach((square, index) => {
            square.addEventListener('click', () => {
                if (square.textContent === '') {
                    GameBoard.board[index] = DisplayController.displayTurns(playerOne, playerTwo);
                    GameBoard.fillGameBoard();

                }
                DisplayController.findWinner(playerOne, playerTwo);
                DisplayController.isDraw(playerOne, playerTwo);
                document.querySelector('.closeBtn').addEventListener('click', () => DisplayController.closeModal('#simpleModal',weaponPlayer1 === 'X' ? playerOne : playerTwo));
                document.querySelector('.play-again > a').addEventListener('click', () => DisplayController.closeModal('#simpleModal',weaponPlayer1 === 'X' ? playerOne : playerTwo));
    
    
            });
        });
    }
});