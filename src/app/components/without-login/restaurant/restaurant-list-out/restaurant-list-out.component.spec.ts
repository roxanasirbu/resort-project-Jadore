import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantListOutComponent } from './restaurant-list-out.component';

describe('RestaurantListOutComponent', () => {
  let component: RestaurantListOutComponent;
  let fixture: ComponentFixture<RestaurantListOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantListOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantListOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
