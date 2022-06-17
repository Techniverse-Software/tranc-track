import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingReqListComponent } from './pending-req-list.component';

describe('PendingReqListComponent', () => {
  let component: PendingReqListComponent;
  let fixture: ComponentFixture<PendingReqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingReqListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingReqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
