import { Injectable } from '@angular/core';
import { Tile } from './models/tile';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor() {
    }

    /**
     * Returns an array with arrays of the given size.
     *
     * @param myArray {Array} Array to split
     * @param chunkSize {Integer} Size of every group
     */
    chunkArray(myArray, chunk_size) {
        const results = [];
        while (myArray.length) {
            results.push(myArray.splice(0, chunk_size));
        }
        return results;
    }

    getRandomTiles(amountOfTiles: number, amountOfMines: number): Tile[] {
        const tiles = [];
        for (let i = 0; i < amountOfTiles; i++) {
            tiles.push(new Tile(i));
        }
        while (amountOfMines) {
            const tileIndexWithMine = Math.floor((Math.random() * amountOfTiles) + 1) - 1;
            if (!tiles[tileIndexWithMine].isMine) {
                tiles[tileIndexWithMine].isMine = true;
                amountOfMines--;
            }
        }
        return tiles;
    }

    getSurroundedTilesByIds(tiles, tilesIds) {
        const surroundedTiles = [];
        tiles.forEach((tile, index) => {
            if (tilesIds.indexOf(index) !== -1) {
                surroundedTiles.push(tile);
            }
        });
        return surroundedTiles;
    }

}
