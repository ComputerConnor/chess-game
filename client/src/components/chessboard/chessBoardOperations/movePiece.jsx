// function to move the specified img tag with to the new allowed coordinates (top and left) of 
// the clicked square in second click after specifying which element has to move in first click
// and after the transition duration remove the opponent piece image using the class of its square
export default function movePieceImgToNewPosition(
    clickedSquareElement,
    oldRowIx,
    oldSquareIx,
    newRowIx,
    newSquareIx,
    sq,
    updatePositions,
) {
    const sqHeight = clickedSquareElement.getBoundingClientRect().height;
    const sqWidth = clickedSquareElement.getBoundingClientRect().width;
    let xOperand, yOperand;
    if (oldSquareIx > newSquareIx) {
        xOperand = oldSquareIx - newSquareIx;
    } else if (oldSquareIx < newSquareIx) {
        xOperand = newSquareIx - oldSquareIx;
    } else if (oldSquareIx === newSquareIx) {
        xOperand = 0;
    }
    if (oldRowIx > newRowIx) {
        yOperand = oldRowIx - newRowIx;
    } else if (oldRowIx < newRowIx) {
        yOperand = newRowIx - oldRowIx;
    } else if (oldRowIx === newRowIx) {
        yOperand = 0;
    }
    img.style.left = xOperand * sqWidth + 'px';
    img.style.top = yOperand * sqHeight + 'px';
    setTimeout(() => {
        updatePositions(oldRowIx, oldSquareIx, newRowIx, newSquareIx, sq,);
    }, 1100);
}