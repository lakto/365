import { Component, OnInit, Input, OnChanges, ElementRef } from '@angular/core';
import exifr from 'exifr';

export interface Exif {
    day: Date;
    camera: string;
    focalLength: number;
    focalLengthIn35mmFormat: number;
    aperture: number;
    shutterSpeed: string;
    iso: number;
}

export interface Picture {
    file: string;
    exif: Exif;
}

@Component({
    selector: 'app-picture',
    templateUrl: './picture.component.html',
    styleUrls: ['./picture.component.scss'],
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    // host: {
    //     '(click)': 'toggleZoom()'
    // }
})
export class PictureComponent implements OnInit, OnChanges {

    @Input() source!: string;

    picture!: Picture;

    loading = true;

    zoom = true;

    constructor(private _host: ElementRef) { }

    ngOnInit(): void {
    }

    ngOnChanges(): void {

        setTimeout(() => {
            this.zoom = true;
            // exifr.parse(this.source).then(meta => {
            //     const shutterSpeed: string = (meta.ExposureTime < 1 ? '1/' + Math.round(1 / meta.ExposureTime) : meta.ExposureTime.toString());
            //     const camera: string = (meta.Make && meta.Model ? meta.Make + ' ' + meta.Model : meta['271'] + ' ' + meta['272']);
            //     // console.log(meta);

            //     this.picture = {
            //         file: this.source,
            //         exif: {
            //             day: meta.DateTimeOriginal,
            //             camera: camera,
            //             focalLength: Math.round(meta.FocalLength * 100) / 100,
            //             focalLengthIn35mmFormat: Math.round(meta.FocalLengthIn35mmFormat * 100) / 100,
            //             aperture: Math.round(meta.FNumber * 100) / 100,
            //             shutterSpeed: shutterSpeed + 's',
            //             iso: meta.ISO
            //         }
            //     };

            // this._host.nativeElement.firstElementChild.style['background-image'] = 'url(' + this.source + ')';
            // });
            this.loading = false;
        }, 500);

    }

    toggleZoom() {
        this.zoom = !this.zoom;
    }

}
