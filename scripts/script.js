'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('#field td');
    const firstPlayerInput = document.querySelector('#firstPlayer');
    const secondPlayerInput = document.querySelector('#secondPlayer');
    const startGameButton = document.querySelector('#startGame');

    let nameFirstPlayer = '';
    let nameSecondPlayer = '';

    const isVictory = function(cells) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                return true;
            }
        }
        return false;
    };

    const start = function(cells) {
        let i = 0;

        cells.forEach(function(cell) {
            cell.addEventListener('click', function step() {
                if (this.textContent === '') {
                    this.textContent = (i % 2 === 0) ? 'X' : 'O';
                    this.removeEventListener('click', step);

                    if (isVictory(cells)) {
                        const winner = (this.textContent === 'X') ? nameFirstPlayer : nameSecondPlayer;
                        setTimeout(() => {
                            alert(winner + ' wins!');
                            resetGame();
                        }, 100);
                    }

                    i++;
                }
            });
        });
    };

    const resetGame = function() {
        cells.forEach(function(cell) {
            cell.textContent = '';
        });

        start(cells);
    };

    startGameButton.addEventListener('click', function() {
        nameFirstPlayer = firstPlayerInput.value || 'First Player';
        nameSecondPlayer = secondPlayerInput.value || 'Second Player';
        resetGame();
    });
});