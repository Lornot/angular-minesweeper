import { Component, OnInit, ViewChild, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { Tile } from './models/tile';
import { TileComponent } from './tile/tile.component';
import { Level } from './models/level';
import { Record } from './models/record';
import { TimerComponent } from './timer/timer.component';
import { MatDialog } from '@angular/material';
import { GameWinDialogComponent } from './game-win-dialog/game-win-dialog.component';
import { GameOverDialogComponent } from './game-over-dialog/game-over-dialog.component';
import { RecordsService } from './records/records.service';
import { AppService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    providers: [ AppService ]
})
export class AppComponent implements OnInit {
    @ViewChildren(TileComponent) tileComponents;
    @ViewChild(TimerComponent) timer: TimerComponent;
    tiles: Tile[];
    tilesIdsRows: any;
    rowsAmount: number;
    levels: Level[] = [
        {
            name: 'easy',
            amountOfTiles: 64,
            tilesInRow: 8,
            amountOfMines: 2
        },
        {
            name: 'medium',
            amountOfTiles: 256,
            tilesInRow: 16,
            amountOfMines: 50
        },
        {
            name: 'hard',
            amountOfTiles: 1024,
            tilesInRow: 32,
            amountOfMines: 300
        }
    ];
    chosenLevel: Level = this.levels[0];
    gameStarted = false;
    gameCreated = false;
    gameFinished = false;
    revealedTilesAmount = 0;
    records: Record[] = [];

    constructor(
        public dialog: MatDialog,
        private recordsService: RecordsService,
        private changeDetectionRef: ChangeDetectorRef,
        private appService: AppService
    ) {}
    ngOnInit() {}
    updateTilesWithAmountOfMinesAround() {
        this.tilesIdsRows = this.appService.chunkArray(
            this.tiles.map((tile, index) => index),
            this.rowsAmount
        );
        this.tiles.forEach((tile, index) => {
            const surroundedTilesIds = this.getSurroundedTilesIds(index);
            tile.surroundedTiles = this.appService.getSurroundedTilesByIds(this.tiles, surroundedTilesIds);
            tile.amountOfMinesAround = tile.surroundedTiles.reduce(
                (amountOfMines, surroundedTile) => amountOfMines + +surroundedTile.isMine, 0
            );
        });
    }

    getSurroundedTilesIds(tileIndex: number) {
        const surroundedTilesIds = [];
        let rowNumber = 1;
        this.tilesIdsRows.some((row, rowIndex) => {
            if (row.indexOf(tileIndex) !== -1) {
                rowNumber = rowIndex + 1;
                return true;
            }
        });
        const columnNumber = (tileIndex % this.chosenLevel.tilesInRow) + 1;
        const prevRow = rowNumber === 1 ? null : rowNumber - 1;
        const nextRow = rowNumber === this.rowsAmount ? null : rowNumber + 1;
        const prevColumn = columnNumber === 1 ? null : columnNumber - 1;
        const nextColumn = columnNumber === this.chosenLevel.tilesInRow ? null : columnNumber + 1;
        if (prevRow) {
            if (prevColumn) {
                surroundedTilesIds.push(this.tilesIdsRows[prevRow - 1][prevColumn - 1]);
            }
            surroundedTilesIds.push(this.tilesIdsRows[prevRow - 1][columnNumber - 1]);
            if (nextColumn) {
                surroundedTilesIds.push(this.tilesIdsRows[prevRow - 1][nextColumn - 1]);
            }
        }
        if (prevColumn) {
            surroundedTilesIds.push(this.tilesIdsRows[rowNumber - 1][prevColumn - 1]);
        }
        if (nextColumn) {
            surroundedTilesIds.push(this.tilesIdsRows[rowNumber - 1][nextColumn - 1]);
        }
        if (nextRow) {
            if (prevColumn) {
                surroundedTilesIds.push(this.tilesIdsRows[nextRow - 1][prevColumn - 1]);
            }
            surroundedTilesIds.push(this.tilesIdsRows[nextRow - 1][columnNumber - 1]);
            if (nextColumn) {
                surroundedTilesIds.push(this.tilesIdsRows[nextRow - 1][nextColumn - 1]);
            }
        }
        return surroundedTilesIds;
        /**
         *  0  1  2  3
         *  4  5  6  7
         *  8  9  10 11
         *  12 13 14 15
         */

    }

    tileClick(tile) {
        if (!this.gameFinished) {
            this.tileReveal(tile.index);
            if (!this.gameStarted) {
                this.gameStarted = true;
            }
            if (this.tiles.length === (this.revealedTilesAmount + this.chosenLevel.amountOfMines) && !tile.isMine) {
                this.gameFinished = true;
                this.congratsTheWinner();
            }
        }
    }

    private tileReveal(tileIndex) {
        const tileComponent = this.tileComponents._results[tileIndex];
        tileComponent.reveal();
        if (tileComponent.tile.amountOfMinesAround === 0) {
            tileComponent.tile.surroundedTiles.forEach(surroundedTile => {
                if (!surroundedTile.isRevealed) {
                    this.tileReveal(surroundedTile.index);
                }
            });
        }
    }

    increaseRevealedTiles() {
        this.revealedTilesAmount++;
    }

    congratsTheWinner() {
        this.timer.stop();
        const dialogRef = this.dialog.open(GameWinDialogComponent, {
           data: {
                time: {
                    minutes: this.timer.getMinutes(),
                    seconds: this.timer.getSeconds()
                },
                levelName: this.chosenLevel.name
            }
        });
        dialogRef.afterClosed().subscribe(() => {
            const record = this.recordsService.createRecord(
                this.chosenLevel,
                {
                    minutes: this.timer.getMinutes(),
                    seconds: this.timer.getSeconds()
                }
            );
            const records = this.records.concat([record]);
            this.records = records;
        });
    }

    gameOver() {
        this.gameStarted = false;
        this.gameFinished = true;
        this.timer.stop();
        this.dialog.open(GameOverDialogComponent);
        this.tileComponents.forEach(tileComponent => {
            if (!tileComponent.tile.isRevealed) {
                tileComponent.tile.isRevealed = true;
                tileComponent.changeDetectionRef.markForCheck();
            }
        });
    }

    onRightClick(e, tile) {
        e.preventDefault();
        tile.showFlag = !tile.showFlag;
    }

    createNewGame() {
        this.revealedTilesAmount = 0;
        this.tiles = this.appService.getRandomTiles(this.chosenLevel.amountOfTiles, this.chosenLevel.amountOfMines);
        this.rowsAmount = this.tiles.length / this.chosenLevel.tilesInRow;
        this.updateTilesWithAmountOfMinesAround();
        this.gameCreated = true;
        this.gameFinished = false;
    }

    openGameMenu() {
        this.gameStarted = this.gameCreated = false;
    }
}
