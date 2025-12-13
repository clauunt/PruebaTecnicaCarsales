import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Episode, EpisodeFilterReq } from '@core/models';
import { EpisodeService } from '@core/services/episodes.service';
import { GenericCardComponent } from '@shared/components/generic-card/generic-card.component';
import { GenericFilterComponent } from '@shared/components/generic-filter/generic-filter.component';
import { GenericPaginationComponent } from '@shared/components/generic-pagination/generic-pagination.component';
import { ICardData } from '@shared/models/card-data.interface';
import { FilterButton, FilterField } from '@shared/models/filters.interface';
import { EpisodeDetailComponent } from '../episode-detail/episode-detail.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NotFoundComponent } from '@shared/components/errors/not-found';

@Component({
  selector: 'app-episode-list',
  standalone: true,
  imports: [
    CommonModule,
    GenericCardComponent,
    GenericPaginationComponent,
    GenericFilterComponent,
    EpisodeDetailComponent,
    LoadingComponent,
    NotFoundComponent
  ],
  templateUrl: 'episode-list.component.html',
  styleUrl: 'episode-list.component.scss'
})
export class EpisodeListComponent implements OnInit {

  private readonly episodeService = inject(EpisodeService);
  episodes = signal<Episode[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  currentPage = signal<number>(1);
  pageSize = signal<number>(6);
  totalPages = signal<number | undefined>(undefined);
  filterReq: EpisodeFilterReq = { page: this.currentPage(), pageSize: this.pageSize(), };

  fields: FilterField[] = [
    { name: 'name', title: 'Nombre', type: 'text', placeholder: 'Ingrese un nombre', options: [], disabled: false },
    { name: 'episode', title: 'Episodio', type: 'text', options: [], placeholder: 'Ingrese un código de episodio', disabled: false },
  ];

  buttons: FilterButton[] = [
    { label: 'Buscar', action: (form?: FormGroup) => this.applyFilter(form) },
  ];

  modalOpen = signal(false);
  selectedEpisode = signal<number>(0);

  openDetail(item: number) {
    this.selectedEpisode.set(item);
    this.modalOpen.set(true);
  }

  closeDetail() {
    this.selectedEpisode.set(0);
    this.modalOpen.set(false);
  }

  ngOnInit() {
    this.loadEpisodes();
  }

  applyFilter(form?: FormGroup) {
    this.currentPage.set(1);
    this.pageSize.set(6);
    this.filterReq = { page: this.currentPage(), pageSize: this.pageSize(), ...form?.value }
    this.loadEpisodes();
  }

  onReset() {
    this.currentPage.set(1);
    this.pageSize.set(6);
    this.filterReq = { page: this.currentPage(), pageSize: this.pageSize() };
    this.loadEpisodes();
  }

  loadEpisodes(filter?: EpisodeFilterReq) {
    this.loading.set(true);
    this.error.set(null);
    this.totalPages.set(0);
    this.episodes.set([]);

    if (filter)
      this.filterReq = filter;

    this.episodeService.getPaginated({...this.filterReq, page: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (response) => {
        this.totalPages.set(response.info?.pages ?? undefined);
        this.episodes.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar los episodios');
        this.loading.set(false);
      }
    });
  }

  transformData(episode: Episode){
    let converted: ICardData = {
      id: episode.id,
      imageUrl: `./assets/images/film.svg`,
      title: episode.name,
      //labelDetail: `Fecha de emisión`,
      detail: `${episode.airDate}`,
      extraInfo: episode.episode,
    }

    return converted;
  }

  onNext() {
    const next =this.currentPage() + 1;
    this.currentPage.set(next);
    this.loadEpisodes();
  }

  onPrev() {
    const prev = this.currentPage() > 0 ? this.currentPage() - 1 : 0;
    this.currentPage.set(prev);
    this.loadEpisodes();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadEpisodes();
  }

}
