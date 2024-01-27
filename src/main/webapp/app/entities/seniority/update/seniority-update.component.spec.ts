import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SeniorityService } from '../service/seniority.service';
import { ISeniority } from '../seniority.model';
import { SeniorityFormService } from './seniority-form.service';

import { SeniorityUpdateComponent } from './seniority-update.component';

describe('Seniority Management Update Component', () => {
  let comp: SeniorityUpdateComponent;
  let fixture: ComponentFixture<SeniorityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let seniorityFormService: SeniorityFormService;
  let seniorityService: SeniorityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), SeniorityUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(SeniorityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SeniorityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    seniorityFormService = TestBed.inject(SeniorityFormService);
    seniorityService = TestBed.inject(SeniorityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const seniority: ISeniority = { id: 456 };

      activatedRoute.data = of({ seniority });
      comp.ngOnInit();

      expect(comp.seniority).toEqual(seniority);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISeniority>>();
      const seniority = { id: 123 };
      jest.spyOn(seniorityFormService, 'getSeniority').mockReturnValue(seniority);
      jest.spyOn(seniorityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ seniority });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: seniority }));
      saveSubject.complete();

      // THEN
      expect(seniorityFormService.getSeniority).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(seniorityService.update).toHaveBeenCalledWith(expect.objectContaining(seniority));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISeniority>>();
      const seniority = { id: 123 };
      jest.spyOn(seniorityFormService, 'getSeniority').mockReturnValue({ id: null });
      jest.spyOn(seniorityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ seniority: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: seniority }));
      saveSubject.complete();

      // THEN
      expect(seniorityFormService.getSeniority).toHaveBeenCalled();
      expect(seniorityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISeniority>>();
      const seniority = { id: 123 };
      jest.spyOn(seniorityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ seniority });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(seniorityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
