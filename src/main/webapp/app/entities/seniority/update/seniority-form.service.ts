import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISeniority, NewSeniority } from '../seniority.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISeniority for edit and NewSeniorityFormGroupInput for create.
 */
type SeniorityFormGroupInput = ISeniority | PartialWithRequiredKeyOf<NewSeniority>;

type SeniorityFormDefaults = Pick<NewSeniority, 'id'>;

type SeniorityFormGroupContent = {
  id: FormControl<ISeniority['id'] | NewSeniority['id']>;
  nazwa: FormControl<ISeniority['nazwa']>;
};

export type SeniorityFormGroup = FormGroup<SeniorityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SeniorityFormService {
  createSeniorityFormGroup(seniority: SeniorityFormGroupInput = { id: null }): SeniorityFormGroup {
    const seniorityRawValue = {
      ...this.getFormDefaults(),
      ...seniority,
    };
    return new FormGroup<SeniorityFormGroupContent>({
      id: new FormControl(
        { value: seniorityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nazwa: new FormControl(seniorityRawValue.nazwa),
    });
  }

  getSeniority(form: SeniorityFormGroup): ISeniority | NewSeniority {
    return form.getRawValue() as ISeniority | NewSeniority;
  }

  resetForm(form: SeniorityFormGroup, seniority: SeniorityFormGroupInput): void {
    const seniorityRawValue = { ...this.getFormDefaults(), ...seniority };
    form.reset(
      {
        ...seniorityRawValue,
        id: { value: seniorityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SeniorityFormDefaults {
    return {
      id: null,
    };
  }
}
