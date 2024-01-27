import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GrupaTagowService } from '../service/grupa-tagow.service';

import { GrupaTagowComponent } from './grupa-tagow.component';

describe('GrupaTagow Management Component', () => {
  let comp: GrupaTagowComponent;
  let fixture: ComponentFixture<GrupaTagowComponent>;
  let service: GrupaTagowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'grupa-tagow', component: GrupaTagowComponent }]),
        HttpClientTestingModule,
        GrupaTagowComponent,
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
      .overrideTemplate(GrupaTagowComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GrupaTagowComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(GrupaTagowService);

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
    expect(comp.grupaTagows?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to grupaTagowService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getGrupaTagowIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getGrupaTagowIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
