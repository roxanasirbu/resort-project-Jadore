import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailAdminComponent } from './room-detail-admin.component';

describe('RoomDetailAdminComponent', () => {
  let component: RoomDetailAdminComponent;
  let fixture: ComponentFixture<RoomDetailAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomDetailAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
