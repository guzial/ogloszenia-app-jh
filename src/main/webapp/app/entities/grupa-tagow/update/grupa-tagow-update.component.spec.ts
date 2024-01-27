import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GrupaTagowService } from '../service/grupa-tagow.service';
import { IGrupaTagow } from '../grupa-tagow.model';
import { GrupaTagowFormService } from './grupa-tagow-form.service';

import { GrupaTagowUpdateComponent } from './grupa-tagow-update.component';

describe('GrupaTagow Management Update Component', () => {
  let comp: GrupaTagowUpdateComponent;
  let fixture: ComponentFixture<GrupaTagowUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let grupaTagowFormService: GrupaTagowFormService;
  let grupaTagowService: GrupaTagowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), GrupaTagowUpdateComponent],
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
      .overrideTemplate(GrupaTagowUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GrupaTagowUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    grupaTagowFormService = TestBed.inject(GrupaTagowFormService);
    grupaTagowService = TestBed.inject(GrupaTagowService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const grupaTagow: IGrupaTagow = { id: 456 };

      activatedRoute.data = of({ grupaTagow });
      comp.ngOnInit();

      expect(comp.grupaTagow).toEqual(grupaTagow);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupaTagow>>();
      const grupaTagow = { id: 123 };
      jest.spyOn(grupaTagowFormService, 'getGrupaTagow').mockReturnValue(grupaTagow);
      jest.spyOn(grupaTagowService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupaTagow });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grupaTagow }));
      saveSubject.complete();

      // THEN
      expect(grupaTagowFormService.getGrupaTagow).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(grupaTagowService.update).toHaveBeenCalledWith(expect.objectContaining(grupaTagow));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupaTagow>>();
      const grupaTagow = { id: 123 };
      jest.spyOn(grupaTagowFormService, 'getGrupaTagow').mockReturnValue({ id: null });
      jest.spyOn(grupaTagowService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupaTagow: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grupaTagow }));
      saveSubject.complete();

      // THEN
      expect(grupaTagowFormService.getGrupaTagow).toHaveBeenCalled();
      expect(grupaTagowService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupaTagow>>();
      const grupaTagow = { id: 123 };
      jest.spyOn(grupaTagowService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupaTagow });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(grupaTagowService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
