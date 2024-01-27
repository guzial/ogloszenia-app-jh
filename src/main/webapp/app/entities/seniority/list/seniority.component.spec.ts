import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SeniorityService } from '../service/seniority.service';

import { SeniorityComponent } from './seniority.component';

describe('Seniority Management Component', () => {
  let comp: SeniorityComponent;
  let fixture: ComponentFixture<SeniorityComponent>;
  let service: SeniorityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'seniority', component: SeniorityComponent }]),
        HttpClientTestingModule,
        SeniorityComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              }),
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(SeniorityComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SeniorityComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SeniorityService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        }),
      ),
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.seniorities?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to seniorityService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getSeniorityIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getSeniorityIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
