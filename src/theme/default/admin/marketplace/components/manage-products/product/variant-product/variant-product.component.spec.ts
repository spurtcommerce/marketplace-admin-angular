import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantProductComponent } from './variant-product.component';

describe('VariantProductComponent', () => {
  let component: VariantProductComponent;
  let fixture: ComponentFixture<VariantProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariantProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VariantProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
