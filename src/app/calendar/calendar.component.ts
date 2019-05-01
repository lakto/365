import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {

    loading: boolean = false;

    @Input() selectedDate: Date;

    @Input() lastDay: Date;
    @Input() firstDay: Date;

    days: Date[] = [];

    currentImage: string;

    isMobile: boolean = false;

    constructor (private _breakpointObserver: BreakpointObserver) {
        _breakpointObserver.observe([
            Breakpoints.Handset
        ]).subscribe(result => {
            this.isMobile = result.matches;
        });
    }

    ngOnInit() {
        this.days = this.getDaysInMonth(this.selectedDate);
    }

    ngOnChanges() {
        this.days = this.getDaysInMonth(this.selectedDate);
    }


    getDaysInMonth(date: Date): Date[] {
        this.loading = true;
        const month: Date = new Date(date);

        // last day of month
        let lastDayofMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

        if (lastDayofMonth > this.lastDay) {
            lastDayofMonth = new Date(this.lastDay);
        }

        const days = [];
        while (lastDayofMonth.getMonth() === month.getMonth()) {
            days.push(new Date(lastDayofMonth));
            lastDayofMonth.setDate(lastDayofMonth.getDate() - 1);
        }
        this.loading = false;
        return days;

    }

    openImage(image: Date) {
        const month: string = ('0' + (image.getMonth() + 1)).slice(-2);
        const day: string = ('0' + image.getDate()).slice(-2);
        this.currentImage = image.getFullYear() + '-' + month + '-' + day;
        // console.log(this.currentImage);
    }

    closeImage() {
        this.currentImage = undefined;
    }

    nextImage() {

    }

    prevImage() {

    }

}
