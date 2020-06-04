import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSuccessComponent } from './event-success.component';

describe('EventSuccessComponent', () => {
  let component: EventSuccessComponent;
  let fixture: ComponentFixture<EventSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
