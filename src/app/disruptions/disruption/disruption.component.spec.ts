import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisruptionComponent } from './disruption.component';

describe('DisruptionComponent', () => {
  let component: DisruptionComponent;
  let fixture: ComponentFixture<DisruptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisruptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisruptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
