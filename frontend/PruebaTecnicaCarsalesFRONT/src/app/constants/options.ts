import { FilterSelectOptions } from "@shared/models/filters.interface";

export const OptionsStatus: FilterSelectOptions[] = [
  {label: 'Todos', value: ''},
  {label: 'Vivo', value: 'alive'},
  {label: 'Muerto', value: 'dead'},
  {label: 'Desconocido', value: 'unknown'},
]

export const OptionsGender: FilterSelectOptions[] = [
  {label: 'Todos', value: ''},
  {label: 'Femenino', value: 'female'},
  {label: 'Masculino', value: 'male'},
  {label: 'Sin Género', value: 'genderless'},
  {label: 'Desconocido', value: 'unknown'},
]
