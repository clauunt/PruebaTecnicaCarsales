import { FormGroup } from "@angular/forms";

export interface FilterField {
  name: string;
  title: string;
  type: 'text' | 'number' | 'select' | 'date';
  placeholder?: string;
  options: FilterSelectOptions[];
  value?: string | number | Date | null;
  disabled: boolean;
}

export interface FilterButton {
  label: string;
  action?: (form?: FormGroup) => void;
}

export interface FilterSelectOptions {
  label: string;
  value: string | number;
}
