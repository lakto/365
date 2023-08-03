import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    @Output() load: EventEmitter<string> = new EventEmitter();
    @Output() lastDay: EventEmitter<Date> = new EventEmitter();

    error = false;

    first!: Date;
    last: Date = new Date();

    all!: number;

    list: Date[] = [];

    currentIndex = 0;

    constructor() { }

    ngOnInit(): void {
        this.first = new Date(
            environment.start.year,
            environment.start.month - 1,
            environment.start.day
        );

        if (environment.end) {
            this.last = new Date(
                environment.end.year,
                environment.end.month - 1,
                environment.end.day
            );
        }

        this.lastDay.emit(this.last);

        this.all = this.daysBetween(this.first, this.last);

        this.error = (this.all < 0);
        this.loadList();

    }

    daysBetween(first: Date, second: Date) {

        // copy date parts of the timestamps, discarding the time parts.
        const one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
        const two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

        // do the math.
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const millisBetween = two.getTime() - one.getTime();
        const days = millisBetween / millisecondsPerDay;

        // round down.
        return Math.floor(days);
    }



    loadList() {
        if (this.error) {
            return;
        }
        const counter = 10;
        let i = 0;
        while (i < counter && this.currentIndex <= this.all) {
            // add last day to days array
            this.list[this.currentIndex] = new Date(this.last);

            // set previous day as last day
            this.last.setDate(this.last.getDate() - 1);
            // this.lastDay = current;
            this.currentIndex++;
            i++;
        }
    }

    open(file: string) {
        this.load.emit(file);
    }

}
