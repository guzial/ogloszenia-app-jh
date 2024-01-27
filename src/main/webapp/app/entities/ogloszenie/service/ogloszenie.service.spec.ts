import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOgloszenie } from '../ogloszenie.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../ogloszenie.test-samples';

import { OgloszenieService, RestOgloszenie } from './ogloszenie.service';

const requireRestSample: RestOgloszenie = {
  ...sampleWithRequiredData,
  dataPublikacji: sampleWithRequiredData.dataPublikacji?.toJSON(),
  dataWaznosci: sampleWithRequiredData.dataWaznosci?.toJSON(),
  startOd: sampleWithRequiredData.startOd?.toJSON(),
};

describe('Ogloszenie Service', () => {
  let service: OgloszenieService;
  let httpMock: HttpTestingController;
  let expectedResult: IOgloszenie | IOgloszenie[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OgloszenieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Ogloszenie', () => {
      const ogloszenie = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(ogloszenie).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Ogloszenie', () => {
      const ogloszenie = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(ogloszenie).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Ogloszenie', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Ogloszenie', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Ogloszenie', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addOgloszenieToCollectionIfMissing', () => {
      it('should add a Ogloszenie to an empty array', () => {
        const ogloszenie: IOgloszenie = sampleWithRequiredData;
        expectedResult = service.addOgloszenieToCollectionIfMissing([], ogloszenie);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ogloszenie);
      });

      it('should not add a Ogloszenie to an array that contains it', () => {
        const ogloszenie: IOgloszenie = sampleWithRequiredData;
        const ogloszenieCollection: IOgloszenie[] = [
          {
            ...ogloszenie,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addOgloszenieToCollectionIfMissing(ogloszenieCollection, ogloszenie);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Ogloszenie to an array that doesn't contain it", () => {
        const ogloszenie: IOgloszenie = sampleWithRequiredData;
        const ogloszenieCollection: IOgloszenie[] = [sampleWithPartialData];
        expectedResult = service.addOgloszenieToCollectionIfMissing(ogloszenieCollection, ogloszenie);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ogloszenie);
      });

      it('should add only unique Ogloszenie to an array', () => {
        const ogloszenieArray: IOgloszenie[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const ogloszenieCollection: IOgloszenie[] = [sampleWithRequiredData];
        expectedResult = service.addOgloszenieToCollectionIfMissing(ogloszenieCollection, ...ogloszenieArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const ogloszenie: IOgloszenie = sampleWithRequiredData;
        const ogloszenie2: IOgloszenie = sampleWithPartialData;
        expectedResult = service.addOgloszenieToCollectionIfMissing([], ogloszenie, ogloszenie2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ogloszenie);
        expect(expectedResult).toContain(ogloszenie2);
      });

      it('should accept null and undefined values', () => {
        const ogloszenie: IOgloszenie = sampleWithRequiredData;
        expectedResult = service.addOgloszenieToCollectionIfMissing([], null, ogloszenie, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ogloszenie);
      });

      it('should return initial array if no Ogloszenie is added', () => {
        const ogloszenieCollection: IOgloszenie[] = [sampleWithRequiredData];
        expectedResult = service.addOgloszenieToCollectionIfMissing(ogloszenieCollection, undefined, null);
        expect(expectedResult).toEqual(ogloszenieCollection);
      });
    });

    describe('compareOgloszenie', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareOgloszenie(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareOgloszenie(entity1, entity2);
        const compareResult2 = service.compareOgloszenie(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareOgloszenie(entity1, entity2);
        const compareResult2 = service.compareOgloszenie(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareOgloszenie(entity1, entity2);
        const compareResult2 = service.compareOgloszenie(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
