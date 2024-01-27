import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TypUmowyDetailComponent } from './typ-umowy-detail.component';

describe('TypUmowy Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypUmowyDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TypUmowyDetailComponent,
              resolve: { typUmowy: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TypUmowyDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load typUmowy on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TypUmowyDetailComponent);

      // THEN
      expect(instance.typUmowy).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
