import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionsecondComponent } from './decisionsecond.component';

describe('DecisionsecondComponent', () => {
  let component: DecisionsecondComponent;
  let fixture: ComponentFixture<DecisionsecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecisionsecondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionsecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
