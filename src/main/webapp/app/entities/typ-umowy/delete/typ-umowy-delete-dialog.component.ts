import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITypUmowy } from '../typ-umowy.model';
import { TypUmowyService } from '../service/typ-umowy.service';

@Component({
  standalone: true,
  templateUrl: './typ-umowy-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TypUmowyDeleteDialogComponent {
  typUmowy?: ITypUmowy;

  constructor(
    protected typUmowyService: TypUmowyService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.typUmowyService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
