import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingLayoutsComponent } from './pending-layouts.component';

describe('PendingLayoutsComponent', () => {
  let component: PendingLayoutsComponent;
  let fixture: ComponentFixture<PendingLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingLayoutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
