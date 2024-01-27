import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { WystawcaService } from '../service/wystawca.service';

import { WystawcaComponent } from './wystawca.component';

describe('Wystawca Management Component', () => {
  let comp: WystawcaComponent;
  let fixture: ComponentFixture<WystawcaComponent>;
  let service: WystawcaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'wystawca', component: WystawcaComponent }]),
        HttpClientTestingModule,
        WystawcaComponent,
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
      .overrideTemplate(WystawcaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WystawcaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(WystawcaService);

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
    expect(comp.wystawcas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to wystawcaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getWystawcaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getWystawcaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
