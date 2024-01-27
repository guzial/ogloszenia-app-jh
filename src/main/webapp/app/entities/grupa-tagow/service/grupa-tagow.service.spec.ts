import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IGrupaTagow } from '../grupa-tagow.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../grupa-tagow.test-samples';

import { GrupaTagowService } from './grupa-tagow.service';

const requireRestSample: IGrupaTagow = {
  ...sampleWithRequiredData,
};

describe('GrupaTagow Service', () => {
  let service: GrupaTagowService;
  let httpMock: HttpTestingController;
  let expectedResult: IGrupaTagow | IGrupaTagow[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GrupaTagowService);
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

    it('should create a GrupaTagow', () => {
      const grupaTagow = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(grupaTagow).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a GrupaTagow', () => {
      const grupaTagow = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(grupaTagow).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a GrupaTagow', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of GrupaTagow', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a GrupaTagow', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addGrupaTagowToCollectionIfMissing', () => {
      it('should add a GrupaTagow to an empty array', () => {
        const grupaTagow: IGrupaTagow = sampleWithRequiredData;
        expectedResult = service.addGrupaTagowToCollectionIfMissing([], grupaTagow);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grupaTagow);
      });

      it('should not add a GrupaTagow to an array that contains it', () => {
        const grupaTagow: IGrupaTagow = sampleWithRequiredData;
        const grupaTagowCollection: IGrupaTagow[] = [
          {
            ...grupaTagow,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addGrupaTagowToCollectionIfMissing(grupaTagowCollection, grupaTagow);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a GrupaTagow to an array that doesn't contain it", () => {
        const grupaTagow: IGrupaTagow = sampleWithRequiredData;
        const grupaTagowCollection: IGrupaTagow[] = [sampleWithPartialData];
        expectedResult = service.addGrupaTagowToCollectionIfMissing(grupaTagowCollection, grupaTagow);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grupaTagow);
      });

      it('should add only unique GrupaTagow to an array', () => {
        const grupaTagowArray: IGrupaTagow[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const grupaTagowCollection: IGrupaTagow[] = [sampleWithRequiredData];
        expectedResult = service.addGrupaTagowToCollectionIfMissing(grupaTagowCollection, ...grupaTagowArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const grupaTagow: IGrupaTagow = sampleWithRequiredData;
        const grupaTagow2: IGrupaTagow = sampleWithPartialData;
        expectedResult = service.addGrupaTagowToCollectionIfMissing([], grupaTagow, grupaTagow2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grupaTagow);
        expect(expectedResult).toContain(grupaTagow2);
      });

      it('should accept null and undefined values', () => {
        const grupaTagow: IGrupaTagow = sampleWithRequiredData;
        expectedResult = service.addGrupaTagowToCollectionIfMissing([], null, grupaTagow, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grupaTagow);
      });

      it('should return initial array if no GrupaTagow is added', () => {
        const grupaTagowCollection: IGrupaTagow[] = [sampleWithRequiredData];
        expectedResult = service.addGrupaTagowToCollectionIfMissing(grupaTagowCollection, undefined, null);
        expect(expectedResult).toEqual(grupaTagowCollection);
      });
    });

    describe('compareGrupaTagow', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareGrupaTagow(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareGrupaTagow(entity1, entity2);
        const compareResult2 = service.compareGrupaTagow(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareGrupaTagow(entity1, entity2);
        const compareResult2 = service.compareGrupaTagow(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareGrupaTagow(entity1, entity2);
        const compareResult2 = service.compareGrupaTagow(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
