import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavtabsAdminComponent } from './navtabs-admin.component';

describe('NavtabsAdminComponent', () => {
  let component: NavtabsAdminComponent;
  let fixture: ComponentFixture<NavtabsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavtabsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavtabsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
