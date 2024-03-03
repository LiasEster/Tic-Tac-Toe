let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    
];

function render() {
    const board = document.getElementById('board');
    board.innerHTML = '';  // Clear the board

    for (let i = 0; i < fields.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        // Add the SVG for the player's symbol if the cell is not empty
        if (fields[i] === 'circle') {
            cell.innerHTML = '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15"/></svg>';
        } else if (fields[i] === 'x') {
            cell.innerHTML = '<svg viewBox="0 0 40 40"><line x1="10" y1="10" x2="30" y2="30" /><line x1="30" y1="10" x2="10" y2="30" /></svg>';
        }

        board.appendChild(cell);
    }
}
function switchPlayer() {
    // Switch the active player
    currentPlayer = currentPlayer === 'circle' ? 'x' : 'circle';

    // Update the SVG opacities
    document.getElementById('circle').classList.remove('active');
    document.getElementById('cross').classList.remove('active');
    document.getElementById(currentPlayer).classList.add('active');
}