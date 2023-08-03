import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DefaultImage } from '../../assets/images/default.image';

@Component({
    selector: 'app-preview',
    template: `<img [src]="image" [alt]="alt"
        (load)="loadPreview($event)"
        (error)="errorPreview($event)"
        (click)="openImage()"
        [class.full]="full"
        [class.zoom]="zoom" />`,
    styleUrls: ['./preview.component.scss'],

})
export class PreviewComponent implements OnInit {

    @Input() day!: string | null;
    @Input() alt!: string | null;
    @Input() full?: boolean;
    @Input() zoom?: boolean;

    @Output() file: EventEmitter<string> = new EventEmitter();

    error = false;

    image!: string;

    constructor(private _host: ElementRef) { }

    ngOnInit(): void {
        if (this.day) {
            this.image = environment.imagePath + this.day + '.jpg';
        }
    }

    loadPreview(ev: Event) {

    }

    errorPreview(ev: Event) {
        this.image = DefaultImage.notFound;
        this._host.nativeElement.classList.add('error');
        this.error = true;
    }

    openImage() {
        if (!this.error) {
            this.file.emit(this.image);
        }
    }

}
