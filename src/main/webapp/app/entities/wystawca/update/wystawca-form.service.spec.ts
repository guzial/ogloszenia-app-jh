import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../wystawca.test-samples';

import { WystawcaFormService } from './wystawca-form.service';

describe('Wystawca Form Service', () => {
  let service: WystawcaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WystawcaFormService);
  });

  describe('Service methods', () => {
    describe('createWystawcaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWystawcaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nazwa: expect.any(Object),
            kontakt: expect.any(Object),
            user: expect.any(Object),
          }),
        );
      });

      it('passing IWystawca should create a new form with FormGroup', () => {
        const formGroup = service.createWystawcaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nazwa: expect.any(Object),
            kontakt: expect.any(Object),
            user: expect.any(Object),
          }),
        );
      });
    });

    describe('getWystawca', () => {
      it('should return NewWystawca for default Wystawca initial value', () => {
        const formGroup = service.createWystawcaFormGroup(sampleWithNewData);

        const wystawca = service.getWystawca(formGroup) as any;

        expect(wystawca).toMatchObject(sampleWithNewData);
      });

      it('should return NewWystawca for empty Wystawca initial value', () => {
        const formGroup = service.createWystawcaFormGroup();

        const wystawca = service.getWystawca(formGroup) as any;

        expect(wystawca).toMatchObject({});
      });

      it('should return IWystawca', () => {
        const formGroup = service.createWystawcaFormGroup(sampleWithRequiredData);

        const wystawca = service.getWystawca(formGroup) as any;

        expect(wystawca).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWystawca should not enable id FormControl', () => {
        const formGroup = service.createWystawcaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWystawca should disable id FormControl', () => {
        const formGroup = service.createWystawcaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
