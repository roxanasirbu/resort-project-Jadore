import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsListOutComponent } from './rooms-list-out.component';

describe('RoomsListOutComponent', () => {
  let component: RoomsListOutComponent;
  let fixture: ComponentFixture<RoomsListOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsListOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsListOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
