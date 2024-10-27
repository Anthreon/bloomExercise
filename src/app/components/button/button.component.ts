import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text: string = 'Button';
  @Input() textColor: string = '#ffffff';
  @Input() backgroundColor: string = '#007bff';
  @Input() size: string = 'medium'; // 'small', 'medium', 'large'
  @Input() icon: string = ''; // icon class (e.g., FontAwesome or Material Icons)
  @Output() clickAction = new EventEmitter<void>();

  public onClick(): void {
    this.clickAction.emit();
  }

  get buttonSize() {
    switch (this.size) {
      case 'small':
        return 'btn-small';
      case 'large':
        return 'btn-large';
      default:
        return 'btn-medium';
    }
  }
}
