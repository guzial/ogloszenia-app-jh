import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGrupaTagow } from '../grupa-tagow.model';
import { GrupaTagowService } from '../service/grupa-tagow.service';
import { GrupaTagowFormService, GrupaTagowFormGroup } from './grupa-tagow-form.service';

@Component({
  standalone: true,
  selector: 'jhi-grupa-tagow-update',
  templateUrl: './grupa-tagow-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class GrupaTagowUpdateComponent implements OnInit {
  isSaving = false;
  grupaTagow: IGrupaTagow | null = null;

  editForm: GrupaTagowFormGroup = this.grupaTagowFormService.createGrupaTagowFormGroup();

  constructor(
    protected grupaTagowService: GrupaTagowService,
    protected grupaTagowFormService: GrupaTagowFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grupaTagow }) => {
      this.grupaTagow = grupaTagow;
      if (grupaTagow) {
        this.updateForm(grupaTagow);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const grupaTagow = this.grupaTagowFormService.getGrupaTagow(this.editForm);
    if (grupaTagow.id !== null) {
      this.subscribeToSaveResponse(this.grupaTagowService.update(grupaTagow));
    } else {
      this.subscribeToSaveResponse(this.grupaTagowService.create(grupaTagow));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrupaTagow>>): void {
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

  protected updateForm(grupaTagow: IGrupaTagow): void {
    this.grupaTagow = grupaTagow;
    this.grupaTagowFormService.resetForm(this.editForm, grupaTagow);
  }
}
