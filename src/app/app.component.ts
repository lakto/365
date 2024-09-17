import { Component, OnInit } from '@angular/core';
import packageInfo from '../../package.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    appVersion = `v${packageInfo.version}`;

    file!: string;

    lastDay!: Date;

    loading = true;

    ngOnInit(): void {

        this.loading = (this.file !== undefined);

    }
}
