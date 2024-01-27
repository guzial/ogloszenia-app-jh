import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IGrupaTagow } from '../grupa-tagow.model';
import { GrupaTagowService } from '../service/grupa-tagow.service';

@Component({
  standalone: true,
  templateUrl: './grupa-tagow-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class GrupaTagowDeleteDialogComponent {
  grupaTagow?: IGrupaTagow;

  constructor(
    protected grupaTagowService: GrupaTagowService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.grupaTagowService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
