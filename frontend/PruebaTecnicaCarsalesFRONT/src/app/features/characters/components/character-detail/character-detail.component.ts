import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { Character } from '@core/models';
import { CharacterService } from '@core/services/characters.service';
import { FormatUtils } from '@core/utils/format.utils';
import { NotFoundComponent } from '@shared/components/errors/not-found';
import { GenericModalComponent } from '@shared/components/generic-modal/generic-modal.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-character-detail',
  imports: [GenericModalComponent, LoadingComponent, NotFoundComponent],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss'
})
export class CharacterDetailComponent implements OnChanges, OnInit {

  @Input() open = false;
  @Input() characterId?: number;
  @Output() close = new EventEmitter<void>();

  private readonly characterService = inject(CharacterService);
  character = signal<Character | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.character.set(null);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['characterId'] && this.characterId) {
      this.loadCharacter(this.characterId);
    }

    if (changes['open'] && this.open && this.characterId) {
      this.loadCharacter(this.characterId);
    }
  }

  private async loadCharacter(id: number) {
    this.loading.set(true);
    this.error.set(null);

    this.characterService.getById(id).subscribe({
      next: (response) => {
        this.character.set(response ?? null);
        this.loading.set(false);
      },
      error: (error) => {
        this.character.set(null);
        this.error.set(error.message || 'Ocurrió un error al cargar el personaje.');
      }
    });
  }

  closeModal() {
    this.close.emit();
  }

  transformListToString(value?: string[]){
    if(value?.length === 0){
      return 'N/A';
    }
    return FormatUtils.unionList(value);
  }

}
