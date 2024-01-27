import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IWystawca, NewWystawca } from '../wystawca.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWystawca for edit and NewWystawcaFormGroupInput for create.
 */
type WystawcaFormGroupInput = IWystawca | PartialWithRequiredKeyOf<NewWystawca>;

type WystawcaFormDefaults = Pick<NewWystawca, 'id'>;

type WystawcaFormGroupContent = {
  id: FormControl<IWystawca['id'] | NewWystawca['id']>;
  nazwa: FormControl<IWystawca['nazwa']>;
  kontakt: FormControl<IWystawca['kontakt']>;
};

export type WystawcaFormGroup = FormGroup<WystawcaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WystawcaFormService {
  createWystawcaFormGroup(wystawca: WystawcaFormGroupInput = { id: null }): WystawcaFormGroup {
    const wystawcaRawValue = {
      ...this.getFormDefaults(),
      ...wystawca,
    };
    return new FormGroup<WystawcaFormGroupContent>({
      id: new FormControl(
        { value: wystawcaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nazwa: new FormControl(wystawcaRawValue.nazwa),
      kontakt: new FormControl(wystawcaRawValue.kontakt),
    });
  }

  getWystawca(form: WystawcaFormGroup): IWystawca | NewWystawca {
    return form.getRawValue() as IWystawca | NewWystawca;
  }

  resetForm(form: WystawcaFormGroup, wystawca: WystawcaFormGroupInput): void {
    const wystawcaRawValue = { ...this.getFormDefaults(), ...wystawca };
    form.reset(
      {
        ...wystawcaRawValue,
        id: { value: wystawcaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): WystawcaFormDefaults {
    return {
      id: null,
    };
  }
}
