import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallListAdminComponent } from './hall-list-admin.component';

describe('HallListAdminComponent', () => {
  let component: HallListAdminComponent;
  let fixture: ComponentFixture<HallListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallListAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
