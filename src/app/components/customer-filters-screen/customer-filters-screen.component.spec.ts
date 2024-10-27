import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFiltersScreenComponent } from './customer-filters-screen.component';

describe('CustomerFiltersScreenComponent', () => {
  let component: CustomerFiltersScreenComponent;
  let fixture: ComponentFixture<CustomerFiltersScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFiltersScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFiltersScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
