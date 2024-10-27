import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {
  CustomerEventsDataStructure,
  EventTypes,
} from '../../interfaces/customerEvents';
import { ButtonComponent } from '../button/button.component';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FormArray, FormControl, FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Property {
  property: string;
  type: string;
}

interface SelectedEvent {
  type: string;
  properties: Property[];
}

@Component({
  selector: 'app-customer-filters-screen',
  standalone: true,
  imports: [
    ButtonComponent,
    DividerModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './customer-filters-screen.component.html',
  styleUrl: './customer-filters-screen.component.scss',
})
export class CustomerFiltersScreenComponent implements OnInit {
  public customerEventsForm: FormGroup | undefined;
  public customerEvents: CustomerEventsDataStructure | undefined;
  public selectedCustomerEvent: EventTypes | null = null;
  public selectedEvent: SelectedEvent | null = null;

  public attributeButtonPressed: boolean = false;

  form: FormGroup;
  eventTypes: string[] = [];
  properties: Property[] = [];
  selectedPropertyType: string = '';
  selectedOperator: string = '';
  operatorOptions: string[] = [];
  numberOptions: string[] = [
    'equals to',
    'in between',
    'less than',
    'greater than',
  ];
  stringOptions: string[] = [
    'equals',
    'does not equal',
    'contains',
    'does not contain',
  ];

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      dynamicForms: this.formBuilder.array([]),
    });
  }

  public ngOnInit(): void {
    this.initializeForm();
    this.apiService
      .getCustomerEvents()
      .subscribe((customerEvents: CustomerEventsDataStructure) => {
        console.log(customerEvents.events);
        this.customerEvents = customerEvents;
      });
  }

  get dynamicForms(): FormArray {
    return this.form.get('dynamicForms') as FormArray;
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      eventType: new FormControl<string>(''),
      eventAttributes: this.formBuilder.array([this.createEventAttribute()]),
    });
  }

  // Method to create a FormGroup for each eventAttribute
  createEventAttribute(): FormGroup {
    return this.formBuilder.group({
      eventAttribute: new FormControl<string>(''),
      eventAttributeType: new FormControl<string>(''),
      operator: new FormControl(''),
      value: new FormControl(''),
      rangeValue: new FormControl<[string, string]>(['', '']),
    });
  }

  public onEventTypeChange(event: any) {
    console.log('Selected Event:', event.value);
    this.selectedEvent = event.value;
  }

  public onAttributeTypeChange(event: any) {}

  addEventAttribute() {
    this.attributeButtonPressed = true;
    console.log(this.selectedEvent?.properties);
    (this.form.get('eventAttributes') as FormArray).push(
      this.createEventAttribute()
    );
  }

  removeEventAttribute(index: number) {
    (this.form.get('eventAttributes') as FormArray).removeAt(index);
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

  public applyFilters() {
    console.log('filters applied');
  }

  public discardFilters() {
    console.log('discarded');
  }

  removeFormGroup(index: number): void {
    this.dynamicForms.removeAt(index);
  }
}
