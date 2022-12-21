import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedTicketsComponent } from './confirmed-tickets.component';

describe('ConfirmedTicketsComponent', () => {
  let component: ConfirmedTicketsComponent;
  let fixture: ComponentFixture<ConfirmedTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmedTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
