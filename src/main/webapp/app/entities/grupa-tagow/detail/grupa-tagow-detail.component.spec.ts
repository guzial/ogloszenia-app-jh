import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GrupaTagowDetailComponent } from './grupa-tagow-detail.component';

describe('GrupaTagow Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupaTagowDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: GrupaTagowDetailComponent,
              resolve: { grupaTagow: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(GrupaTagowDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load grupaTagow on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', GrupaTagowDetailComponent);

      // THEN
      expect(instance.grupaTagow).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
