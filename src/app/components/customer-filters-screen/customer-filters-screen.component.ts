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
import { InputTextModule } from 'primeng/inputtext';
import { Subject, takeUntil } from 'rxjs';

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
    InputTextModule,
  ],
  templateUrl: './customer-filters-screen.component.html',
  styleUrl: './customer-filters-screen.component.scss',
})
export class CustomerFiltersScreenComponent implements OnInit {
  public customerEventsForm: FormGroup | undefined;
  public customerEvents: CustomerEventsDataStructure | undefined;
  public selectedCustomerEvent: EventTypes | null = null;
  public selectedEvent: SelectedEvent | null = null;

  private unsubscribe$ = new Subject<void>();

  public attributeButtonPressed: boolean = false;

  public attributeButtonSelected: boolean = false;

  public formNumberOptions = {
    options: ['equals to', 'in between', 'less than', 'greater than'],
  };

  public formStringOptions = {
    options: ['equals', 'does not equal', 'contains', 'does not contain'],
  };

  public allOptions = {
    'equals to': 'equals to',
    'in between': 'in between',
    'less than': 'less than',
    'greater than': 'greater than',
    equals: 'equals',
    'does not equal': 'does not equal',
    contains: 'contains',
    'does not contain': 'does not contain',
  };

  public displayRefine: boolean = false;

  public currentlyPickedOptionForNumberOrString = {
    number: true,
    string: false,
  };

  public pickedIntervalOrScalar = {
    scalar: true,
    interval: false,
  };

  form: FormGroup;
  eventTypes: string[] = [];
  properties: Property[] = [];
  selectedPropertyType: string = '';
  selectedOperator: string = '';
  operatorOptions: string[] = [];

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
    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((newFormValue) => {
        console.log('Form data: ', newFormValue);
      });
    this.apiService
      .getCustomerEvents()
      .pipe(takeUntil(this.unsubscribe$))
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
      eventFormID: new FormControl<number>(1),
      eventType: new FormControl<string>(''),
      eventAttribute: this.formBuilder.group({
        eventAttributeName: new FormControl<string>(''),
        eventAttributeStringOrNumber: this.formBuilder.group({
          eventStringValue: new FormControl<string>(''),
          eventNumberValue: this.formBuilder.group({
            eventNumberFirstField: new FormControl<string>(''),
            eventNumberSecondField: new FormControl<string>(''),
          }),
        }),
      }),
    });
  }

  public selectStringOption() {
    this.currentlyPickedOptionForNumberOrString = {
      number: false,
      string: true,
    };
  }

  public selectNumberOption() {
    this.currentlyPickedOptionForNumberOrString = {
      number: true,
      string: false,
    };
  }

  public onEventTypeChange(event: any) {
    console.log('Selected Event:', event.value);
    this.selectedEvent = event.value;
  }

  public onAttributeTypeChange(event: any) {
    console.log('Attribute event', event);
    this.attributeButtonSelected = true;
    this.changePickedIntervalOrScalar(event);
  }

  addEventAttribute() {
    this.attributeButtonPressed = true;
    console.log(this.selectedEvent?.properties);

    this.displayRefine = true;
    //here show refine more

    // (this.form.get('eventAttributes') as FormArray).push(
    //   this.createEventAttribute()
    // );
  }

  changePickedIntervalOrScalar(event: any) {
    const pickedValue: string = event.value;
    if (pickedValue === this.allOptions['in between']) {
      this.pickedIntervalOrScalar = { interval: true, scalar: false };
      return;
    }
    this.pickedIntervalOrScalar = { interval: false, scalar: true };
    console.log(this.form);
  }

  removeEventAttribute(index: number) {
    (this.form.get('eventAttributes') as FormArray).removeAt(index);
  }

  addNewEventAttributeSection() {}

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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
