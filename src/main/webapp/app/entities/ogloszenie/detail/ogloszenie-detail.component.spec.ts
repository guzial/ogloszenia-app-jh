import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OgloszenieDetailComponent } from './ogloszenie-detail.component';

describe('Ogloszenie Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OgloszenieDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: OgloszenieDetailComponent,
              resolve: { ogloszenie: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(OgloszenieDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load ogloszenie on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', OgloszenieDetailComponent);

      // THEN
      expect(instance.ogloszenie).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
