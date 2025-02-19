import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantProductDetailComponent } from './variant-product-detail.component';

describe('VariantProductDetailComponent', () => {
  let component: VariantProductDetailComponent;
  let fixture: ComponentFixture<VariantProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariantProductDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VariantProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
