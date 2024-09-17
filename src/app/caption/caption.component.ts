import { Component, Input } from '@angular/core';
import { Exif } from '../picture/picture.component';

@Component({
    selector: 'app-caption',
    templateUrl: './caption.component.html',
    styleUrls: ['./caption.component.scss']
})
export class CaptionComponent {

    @Input() exif!: Exif;

}
