import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImLostComponent } from './im-lost.component';

describe('ImLostComponent', () => {
  let component: ImLostComponent;
  let fixture: ComponentFixture<ImLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
