import { HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, signal, OnInit } from '@angular/core';
import { Character, Episode } from '@core/models';
import { AlertService } from '@core/services/alert.service';
import { EpisodeService } from '@core/services/episodes.service';
import { NotFoundComponent } from '@shared/components/errors/not-found';
import { GenericCardComponent } from '@shared/components/generic-card/generic-card.component';
import { GenericModalComponent } from '@shared/components/generic-modal/generic-modal.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { ICardData } from '@shared/models/card-data.interface';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [GenericModalComponent, GenericCardComponent, LoadingComponent, NotFoundComponent],
  templateUrl: './episode-detail.component.html',
  styleUrl: './episode-detail.component.scss'
})
export class EpisodeDetailComponent implements OnChanges, OnInit{

  @Input() open = false;
  @Input() episodeId?: number;
  @Output() close = new EventEmitter<void>();

  private readonly episodeService = inject(EpisodeService);
  private readonly alertService = inject(AlertService);
  
  episode = signal<Episode | null>(null);
  caharacterList = signal<Character[]>([]);
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.alertService.hide();
    this.episode.set(null);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['episodeId'] && this.episodeId) {
      this.loadEpisode(this.episodeId);
    }

    if (changes['open'] && this.open && this.episodeId) {
      this.loadEpisode(this.episodeId);
    }
  }

  private async loadEpisode(id: number) {
    this.loading.set(true);

    this.episodeService.getById(id).subscribe({
      next: (response) => {
        this.episode.set(response ?? null);
        this.caharacterList.set(response.charactersList ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.episode.set(null);
        this.alertService.showError(err);
        this.loading.set(false);
      }
    });
  }

  closeModal() {
    this.close.emit();
  }

  transformData(character: Character){
    let converted: ICardData = {
      imageUrl: character.image,
      title: character.name,
      detail: `${character.species} - ${character.gender}`,
      labelExtra: `Estado`,
      extraInfo: `${character.status}`,
    }

    return converted;
  }

}
