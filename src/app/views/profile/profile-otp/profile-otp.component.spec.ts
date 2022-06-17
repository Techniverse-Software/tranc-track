import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOtpComponent } from './profile-otp.component';

describe('ProfileOtpComponent', () => {
  let component: ProfileOtpComponent;
  let fixture: ComponentFixture<ProfileOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileOtpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});