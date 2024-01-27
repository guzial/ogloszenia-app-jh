import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SeniorityDetailComponent } from './seniority-detail.component';

describe('Seniority Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeniorityDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: SeniorityDetailComponent,
              resolve: { seniority: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SeniorityDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load seniority on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SeniorityDetailComponent);

      // THEN
      expect(instance.seniority).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
