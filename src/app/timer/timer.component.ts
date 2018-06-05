import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
    time = 0;
    intervalId;
    constructor() {}

    ngOnInit() {
        this.start();
    }

    ngOnDestroy() {
        this.stop();
    }

    start() {
        this.intervalId = setInterval(() => this.time++, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
    }

    getMinutes(): string {
        const minutes = Math.round(this.time / 60);
        return minutes < 10 ? '0' + minutes : minutes.toLocaleString();
    }

    getSeconds(): string {
        const seconds = this.time % 60;
        return seconds < 10 ? '0' + seconds : seconds.toLocaleString();
    }
}
