import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallsFormComponent } from './halls-form.component';

describe('HallsFormComponent', () => {
  let component: HallsFormComponent;
  let fixture: ComponentFixture<HallsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
