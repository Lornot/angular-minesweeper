import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { RecordsService} from './records.service';

@Component({
    selector: 'app-records',
    templateUrl: './records.component.html',
    styleUrls: ['./records.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordsComponent implements OnInit {
    levels: any;
    @Input('records')
    set records(records) {
        if (records.length > 1) {
            records = this.recordsService.sortRecords(records);
        }
        this.levels = records.map(record => record.level.name).filter((v, i, a) => a.indexOf(v) === i).map(level => {
            return { name: level, records: [] };
        });
        this.levels.forEach(level => level.records = records.filter(record => record.level.name === level.name));
    }
    constructor(private recordsService: RecordsService) {}

    ngOnInit() {}
}
