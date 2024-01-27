import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../seniority.test-samples';

import { SeniorityFormService } from './seniority-form.service';

describe('Seniority Form Service', () => {
  let service: SeniorityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeniorityFormService);
  });

  describe('Service methods', () => {
    describe('createSeniorityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSeniorityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nazwa: expect.any(Object),
          }),
        );
      });

      it('passing ISeniority should create a new form with FormGroup', () => {
        const formGroup = service.createSeniorityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nazwa: expect.any(Object),
          }),
        );
      });
    });

    describe('getSeniority', () => {
      it('should return NewSeniority for default Seniority initial value', () => {
        const formGroup = service.createSeniorityFormGroup(sampleWithNewData);

        const seniority = service.getSeniority(formGroup) as any;

        expect(seniority).toMatchObject(sampleWithNewData);
      });

      it('should return NewSeniority for empty Seniority initial value', () => {
        const formGroup = service.createSeniorityFormGroup();

        const seniority = service.getSeniority(formGroup) as any;

        expect(seniority).toMatchObject({});
      });

      it('should return ISeniority', () => {
        const formGroup = service.createSeniorityFormGroup(sampleWithRequiredData);

        const seniority = service.getSeniority(formGroup) as any;

        expect(seniority).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISeniority should not enable id FormControl', () => {
        const formGroup = service.createSeniorityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSeniority should disable id FormControl', () => {
        const formGroup = service.createSeniorityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
