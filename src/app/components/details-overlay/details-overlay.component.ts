import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Cries, DetailedPokemon } from '../../interfaces/pokemon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-overlay.component.html',
  styleUrls: ['./details-overlay.component.scss'],
})
export class DetailsOverlayComponent implements OnInit {
  pokemon!: DetailedPokemon;
  cries!: Cries;
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  constructor(
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  openModal() {
    this.modalService.openModal(this.modalTemplate, this.viewContainerRef);
  }

  closeModal() {
    this.modalService.closeModal();
  }

  generateStatsArray() {
    if (!this.pokemon) {
      return [];
    }
    return this.pokemon.stats.map((stat) => {
      return {
        name: stat.stat.name.split('-').join(' '),
        base_stat: stat.base_stat,
      };
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.modalService.pokemon.subscribe((data) => {
      this.pokemon = data;
      this.getCries(data.cries);
    });
  }

  getCries(cries: Cries) {
    this.cries = cries;
  }

  playSound(url: string) {
    const audio = new Audio(url);
    audio.play();
  }
}
