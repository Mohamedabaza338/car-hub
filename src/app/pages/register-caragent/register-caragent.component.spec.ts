import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCaragentComponent } from './register-caragent.component';

describe('RegisterCaragentComponent', () => {
  let component: RegisterCaragentComponent;
  let fixture: ComponentFixture<RegisterCaragentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCaragentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCaragentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
