import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonPageWrapperComponent } from './pokemon-page-wrapper.component';

describe('PokemonPageWrapperComponent', () => {
  let component: PokemonPageWrapperComponent;
  let fixture: ComponentFixture<PokemonPageWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonPageWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonPageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
