import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISeniority } from 'app/entities/seniority/seniority.model';
import { SeniorityService } from 'app/entities/seniority/service/seniority.service';
import { ITypUmowy } from 'app/entities/typ-umowy/typ-umowy.model';
import { TypUmowyService } from 'app/entities/typ-umowy/service/typ-umowy.service';
import { IWystawca } from 'app/entities/wystawca/wystawca.model';
import { WystawcaService } from 'app/entities/wystawca/service/wystawca.service';
import { ITag } from 'app/entities/tag/tag.model';
import { TagService } from 'app/entities/tag/service/tag.service';
import { OgloszenieService } from '../service/ogloszenie.service';
import { IOgloszenie } from '../ogloszenie.model';
import { OgloszenieFormService, OgloszenieFormGroup } from './ogloszenie-form.service';

@Component({
  standalone: true,
  selector: 'jhi-ogloszenie-update',
  templateUrl: './ogloszenie-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class OgloszenieUpdateComponent implements OnInit {
  isSaving = false;
  ogloszenie: IOgloszenie | null = null;

  senioritiesCollection: ISeniority[] = [];
  typUmowiesCollection: ITypUmowy[] = [];
  wystawcasSharedCollection: IWystawca[] = [];
  tagsSharedCollection: ITag[] = [];

  editForm: OgloszenieFormGroup = this.ogloszenieFormService.createOgloszenieFormGroup();

  constructor(
    protected ogloszenieService: OgloszenieService,
    protected ogloszenieFormService: OgloszenieFormService,
    protected seniorityService: SeniorityService,
    protected typUmowyService: TypUmowyService,
    protected wystawcaService: WystawcaService,
    protected tagService: TagService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareSeniority = (o1: ISeniority | null, o2: ISeniority | null): boolean => this.seniorityService.compareSeniority(o1, o2);

  compareTypUmowy = (o1: ITypUmowy | null, o2: ITypUmowy | null): boolean => this.typUmowyService.compareTypUmowy(o1, o2);

  compareWystawca = (o1: IWystawca | null, o2: IWystawca | null): boolean => this.wystawcaService.compareWystawca(o1, o2);

  compareTag = (o1: ITag | null, o2: ITag | null): boolean => this.tagService.compareTag(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ogloszenie }) => {
      this.ogloszenie = ogloszenie;
      if (ogloszenie) {
        this.updateForm(ogloszenie);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ogloszenie = this.ogloszenieFormService.getOgloszenie(this.editForm);
    if (ogloszenie.id !== null) {
      this.subscribeToSaveResponse(this.ogloszenieService.update(ogloszenie));
    } else {
      this.subscribeToSaveResponse(this.ogloszenieService.create(ogloszenie));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOgloszenie>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(ogloszenie: IOgloszenie): void {
    this.ogloszenie = ogloszenie;
    this.ogloszenieFormService.resetForm(this.editForm, ogloszenie);

    this.senioritiesCollection = this.seniorityService.addSeniorityToCollectionIfMissing<ISeniority>(
      this.senioritiesCollection,
      ogloszenie.seniority,
    );
    this.typUmowiesCollection = this.typUmowyService.addTypUmowyToCollectionIfMissing<ITypUmowy>(
      this.typUmowiesCollection,
      ogloszenie.typUmowy,
    );
    this.wystawcasSharedCollection = this.wystawcaService.addWystawcaToCollectionIfMissing<IWystawca>(
      this.wystawcasSharedCollection,
      ogloszenie.wystawca,
    );
    this.tagsSharedCollection = this.tagService.addTagToCollectionIfMissing<ITag>(this.tagsSharedCollection, ...(ogloszenie.tags ?? []));
  }

  protected loadRelationshipsOptions(): void {
    this.seniorityService
      .query({ filter: 'ogloszenie-is-null' })
      .pipe(map((res: HttpResponse<ISeniority[]>) => res.body ?? []))
      .pipe(
        map((seniorities: ISeniority[]) =>
          this.seniorityService.addSeniorityToCollectionIfMissing<ISeniority>(seniorities, this.ogloszenie?.seniority),
        ),
      )
      .subscribe((seniorities: ISeniority[]) => (this.senioritiesCollection = seniorities));

    this.typUmowyService
      .query({ filter: 'ogloszenie-is-null' })
      .pipe(map((res: HttpResponse<ITypUmowy[]>) => res.body ?? []))
      .pipe(
        map((typUmowies: ITypUmowy[]) =>
          this.typUmowyService.addTypUmowyToCollectionIfMissing<ITypUmowy>(typUmowies, this.ogloszenie?.typUmowy),
        ),
      )
      .subscribe((typUmowies: ITypUmowy[]) => (this.typUmowiesCollection = typUmowies));

    this.wystawcaService
      .query()
      .pipe(map((res: HttpResponse<IWystawca[]>) => res.body ?? []))
      .pipe(
        map((wystawcas: IWystawca[]) =>
          this.wystawcaService.addWystawcaToCollectionIfMissing<IWystawca>(wystawcas, this.ogloszenie?.wystawca),
        ),
      )
      .subscribe((wystawcas: IWystawca[]) => (this.wystawcasSharedCollection = wystawcas));

    this.tagService
      .query()
      .pipe(map((res: HttpResponse<ITag[]>) => res.body ?? []))
      .pipe(map((tags: ITag[]) => this.tagService.addTagToCollectionIfMissing<ITag>(tags, ...(this.ogloszenie?.tags ?? []))))
      .subscribe((tags: ITag[]) => (this.tagsSharedCollection = tags));
  }
}
