import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ISeniority } from 'app/entities/seniority/seniority.model';
import { SeniorityService } from 'app/entities/seniority/service/seniority.service';
import { ITypUmowy } from 'app/entities/typ-umowy/typ-umowy.model';
import { TypUmowyService } from 'app/entities/typ-umowy/service/typ-umowy.service';
import { IWystawca } from 'app/entities/wystawca/wystawca.model';
import { WystawcaService } from 'app/entities/wystawca/service/wystawca.service';
import { ITag } from 'app/entities/tag/tag.model';
import { TagService } from 'app/entities/tag/service/tag.service';
import { IOgloszenie } from '../ogloszenie.model';
import { OgloszenieService } from '../service/ogloszenie.service';
import { OgloszenieFormService } from './ogloszenie-form.service';

import { OgloszenieUpdateComponent } from './ogloszenie-update.component';

describe('Ogloszenie Management Update Component', () => {
  let comp: OgloszenieUpdateComponent;
  let fixture: ComponentFixture<OgloszenieUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ogloszenieFormService: OgloszenieFormService;
  let ogloszenieService: OgloszenieService;
  let seniorityService: SeniorityService;
  let typUmowyService: TypUmowyService;
  let wystawcaService: WystawcaService;
  let tagService: TagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), OgloszenieUpdateComponent],
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
      .overrideTemplate(OgloszenieUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OgloszenieUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ogloszenieFormService = TestBed.inject(OgloszenieFormService);
    ogloszenieService = TestBed.inject(OgloszenieService);
    seniorityService = TestBed.inject(SeniorityService);
    typUmowyService = TestBed.inject(TypUmowyService);
    wystawcaService = TestBed.inject(WystawcaService);
    tagService = TestBed.inject(TagService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call seniority query and add missing value', () => {
      const ogloszenie: IOgloszenie = { id: 456 };
      const seniority: ISeniority = { id: 8431 };
      ogloszenie.seniority = seniority;

      const seniorityCollection: ISeniority[] = [{ id: 14253 }];
      jest.spyOn(seniorityService, 'query').mockReturnValue(of(new HttpResponse({ body: seniorityCollection })));
      const expectedCollection: ISeniority[] = [seniority, ...seniorityCollection];
      jest.spyOn(seniorityService, 'addSeniorityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ogloszenie });
      comp.ngOnInit();

      expect(seniorityService.query).toHaveBeenCalled();
      expect(seniorityService.addSeniorityToCollectionIfMissing).toHaveBeenCalledWith(seniorityCollection, seniority);
      expect(comp.senioritiesCollection).toEqual(expectedCollection);
    });

    it('Should call typUmowy query and add missing value', () => {
      const ogloszenie: IOgloszenie = { id: 456 };
      const typUmowy: ITypUmowy = { id: 17126 };
      ogloszenie.typUmowy = typUmowy;

      const typUmowyCollection: ITypUmowy[] = [{ id: 19218 }];
      jest.spyOn(typUmowyService, 'query').mockReturnValue(of(new HttpResponse({ body: typUmowyCollection })));
      const expectedCollection: ITypUmowy[] = [typUmowy, ...typUmowyCollection];
      jest.spyOn(typUmowyService, 'addTypUmowyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ogloszenie });
      comp.ngOnInit();

      expect(typUmowyService.query).toHaveBeenCalled();
      expect(typUmowyService.addTypUmowyToCollectionIfMissing).toHaveBeenCalledWith(typUmowyCollection, typUmowy);
      expect(comp.typUmowiesCollection).toEqual(expectedCollection);
    });

    it('Should call Wystawca query and add missing value', () => {
      const ogloszenie: IOgloszenie = { id: 456 };
      const wystawca: IWystawca = { id: 17091 };
      ogloszenie.wystawca = wystawca;

      const wystawcaCollection: IWystawca[] = [{ id: 10877 }];
      jest.spyOn(wystawcaService, 'query').mockReturnValue(of(new HttpResponse({ body: wystawcaCollection })));
      const additionalWystawcas = [wystawca];
      const expectedCollection: IWystawca[] = [...additionalWystawcas, ...wystawcaCollection];
      jest.spyOn(wystawcaService, 'addWystawcaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ogloszenie });
      comp.ngOnInit();

      expect(wystawcaService.query).toHaveBeenCalled();
      expect(wystawcaService.addWystawcaToCollectionIfMissing).toHaveBeenCalledWith(
        wystawcaCollection,
        ...additionalWystawcas.map(expect.objectContaining),
      );
      expect(comp.wystawcasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Tag query and add missing value', () => {
      const ogloszenie: IOgloszenie = { id: 456 };
      const tags: ITag[] = [{ id: 28938 }];
      ogloszenie.tags = tags;

      const tagCollection: ITag[] = [{ id: 21164 }];
      jest.spyOn(tagService, 'query').mockReturnValue(of(new HttpResponse({ body: tagCollection })));
      const additionalTags = [...tags];
      const expectedCollection: ITag[] = [...additionalTags, ...tagCollection];
      jest.spyOn(tagService, 'addTagToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ogloszenie });
      comp.ngOnInit();

      expect(tagService.query).toHaveBeenCalled();
      expect(tagService.addTagToCollectionIfMissing).toHaveBeenCalledWith(tagCollection, ...additionalTags.map(expect.objectContaining));
      expect(comp.tagsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const ogloszenie: IOgloszenie = { id: 456 };
      const seniority: ISeniority = { id: 8805 };
      ogloszenie.seniority = seniority;
      const typUmowy: ITypUmowy = { id: 1644 };
      ogloszenie.typUmowy = typUmowy;
      const wystawca: IWystawca = { id: 21040 };
      ogloszenie.wystawca = wystawca;
      const tag: ITag = { id: 28260 };
      ogloszenie.tags = [tag];

      activatedRoute.data = of({ ogloszenie });
      comp.ngOnInit();

      expect(comp.senioritiesCollection).toContain(seniority);
      expect(comp.typUmowiesCollection).toContain(typUmowy);
      expect(comp.wystawcasSharedCollection).toContain(wystawca);
      expect(comp.tagsSharedCollection).toContain(tag);
      expect(comp.ogloszenie).toEqual(ogloszenie);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOgloszenie>>();
      const ogloszenie = { id: 123 };
      jest.spyOn(ogloszenieFormService, 'getOgloszenie').mockReturnValue(ogloszenie);
      jest.spyOn(ogloszenieService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ogloszenie });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ogloszenie }));
      saveSubject.complete();

      // THEN
      expect(ogloszenieFormService.getOgloszenie).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ogloszenieService.update).toHaveBeenCalledWith(expect.objectContaining(ogloszenie));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOgloszenie>>();
      const ogloszenie = { id: 123 };
      jest.spyOn(ogloszenieFormService, 'getOgloszenie').mockReturnValue({ id: null });
      jest.spyOn(ogloszenieService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ogloszenie: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ogloszenie }));
      saveSubject.complete();

      // THEN
      expect(ogloszenieFormService.getOgloszenie).toHaveBeenCalled();
      expect(ogloszenieService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOgloszenie>>();
      const ogloszenie = { id: 123 };
      jest.spyOn(ogloszenieService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ogloszenie });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ogloszenieService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSeniority', () => {
      it('Should forward to seniorityService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(seniorityService, 'compareSeniority');
        comp.compareSeniority(entity, entity2);
        expect(seniorityService.compareSeniority).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTypUmowy', () => {
      it('Should forward to typUmowyService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(typUmowyService, 'compareTypUmowy');
        comp.compareTypUmowy(entity, entity2);
        expect(typUmowyService.compareTypUmowy).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareWystawca', () => {
      it('Should forward to wystawcaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(wystawcaService, 'compareWystawca');
        comp.compareWystawca(entity, entity2);
        expect(wystawcaService.compareWystawca).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTag', () => {
      it('Should forward to tagService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tagService, 'compareTag');
        comp.compareTag(entity, entity2);
        expect(tagService.compareTag).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
