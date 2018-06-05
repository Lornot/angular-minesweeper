import {Injectable} from '@angular/core';
import {Record} from '../models/record';
import { Time } from '../models/time';
import { Level } from '../models/level';

@Injectable({
    providedIn: 'root'
})
export class RecordsService {

    constructor() {}

    createRecord(level: Level, time: Time) {
        return new Record(level, time);
    }

    sortRecords(records) {
        records.sort((recordA, recordB) => {
            return this.getSecondsFromTime(recordA.time) > this.getSecondsFromTime(recordB.time);
        });
        return records;
    }

    getSecondsFromTime(time: Time) {
        return +time.minutes * 60 + time.seconds;
    }
}
