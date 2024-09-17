import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PictureComponent } from './picture.component';
import { CaptionComponent } from 'src/app/caption/caption.component';

describe('PictureComponent', () => {
    let component: PictureComponent;
    let fixture: ComponentFixture<PictureComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                PictureComponent,
                CaptionComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PictureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
