import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '@core/services/characters.service';
import { ApiErrorResponse, Character, CharacterFilterReq } from '@core/models';
import { GenericCardComponent } from '@shared/components/generic-card/generic-card.component';
import { ICardData } from '@shared/models/card-data.interface';
import { GenericPaginationComponent } from '@shared/components/generic-pagination/generic-pagination.component';
import { GenericFilterComponent } from '@shared/components/generic-filter/generic-filter.component';
import { FilterButton, FilterField } from '@shared/models/filters.interface';
import { OptionsGender, OptionsStatus } from '../../../../../constants/options';
import { FormGroup } from '@angular/forms';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NotFoundComponent } from '@shared/components/errors/not-found';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { HttpStatusCode } from '@angular/common/http';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule,
    GenericCardComponent,
    GenericPaginationComponent,
    GenericFilterComponent,
    LoadingComponent,
    NotFoundComponent,
    CharacterDetailComponent
  ],
  templateUrl: 'character-list.component.html',
  styleUrls: ['character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  private readonly characterService = inject(CharacterService);
  private readonly alertService = inject(AlertService);

  characters = signal<Character[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  currentPage = signal<number>(1);
  pageSize = signal<number>(6);
  totalPages = signal<number | undefined>(undefined);
  filterReq: CharacterFilterReq = { page: this.currentPage(),  pageSize: this.pageSize(), };

  fields: FilterField[] = [
    { name: 'name', title: 'Nombre', type: 'text', placeholder: 'Ingrese un nombre', options: [], disabled: false },
    { name: 'species', title: 'Especie', type: 'text', options: [], placeholder: 'Ingrese una especie', disabled: false },
    { name: 'type', title: 'Tipo', type: 'text', options: [], placeholder: '', disabled: false },
    { name: 'gender', title: 'Género', type: 'select', placeholder: 'Seleccione un género', disabled: false, options: OptionsGender, },
    { name: 'status', title: 'Estado', type: 'select', placeholder: 'Seleccione un estado', disabled: false, options: OptionsStatus, },
  ];

  buttons: FilterButton[] = [
    { label: 'Buscar', action: (form?: FormGroup) => this.applyFilter(form) },
  ];

  modalOpen = signal(false);
  selectedCharacter = signal<number>(0);

  openDetail(item: number) {
    this.selectedCharacter.set(item);
    this.modalOpen.set(true);
  }

  closeDetail() {
    this.selectedCharacter.set(0);
    this.modalOpen.set(false);
  }

  ngOnInit() {
    this.alertService.hide();
    this.loadCharacters();
  }

  applyFilter(form?: FormGroup) {
    this.currentPage.set(1);
    this.pageSize.set(6);
    this.filterReq = { page: this.currentPage(), pageSize: this.pageSize(), ...form?.value }
    this.loadCharacters();
  }

  onReset() {
    this.currentPage.set(1);
    this.pageSize.set(6);
    this.filterReq = { page: this.currentPage(), pageSize: this.pageSize() };
    this.loadCharacters();
  }

  loadCharacters(filter?: CharacterFilterReq) {
    this.loading.set(true);
    this.error.set(null);
    this.totalPages.set(0);
    this.characters.set([]);

    if (filter)
      this.filterReq = filter;

    this.characterService.getPaginated({...this.filterReq, page: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (response) => {
        this.totalPages.set(response.info?.pages ?? undefined);
        this.characters.set(response.data);
        this.loading.set(false);
      },
      error: (err: ApiErrorResponse) => {
        this.alertService.showError(err);
        this.loading.set(false);
      }
    });
  }

  transformData(character: Character){
    let converted: ICardData = {
      id: character.id,
      imageUrl: character.image,
      title: character.name,
      detail: `${character.species} - ${character.gender}`,
      labelExtra: `Estado`,
      extraInfo: `${character.status}`,
    }

    return converted;
  }

  onNext() {
    const next =this.currentPage() + 1;
    this.currentPage.set(next);
    this.loadCharacters();
  }

  onPrev() {
    const prev = this.currentPage() > 0 ? this.currentPage() - 1 : 0;
    this.currentPage.set(prev);
    this.loadCharacters();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadCharacters();
  }

  onPageSizeChange(newSize: number) {
    this.pageSize.set(newSize);
    this.currentPage.set(1);
    this.loadCharacters();
  }
}
