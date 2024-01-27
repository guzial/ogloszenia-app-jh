import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITypUmowy, NewTypUmowy } from '../typ-umowy.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITypUmowy for edit and NewTypUmowyFormGroupInput for create.
 */
type TypUmowyFormGroupInput = ITypUmowy | PartialWithRequiredKeyOf<NewTypUmowy>;

type TypUmowyFormDefaults = Pick<NewTypUmowy, 'id'>;

type TypUmowyFormGroupContent = {
  id: FormControl<ITypUmowy['id'] | NewTypUmowy['id']>;
  tekst: FormControl<ITypUmowy['tekst']>;
};

export type TypUmowyFormGroup = FormGroup<TypUmowyFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TypUmowyFormService {
  createTypUmowyFormGroup(typUmowy: TypUmowyFormGroupInput = { id: null }): TypUmowyFormGroup {
    const typUmowyRawValue = {
      ...this.getFormDefaults(),
      ...typUmowy,
    };
    return new FormGroup<TypUmowyFormGroupContent>({
      id: new FormControl(
        { value: typUmowyRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tekst: new FormControl(typUmowyRawValue.tekst),
    });
  }

  getTypUmowy(form: TypUmowyFormGroup): ITypUmowy | NewTypUmowy {
    return form.getRawValue() as ITypUmowy | NewTypUmowy;
  }

  resetForm(form: TypUmowyFormGroup, typUmowy: TypUmowyFormGroupInput): void {
    const typUmowyRawValue = { ...this.getFormDefaults(), ...typUmowy };
    form.reset(
      {
        ...typUmowyRawValue,
        id: { value: typUmowyRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TypUmowyFormDefaults {
    return {
      id: null,
    };
  }
}
