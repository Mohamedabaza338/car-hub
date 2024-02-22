import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetOurExpertsComponent } from './meet-our-experts.component';

describe('MeetOurExpertsComponent', () => {
  let component: MeetOurExpertsComponent;
  let fixture: ComponentFixture<MeetOurExpertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetOurExpertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetOurExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
