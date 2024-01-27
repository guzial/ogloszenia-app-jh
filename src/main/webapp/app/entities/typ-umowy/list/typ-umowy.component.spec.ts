import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TypUmowyService } from '../service/typ-umowy.service';

import { TypUmowyComponent } from './typ-umowy.component';

describe('TypUmowy Management Component', () => {
  let comp: TypUmowyComponent;
  let fixture: ComponentFixture<TypUmowyComponent>;
  let service: TypUmowyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'typ-umowy', component: TypUmowyComponent }]),
        HttpClientTestingModule,
        TypUmowyComponent,
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
      .overrideTemplate(TypUmowyComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TypUmowyComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TypUmowyService);

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
    expect(comp.typUmowies?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to typUmowyService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTypUmowyIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getTypUmowyIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
