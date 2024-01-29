import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGrupaTagow } from 'app/entities/grupa-tagow/grupa-tagow.model';
import { GrupaTagowService } from 'app/entities/grupa-tagow/service/grupa-tagow.service';
import { ITag } from '../tag.model';
import { TagService } from '../service/tag.service';
import { TagFormService, TagFormGroup } from './tag-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tag-update',
  templateUrl: './tag-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TagUpdateComponent implements OnInit {
  isSaving = false;
  tag: ITag | null = null;

  grupaTagowsCollection: IGrupaTagow[] = [];

  editForm: TagFormGroup = this.tagFormService.createTagFormGroup();

  constructor(
    protected tagService: TagService,
    protected tagFormService: TagFormService,
    protected grupaTagowService: GrupaTagowService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareGrupaTagow = (o1: IGrupaTagow | null, o2: IGrupaTagow | null): boolean => this.grupaTagowService.compareGrupaTagow(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tag }) => {
      this.tag = tag;
      if (tag) {
        this.updateForm(tag);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tag = this.tagFormService.getTag(this.editForm);
    if (tag.id !== null) {
      this.subscribeToSaveResponse(this.tagService.update(tag));
    } else {
      this.subscribeToSaveResponse(this.tagService.create(tag));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITag>>): void {
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

  protected updateForm(tag: ITag): void {
    this.tag = tag;
    this.tagFormService.resetForm(this.editForm, tag);

    this.grupaTagowsCollection = this.grupaTagowService.addGrupaTagowToCollectionIfMissing<IGrupaTagow>(
      this.grupaTagowsCollection,
      tag.grupaTagow,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.grupaTagowService
      .query({ filter: 'tag-is-null' })
      .pipe(map((res: HttpResponse<IGrupaTagow[]>) => res.body ?? []))
      .pipe(
        map((grupaTagows: IGrupaTagow[]) =>
          this.grupaTagowService.addGrupaTagowToCollectionIfMissing<IGrupaTagow>(grupaTagows, this.tag?.grupaTagow),
        ),
      )
      .subscribe((grupaTagows: IGrupaTagow[]) => (this.grupaTagowsCollection = grupaTagows));
  }
}
