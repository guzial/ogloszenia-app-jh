import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
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

  usersSharedCollection: IUser[] = [];

  editForm: WystawcaFormGroup = this.wystawcaFormService.createWystawcaFormGroup();

  constructor(
    protected wystawcaService: WystawcaService,
    protected wystawcaFormService: WystawcaFormService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wystawca }) => {
      this.wystawca = wystawca;
      if (wystawca) {
        this.updateForm(wystawca);
      }

      this.loadRelationshipsOptions();
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

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, wystawca.user);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.wystawca?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
