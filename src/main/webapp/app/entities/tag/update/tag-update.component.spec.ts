import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IGrupaTagow } from 'app/entities/grupa-tagow/grupa-tagow.model';
import { GrupaTagowService } from 'app/entities/grupa-tagow/service/grupa-tagow.service';
import { TagService } from '../service/tag.service';
import { ITag } from '../tag.model';
import { TagFormService } from './tag-form.service';

import { TagUpdateComponent } from './tag-update.component';

describe('Tag Management Update Component', () => {
  let comp: TagUpdateComponent;
  let fixture: ComponentFixture<TagUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tagFormService: TagFormService;
  let tagService: TagService;
  let grupaTagowService: GrupaTagowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TagUpdateComponent],
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
      .overrideTemplate(TagUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TagUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tagFormService = TestBed.inject(TagFormService);
    tagService = TestBed.inject(TagService);
    grupaTagowService = TestBed.inject(GrupaTagowService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call grupaTagow query and add missing value', () => {
      const tag: ITag = { id: 456 };
      const grupaTagow: IGrupaTagow = { id: 4534 };
      tag.grupaTagow = grupaTagow;

      const grupaTagowCollection: IGrupaTagow[] = [{ id: 3840 }];
      jest.spyOn(grupaTagowService, 'query').mockReturnValue(of(new HttpResponse({ body: grupaTagowCollection })));
      const expectedCollection: IGrupaTagow[] = [grupaTagow, ...grupaTagowCollection];
      jest.spyOn(grupaTagowService, 'addGrupaTagowToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tag });
      comp.ngOnInit();

      expect(grupaTagowService.query).toHaveBeenCalled();
      expect(grupaTagowService.addGrupaTagowToCollectionIfMissing).toHaveBeenCalledWith(grupaTagowCollection, grupaTagow);
      expect(comp.grupaTagowsCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tag: ITag = { id: 456 };
      const grupaTagow: IGrupaTagow = { id: 28007 };
      tag.grupaTagow = grupaTagow;

      activatedRoute.data = of({ tag });
      comp.ngOnInit();

      expect(comp.grupaTagowsCollection).toContain(grupaTagow);
      expect(comp.tag).toEqual(tag);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITag>>();
      const tag = { id: 123 };
      jest.spyOn(tagFormService, 'getTag').mockReturnValue(tag);
      jest.spyOn(tagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tag }));
      saveSubject.complete();

      // THEN
      expect(tagFormService.getTag).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tagService.update).toHaveBeenCalledWith(expect.objectContaining(tag));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITag>>();
      const tag = { id: 123 };
      jest.spyOn(tagFormService, 'getTag').mockReturnValue({ id: null });
      jest.spyOn(tagService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tag: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tag }));
      saveSubject.complete();

      // THEN
      expect(tagFormService.getTag).toHaveBeenCalled();
      expect(tagService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITag>>();
      const tag = { id: 123 };
      jest.spyOn(tagService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tag });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tagService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareGrupaTagow', () => {
      it('Should forward to grupaTagowService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(grupaTagowService, 'compareGrupaTagow');
        comp.compareGrupaTagow(entity, entity2);
        expect(grupaTagowService.compareGrupaTagow).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
