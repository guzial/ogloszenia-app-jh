import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IWystawca } from '../wystawca.model';
import { WystawcaService } from '../service/wystawca.service';
import { WystawcaFormService, WystawcaFormGroup } from './wystawca-form.service';

@Component({
  standalone: true,
  selector: 'jhi-wystawca-update',
  templateUrl: './wystawca-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class WystawcaUpdateComponent implements OnInit {
  isSaving = false;
  wystawca: IWystawca | null = null;

  editForm: WystawcaFormGroup = this.wystawcaFormService.createWystawcaFormGroup();

  constructor(
    protected wystawcaService: WystawcaService,
    protected wystawcaFormService: WystawcaFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wystawca }) => {
      this.wystawca = wystawca;
      if (wystawca) {
        this.updateForm(wystawca);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const wystawca = this.wystawcaFormService.getWystawca(this.editForm);
    if (wystawca.id !== null) {
      this.subscribeToSaveResponse(this.wystawcaService.update(wystawca));
    } else {
      this.subscribeToSaveResponse(this.wystawcaService.create(wystawca));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWystawca>>): void {
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

  protected updateForm(wystawca: IWystawca): void {
    this.wystawca = wystawca;
    this.wystawcaFormService.resetForm(this.editForm, wystawca);
  }
}
