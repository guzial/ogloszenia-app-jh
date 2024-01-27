import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { WystawcaService } from '../service/wystawca.service';
import { IWystawca } from '../wystawca.model';
import { WystawcaFormService } from './wystawca-form.service';

import { WystawcaUpdateComponent } from './wystawca-update.component';

describe('Wystawca Management Update Component', () => {
  let comp: WystawcaUpdateComponent;
  let fixture: ComponentFixture<WystawcaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let wystawcaFormService: WystawcaFormService;
  let wystawcaService: WystawcaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), WystawcaUpdateComponent],
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
      .overrideTemplate(WystawcaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WystawcaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    wystawcaFormService = TestBed.inject(WystawcaFormService);
    wystawcaService = TestBed.inject(WystawcaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const wystawca: IWystawca = { id: 456 };

      activatedRoute.data = of({ wystawca });
      comp.ngOnInit();

      expect(comp.wystawca).toEqual(wystawca);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWystawca>>();
      const wystawca = { id: 123 };
      jest.spyOn(wystawcaFormService, 'getWystawca').mockReturnValue(wystawca);
      jest.spyOn(wystawcaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ wystawca });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: wystawca }));
      saveSubject.complete();

      // THEN
      expect(wystawcaFormService.getWystawca).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(wystawcaService.update).toHaveBeenCalledWith(expect.objectContaining(wystawca));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWystawca>>();
      const wystawca = { id: 123 };
      jest.spyOn(wystawcaFormService, 'getWystawca').mockReturnValue({ id: null });
      jest.spyOn(wystawcaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ wystawca: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: wystawca }));
      saveSubject.complete();

      // THEN
      expect(wystawcaFormService.getWystawca).toHaveBeenCalled();
      expect(wystawcaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWystawca>>();
      const wystawca = { id: 123 };
      jest.spyOn(wystawcaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ wystawca });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(wystawcaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
