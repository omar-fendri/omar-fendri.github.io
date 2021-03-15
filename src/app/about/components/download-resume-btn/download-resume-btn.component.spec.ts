import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadResumeBtnComponent } from './download-resume-btn.component';

describe('DownloadResumeBtnComponent', () => {
  let component: DownloadResumeBtnComponent;
  let fixture: ComponentFixture<DownloadResumeBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadResumeBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadResumeBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
