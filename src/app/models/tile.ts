export class Tile {
    index: number;
    isRevealed = false;
    isMine = false;
    showFlag?: boolean;
    amountOfMinesAround?: number;
    surroundedTiles?: Tile[];
    constructor(index) {
        this.index = index;
    }
}
