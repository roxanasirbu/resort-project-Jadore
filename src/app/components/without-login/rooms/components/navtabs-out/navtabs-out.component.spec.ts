import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavtabsOutComponent } from './navtabs-out.component';

describe('NavtabsOutComponent', () => {
  let component: NavtabsOutComponent;
  let fixture: ComponentFixture<NavtabsOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavtabsOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavtabsOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
