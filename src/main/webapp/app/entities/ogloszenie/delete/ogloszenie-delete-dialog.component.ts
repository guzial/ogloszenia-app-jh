import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IOgloszenie } from '../ogloszenie.model';
import { OgloszenieService } from '../service/ogloszenie.service';

@Component({
  standalone: true,
  templateUrl: './ogloszenie-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class OgloszenieDeleteDialogComponent {
  ogloszenie?: IOgloszenie;

  constructor(
    protected ogloszenieService: OgloszenieService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ogloszenieService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
