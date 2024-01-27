import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { WystawcaDetailComponent } from './wystawca-detail.component';

describe('Wystawca Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WystawcaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: WystawcaDetailComponent,
              resolve: { wystawca: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(WystawcaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load wystawca on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', WystawcaDetailComponent);

      // THEN
      expect(instance.wystawca).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
