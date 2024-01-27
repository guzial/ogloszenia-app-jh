import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TypUmowyService } from '../service/typ-umowy.service';
import { ITypUmowy } from '../typ-umowy.model';
import { TypUmowyFormService } from './typ-umowy-form.service';

import { TypUmowyUpdateComponent } from './typ-umowy-update.component';

describe('TypUmowy Management Update Component', () => {
  let comp: TypUmowyUpdateComponent;
  let fixture: ComponentFixture<TypUmowyUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let typUmowyFormService: TypUmowyFormService;
  let typUmowyService: TypUmowyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TypUmowyUpdateComponent],
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
      .overrideTemplate(TypUmowyUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TypUmowyUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    typUmowyFormService = TestBed.inject(TypUmowyFormService);
    typUmowyService = TestBed.inject(TypUmowyService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const typUmowy: ITypUmowy = { id: 456 };

      activatedRoute.data = of({ typUmowy });
      comp.ngOnInit();

      expect(comp.typUmowy).toEqual(typUmowy);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypUmowy>>();
      const typUmowy = { id: 123 };
      jest.spyOn(typUmowyFormService, 'getTypUmowy').mockReturnValue(typUmowy);
      jest.spyOn(typUmowyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typUmowy });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: typUmowy }));
      saveSubject.complete();

      // THEN
      expect(typUmowyFormService.getTypUmowy).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(typUmowyService.update).toHaveBeenCalledWith(expect.objectContaining(typUmowy));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypUmowy>>();
      const typUmowy = { id: 123 };
      jest.spyOn(typUmowyFormService, 'getTypUmowy').mockReturnValue({ id: null });
      jest.spyOn(typUmowyService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typUmowy: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: typUmowy }));
      saveSubject.complete();

      // THEN
      expect(typUmowyFormService.getTypUmowy).toHaveBeenCalled();
      expect(typUmowyService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypUmowy>>();
      const typUmowy = { id: 123 };
      jest.spyOn(typUmowyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typUmowy });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(typUmowyService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
