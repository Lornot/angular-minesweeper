import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Tile } from '../models/tile';

@Component({
    selector: 'app-tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent implements OnInit {
    @Input() tile: Tile;
    @Output('mineExploded') mineExploded: EventEmitter<boolean> = new EventEmitter();
    @Output('tileReveal') tileReveal: EventEmitter<boolean> = new EventEmitter();
    constructor(public changeDetectionRef: ChangeDetectorRef) {}

    ngOnInit() {}
    reveal(tile = this.tile) {
        if (!tile.isRevealed) {
            tile.isRevealed = true;
            this.tileReveal.emit(null);
        }
        if (tile.isMine) {
            this.mineExploded.emit(true);
        }
    }
}
