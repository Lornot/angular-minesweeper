import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Time} from '../models/time';

@Component({
    selector: 'app-game-win-dialog',
    templateUrl: './game-win-dialog.component.html',
    styleUrls: ['./game-win-dialog.component.css']
})
export class GameWinDialogComponent implements OnInit {
    time: Time;
    levelName: string;
    constructor(@Inject(MAT_DIALOG_DATA) public data) {
        this.time = data.time;
        this.levelName = data.levelName;
    }

    ngOnInit() {}

}
