import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISeniority } from '../seniority.model';
import { SeniorityService } from '../service/seniority.service';
import { SeniorityFormService, SeniorityFormGroup } from './seniority-form.service';

@Component({
  standalone: true,
  selector: 'jhi-seniority-update',
  templateUrl: './seniority-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SeniorityUpdateComponent implements OnInit {
  isSaving = false;
  seniority: ISeniority | null = null;

  editForm: SeniorityFormGroup = this.seniorityFormService.createSeniorityFormGroup();

  constructor(
    protected seniorityService: SeniorityService,
    protected seniorityFormService: SeniorityFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ seniority }) => {
      this.seniority = seniority;
      if (seniority) {
        this.updateForm(seniority);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const seniority = this.seniorityFormService.getSeniority(this.editForm);
    if (seniority.id !== null) {
      this.subscribeToSaveResponse(this.seniorityService.update(seniority));
    } else {
      this.subscribeToSaveResponse(this.seniorityService.create(seniority));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISeniority>>): void {
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

  protected updateForm(seniority: ISeniority): void {
    this.seniority = seniority;
    this.seniorityFormService.resetForm(this.editForm, seniority);
  }
}
