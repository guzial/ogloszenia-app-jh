import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../grupa-tagow.test-samples';

import { GrupaTagowFormService } from './grupa-tagow-form.service';

describe('GrupaTagow Form Service', () => {
  let service: GrupaTagowFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupaTagowFormService);
  });

  describe('Service methods', () => {
    describe('createGrupaTagowFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGrupaTagowFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nazwaGrupy: expect.any(Object),
          }),
        );
      });

      it('passing IGrupaTagow should create a new form with FormGroup', () => {
        const formGroup = service.createGrupaTagowFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nazwaGrupy: expect.any(Object),
          }),
        );
      });
    });

    describe('getGrupaTagow', () => {
      it('should return NewGrupaTagow for default GrupaTagow initial value', () => {
        const formGroup = service.createGrupaTagowFormGroup(sampleWithNewData);

        const grupaTagow = service.getGrupaTagow(formGroup) as any;

        expect(grupaTagow).toMatchObject(sampleWithNewData);
      });

      it('should return NewGrupaTagow for empty GrupaTagow initial value', () => {
        const formGroup = service.createGrupaTagowFormGroup();

        const grupaTagow = service.getGrupaTagow(formGroup) as any;

        expect(grupaTagow).toMatchObject({});
      });

      it('should return IGrupaTagow', () => {
        const formGroup = service.createGrupaTagowFormGroup(sampleWithRequiredData);

        const grupaTagow = service.getGrupaTagow(formGroup) as any;

        expect(grupaTagow).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGrupaTagow should not enable id FormControl', () => {
        const formGroup = service.createGrupaTagowFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGrupaTagow should disable id FormControl', () => {
        const formGroup = service.createGrupaTagowFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
