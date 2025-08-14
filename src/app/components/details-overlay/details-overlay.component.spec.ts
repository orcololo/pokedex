import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOverlayComponent } from './details-overlay.component';

describe('DetailsOverlayComponent', () => {
  let component: DetailsOverlayComponent;
  let fixture: ComponentFixture<DetailsOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
