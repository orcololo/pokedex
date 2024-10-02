import { OverlayRef, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { DetailedPokemon } from '../interfaces/pokemon';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private overlayRef!: OverlayRef;
  private pokemonSubject: BehaviorSubject<DetailedPokemon> =
    new BehaviorSubject<DetailedPokemon>({} as DetailedPokemon);
  pokemon = this.pokemonSubject.asObservable();

  constructor(private overlay: Overlay) {}

  openModal(
    template: TemplateRef<unknown>,
    viewContainerRef: ViewContainerRef
  ) {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      panelClass: 'custom-modal-panel',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });

    this.overlayRef = this.overlay.create(overlayConfig);

    const portal = new TemplatePortal(template, viewContainerRef);
    this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => this.closeModal());
  }

  closeModal() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

  setPokemon(pokemon: DetailedPokemon) {
    this.pokemonSubject.next(pokemon);
  }
}
