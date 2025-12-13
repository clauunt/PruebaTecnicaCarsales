import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterButton, FilterField } from '@shared/models/filters.interface';

@Component({
  selector: 'app-generic-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './generic-filter.component.html',
  styleUrls: ['./generic-filter.component.scss']
})
export class GenericFilterComponent implements OnInit, OnChanges {

  @Input() fields: FilterField[] = [];
  @Input() buttons: FilterButton[] = [];

  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fields']) {
      this.buildForm();
    }
  }

  private buildForm() {
    const controls: { [key: string]: FormControl } = {};
    for (const field of this.fields) {
      const fieldValu = field.value ?? '';
      controls[field.name] = new FormControl({ value: fieldValu, disabled: !!field.disabled });
    }

    this.form = new FormGroup(controls);
  }

  getValues(): Record<string, unknown> {
    return this.form.value;
  }

  onActionBtn(btn: FilterButton): void {
    btn.action?.(this.form);
  }

  resetForm(): void {
    this.buildForm();
  }

}
