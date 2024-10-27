import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerFiltersScreenComponent } from './components/customer-filters-screen/customer-filters-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomerFiltersScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
