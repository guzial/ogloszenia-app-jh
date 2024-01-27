import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IWystawca } from '../wystawca.model';
import { WystawcaService } from '../service/wystawca.service';

@Component({
  standalone: true,
  templateUrl: './wystawca-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class WystawcaDeleteDialogComponent {
  wystawca?: IWystawca;

  constructor(
    protected wystawcaService: WystawcaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.wystawcaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
