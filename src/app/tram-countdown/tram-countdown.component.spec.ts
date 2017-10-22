import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramCountdownComponent } from './tram-countdown.component';

describe('TramCountdownComponent', () => {
  let component: TramCountdownComponent;
  let fixture: ComponentFixture<TramCountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramCountdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
