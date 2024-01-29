import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
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
  let userService: UserService;

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
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const wystawca: IWystawca = { id: 456 };
      const user: IUser = { id: 3882 };
      wystawca.user = user;

      const userCollection: IUser[] = [{ id: 17696 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ wystawca });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const wystawca: IWystawca = { id: 456 };
      const user: IUser = { id: 5313 };
      wystawca.user = user;

      activatedRoute.data = of({ wystawca });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
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

  describe('Compare relationships', () => {
    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
