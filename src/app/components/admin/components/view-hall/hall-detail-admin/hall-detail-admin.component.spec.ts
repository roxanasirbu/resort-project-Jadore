import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallDetailAdminComponent } from './hall-detail-admin.component';

describe('HallDetailAdminComponent', () => {
  let component: HallDetailAdminComponent;
  let fixture: ComponentFixture<HallDetailAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallDetailAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
