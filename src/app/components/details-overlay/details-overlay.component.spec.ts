import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOVerlayComponent } from './details-overlay.component';

describe('DetailsOVerlayComponent', () => {
  let component: DetailsOVerlayComponent;
  let fixture: ComponentFixture<DetailsOVerlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsOVerlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsOVerlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
