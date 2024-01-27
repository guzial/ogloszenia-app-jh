import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IGrupaTagow } from '../grupa-tagow.model';

@Component({
  standalone: true,
  selector: 'jhi-grupa-tagow-detail',
  templateUrl: './grupa-tagow-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class GrupaTagowDetailComponent {
  @Input() grupaTagow: IGrupaTagow | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
