import { Level } from './level';
import { Time } from './time';
export class Record {
    time: Time;
    level: Level;
    constructor(level: Level, time: Time) {
        this.level = level;
        this.time = time;
    }
}
