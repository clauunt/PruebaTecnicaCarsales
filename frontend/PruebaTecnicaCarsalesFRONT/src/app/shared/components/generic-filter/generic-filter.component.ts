import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
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
  @Output() onReset = new EventEmitter<void>();

  form: FormGroup = new FormGroup({});

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
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

  onActionBtn(btn: FilterButton) {
    btn.action?.(this.form);
  }

  resetForm() {
    this.buildForm();
    this.onReset.emit();
  }

}
