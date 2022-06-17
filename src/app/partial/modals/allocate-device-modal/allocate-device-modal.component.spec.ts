import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateDeviceModalComponent } from './allocate-device-modal.component';

describe('AllocateDeviceModalComponent', () => {
  let component: AllocateDeviceModalComponent;
  let fixture: ComponentFixture<AllocateDeviceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocateDeviceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateDeviceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
