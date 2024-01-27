import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../typ-umowy.test-samples';

import { TypUmowyFormService } from './typ-umowy-form.service';

describe('TypUmowy Form Service', () => {
  let service: TypUmowyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypUmowyFormService);
  });

  describe('Service methods', () => {
    describe('createTypUmowyFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTypUmowyFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tekst: expect.any(Object),
          }),
        );
      });

      it('passing ITypUmowy should create a new form with FormGroup', () => {
        const formGroup = service.createTypUmowyFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tekst: expect.any(Object),
          }),
        );
      });
    });

    describe('getTypUmowy', () => {
      it('should return NewTypUmowy for default TypUmowy initial value', () => {
        const formGroup = service.createTypUmowyFormGroup(sampleWithNewData);

        const typUmowy = service.getTypUmowy(formGroup) as any;

        expect(typUmowy).toMatchObject(sampleWithNewData);
      });

      it('should return NewTypUmowy for empty TypUmowy initial value', () => {
        const formGroup = service.createTypUmowyFormGroup();

        const typUmowy = service.getTypUmowy(formGroup) as any;

        expect(typUmowy).toMatchObject({});
      });

      it('should return ITypUmowy', () => {
        const formGroup = service.createTypUmowyFormGroup(sampleWithRequiredData);

        const typUmowy = service.getTypUmowy(formGroup) as any;

        expect(typUmowy).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITypUmowy should not enable id FormControl', () => {
        const formGroup = service.createTypUmowyFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTypUmowy should disable id FormControl', () => {
        const formGroup = service.createTypUmowyFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
