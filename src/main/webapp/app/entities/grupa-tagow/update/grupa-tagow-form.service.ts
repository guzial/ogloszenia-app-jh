import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IGrupaTagow, NewGrupaTagow } from '../grupa-tagow.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGrupaTagow for edit and NewGrupaTagowFormGroupInput for create.
 */
type GrupaTagowFormGroupInput = IGrupaTagow | PartialWithRequiredKeyOf<NewGrupaTagow>;

type GrupaTagowFormDefaults = Pick<NewGrupaTagow, 'id'>;

type GrupaTagowFormGroupContent = {
  id: FormControl<IGrupaTagow['id'] | NewGrupaTagow['id']>;
  nazwaGrupy: FormControl<IGrupaTagow['nazwaGrupy']>;
};

export type GrupaTagowFormGroup = FormGroup<GrupaTagowFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GrupaTagowFormService {
  createGrupaTagowFormGroup(grupaTagow: GrupaTagowFormGroupInput = { id: null }): GrupaTagowFormGroup {
    const grupaTagowRawValue = {
      ...this.getFormDefaults(),
      ...grupaTagow,
    };
    return new FormGroup<GrupaTagowFormGroupContent>({
      id: new FormControl(
        { value: grupaTagowRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nazwaGrupy: new FormControl(grupaTagowRawValue.nazwaGrupy),
    });
  }

  getGrupaTagow(form: GrupaTagowFormGroup): IGrupaTagow | NewGrupaTagow {
    return form.getRawValue() as IGrupaTagow | NewGrupaTagow;
  }

  resetForm(form: GrupaTagowFormGroup, grupaTagow: GrupaTagowFormGroupInput): void {
    const grupaTagowRawValue = { ...this.getFormDefaults(), ...grupaTagow };
    form.reset(
      {
        ...grupaTagowRawValue,
        id: { value: grupaTagowRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): GrupaTagowFormDefaults {
    return {
      id: null,
    };
  }
}
