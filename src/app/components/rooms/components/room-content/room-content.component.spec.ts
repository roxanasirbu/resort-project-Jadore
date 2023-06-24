import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomContentComponent } from './room-content.component';

describe('RoomContentComponent', () => {
  let component: RoomContentComponent;
  let fixture: ComponentFixture<RoomContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
