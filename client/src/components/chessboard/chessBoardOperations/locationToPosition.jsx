export default function locationToPosition(location, locations) {
    let rowIx = null;
    let squareIx = null;
    locations.forEach((element, index, array) => {
        element.forEach((ele, idx, arr) => {
            if (ele === location) {
                rowIx = index;
                squareIx = idx;
            }
        })
    });
    return {
        rowIx, squareIx
    }
}