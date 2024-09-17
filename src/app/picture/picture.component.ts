import { Component, ElementRef, HostListener, Input, OnChanges, ViewChild } from '@angular/core';
import ExifReader from 'exifreader';

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
})
export class PictureComponent implements OnChanges {

    @Input() source!: string;

    @ViewChild('imageContainer', { static: true }) imageContainer!: ElementRef<HTMLDivElement>;

    currentImage!: string;

    picture!: Picture;

    loading = true;

    zoom = true;

    @HostListener('click', ['$event'])
    onClick() {
        this.zoom = !this.zoom;
    }

    ngOnChanges(): void {

        this.loading = true;

        setTimeout(() => {
            this.currentImage = this.source;
            this.loading = false;
            // this.zoom = true;
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

            // });
            // this.loading = false;
        }, 250);

    }

    async readExifData(file: any) {
        await ExifReader.load(file);
    }

}
