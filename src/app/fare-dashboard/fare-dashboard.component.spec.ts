import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FareDashboardComponent } from './fare-dashboard.component';

describe('FareDashboardComponent', () => {
  let component: FareDashboardComponent;
  let fixture: ComponentFixture<FareDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FareDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FareDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
