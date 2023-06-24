import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsContentOutComponent } from './rooms-content-out.component';

describe('RoomsContentOutComponent', () => {
  let component: RoomsContentOutComponent;
  let fixture: ComponentFixture<RoomsContentOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsContentOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsContentOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
