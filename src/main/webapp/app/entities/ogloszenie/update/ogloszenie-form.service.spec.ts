import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ogloszenie.test-samples';

import { OgloszenieFormService } from './ogloszenie-form.service';

describe('Ogloszenie Form Service', () => {
  let service: OgloszenieFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OgloszenieFormService);
  });

  describe('Service methods', () => {
    describe('createOgloszenieFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOgloszenieFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tytul: expect.any(Object),
            opis: expect.any(Object),
            dataPublikacji: expect.any(Object),
            dataWaznosci: expect.any(Object),
            startOd: expect.any(Object),
            czyWidelki: expect.any(Object),
            widelkiMin: expect.any(Object),
            widelkiMax: expect.any(Object),
            aktywne: expect.any(Object),
            seniority: expect.any(Object),
            typUmowy: expect.any(Object),
            wystawca: expect.any(Object),
          }),
        );
      });

      it('passing IOgloszenie should create a new form with FormGroup', () => {
        const formGroup = service.createOgloszenieFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tytul: expect.any(Object),
            opis: expect.any(Object),
            dataPublikacji: expect.any(Object),
            dataWaznosci: expect.any(Object),
            startOd: expect.any(Object),
            czyWidelki: expect.any(Object),
            widelkiMin: expect.any(Object),
            widelkiMax: expect.any(Object),
            aktywne: expect.any(Object),
            seniority: expect.any(Object),
            typUmowy: expect.any(Object),
            wystawca: expect.any(Object),
          }),
        );
      });
    });

    describe('getOgloszenie', () => {
      it('should return NewOgloszenie for default Ogloszenie initial value', () => {
        const formGroup = service.createOgloszenieFormGroup(sampleWithNewData);

        const ogloszenie = service.getOgloszenie(formGroup) as any;

        expect(ogloszenie).toMatchObject(sampleWithNewData);
      });

      it('should return NewOgloszenie for empty Ogloszenie initial value', () => {
        const formGroup = service.createOgloszenieFormGroup();

        const ogloszenie = service.getOgloszenie(formGroup) as any;

        expect(ogloszenie).toMatchObject({});
      });

      it('should return IOgloszenie', () => {
        const formGroup = service.createOgloszenieFormGroup(sampleWithRequiredData);

        const ogloszenie = service.getOgloszenie(formGroup) as any;

        expect(ogloszenie).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOgloszenie should not enable id FormControl', () => {
        const formGroup = service.createOgloszenieFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOgloszenie should disable id FormControl', () => {
        const formGroup = service.createOgloszenieFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
