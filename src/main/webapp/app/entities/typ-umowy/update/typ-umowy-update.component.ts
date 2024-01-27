import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITypUmowy } from '../typ-umowy.model';
import { TypUmowyService } from '../service/typ-umowy.service';
import { TypUmowyFormService, TypUmowyFormGroup } from './typ-umowy-form.service';

@Component({
  standalone: true,
  selector: 'jhi-typ-umowy-update',
  templateUrl: './typ-umowy-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TypUmowyUpdateComponent implements OnInit {
  isSaving = false;
  typUmowy: ITypUmowy | null = null;

  editForm: TypUmowyFormGroup = this.typUmowyFormService.createTypUmowyFormGroup();

  constructor(
    protected typUmowyService: TypUmowyService,
    protected typUmowyFormService: TypUmowyFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typUmowy }) => {
      this.typUmowy = typUmowy;
      if (typUmowy) {
        this.updateForm(typUmowy);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const typUmowy = this.typUmowyFormService.getTypUmowy(this.editForm);
    if (typUmowy.id !== null) {
      this.subscribeToSaveResponse(this.typUmowyService.update(typUmowy));
    } else {
      this.subscribeToSaveResponse(this.typUmowyService.create(typUmowy));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypUmowy>>): void {
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

  protected updateForm(typUmowy: ITypUmowy): void {
    this.typUmowy = typUmowy;
    this.typUmowyFormService.resetForm(this.editForm, typUmowy);
  }
}
