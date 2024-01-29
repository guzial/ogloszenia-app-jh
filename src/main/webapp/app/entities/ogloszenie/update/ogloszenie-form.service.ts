import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IOgloszenie, NewOgloszenie } from '../ogloszenie.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOgloszenie for edit and NewOgloszenieFormGroupInput for create.
 */
type OgloszenieFormGroupInput = IOgloszenie | PartialWithRequiredKeyOf<NewOgloszenie>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IOgloszenie | NewOgloszenie> = Omit<T, 'dataPublikacji' | 'dataWaznosci' | 'startOd'> & {
  dataPublikacji?: string | null;
  dataWaznosci?: string | null;
  startOd?: string | null;
};

type OgloszenieFormRawValue = FormValueOf<IOgloszenie>;

type NewOgloszenieFormRawValue = FormValueOf<NewOgloszenie>;

type OgloszenieFormDefaults = Pick<NewOgloszenie, 'id' | 'dataPublikacji' | 'dataWaznosci' | 'startOd' | 'czyWidelki' | 'aktywne' | 'tags'>;

type OgloszenieFormGroupContent = {
  id: FormControl<OgloszenieFormRawValue['id'] | NewOgloszenie['id']>;
  tytul: FormControl<OgloszenieFormRawValue['tytul']>;
  opis: FormControl<OgloszenieFormRawValue['opis']>;
  dataPublikacji: FormControl<OgloszenieFormRawValue['dataPublikacji']>;
  dataWaznosci: FormControl<OgloszenieFormRawValue['dataWaznosci']>;
  startOd: FormControl<OgloszenieFormRawValue['startOd']>;
  czyWidelki: FormControl<OgloszenieFormRawValue['czyWidelki']>;
  widelkiMin: FormControl<OgloszenieFormRawValue['widelkiMin']>;
  widelkiMax: FormControl<OgloszenieFormRawValue['widelkiMax']>;
  aktywne: FormControl<OgloszenieFormRawValue['aktywne']>;
  seniority: FormControl<OgloszenieFormRawValue['seniority']>;
  typUmowy: FormControl<OgloszenieFormRawValue['typUmowy']>;
  wystawca: FormControl<OgloszenieFormRawValue['wystawca']>;
  tags: FormControl<OgloszenieFormRawValue['tags']>;
};

export type OgloszenieFormGroup = FormGroup<OgloszenieFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OgloszenieFormService {
  createOgloszenieFormGroup(ogloszenie: OgloszenieFormGroupInput = { id: null }): OgloszenieFormGroup {
    const ogloszenieRawValue = this.convertOgloszenieToOgloszenieRawValue({
      ...this.getFormDefaults(),
      ...ogloszenie,
    });
    return new FormGroup<OgloszenieFormGroupContent>({
      id: new FormControl(
        { value: ogloszenieRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tytul: new FormControl(ogloszenieRawValue.tytul),
      opis: new FormControl(ogloszenieRawValue.opis),
      dataPublikacji: new FormControl(ogloszenieRawValue.dataPublikacji),
      dataWaznosci: new FormControl(ogloszenieRawValue.dataWaznosci),
      startOd: new FormControl(ogloszenieRawValue.startOd),
      czyWidelki: new FormControl(ogloszenieRawValue.czyWidelki),
      widelkiMin: new FormControl(ogloszenieRawValue.widelkiMin),
      widelkiMax: new FormControl(ogloszenieRawValue.widelkiMax),
      aktywne: new FormControl(ogloszenieRawValue.aktywne),
      seniority: new FormControl(ogloszenieRawValue.seniority),
      typUmowy: new FormControl(ogloszenieRawValue.typUmowy),
      wystawca: new FormControl(ogloszenieRawValue.wystawca),
      tags: new FormControl(ogloszenieRawValue.tags ?? []),
    });
  }

  getOgloszenie(form: OgloszenieFormGroup): IOgloszenie | NewOgloszenie {
    return this.convertOgloszenieRawValueToOgloszenie(form.getRawValue() as OgloszenieFormRawValue | NewOgloszenieFormRawValue);
  }

  resetForm(form: OgloszenieFormGroup, ogloszenie: OgloszenieFormGroupInput): void {
    const ogloszenieRawValue = this.convertOgloszenieToOgloszenieRawValue({ ...this.getFormDefaults(), ...ogloszenie });
    form.reset(
      {
        ...ogloszenieRawValue,
        id: { value: ogloszenieRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): OgloszenieFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataPublikacji: currentTime,
      dataWaznosci: currentTime,
      startOd: currentTime,
      czyWidelki: false,
      aktywne: false,
      tags: [],
    };
  }

  private convertOgloszenieRawValueToOgloszenie(
    rawOgloszenie: OgloszenieFormRawValue | NewOgloszenieFormRawValue,
  ): IOgloszenie | NewOgloszenie {
    return {
      ...rawOgloszenie,
      dataPublikacji: dayjs(rawOgloszenie.dataPublikacji, DATE_TIME_FORMAT),
      dataWaznosci: dayjs(rawOgloszenie.dataWaznosci, DATE_TIME_FORMAT),
      startOd: dayjs(rawOgloszenie.startOd, DATE_TIME_FORMAT),
    };
  }

  private convertOgloszenieToOgloszenieRawValue(
    ogloszenie: IOgloszenie | (Partial<NewOgloszenie> & OgloszenieFormDefaults),
  ): OgloszenieFormRawValue | PartialWithRequiredKeyOf<NewOgloszenieFormRawValue> {
    return {
      ...ogloszenie,
      dataPublikacji: ogloszenie.dataPublikacji ? ogloszenie.dataPublikacji.format(DATE_TIME_FORMAT) : undefined,
      dataWaznosci: ogloszenie.dataWaznosci ? ogloszenie.dataWaznosci.format(DATE_TIME_FORMAT) : undefined,
      startOd: ogloszenie.startOd ? ogloszenie.startOd.format(DATE_TIME_FORMAT) : undefined,
      tags: ogloszenie.tags ?? [],
    };
  }
}
