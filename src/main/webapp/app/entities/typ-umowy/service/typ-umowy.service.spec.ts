import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITypUmowy } from '../typ-umowy.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../typ-umowy.test-samples';

import { TypUmowyService } from './typ-umowy.service';

const requireRestSample: ITypUmowy = {
  ...sampleWithRequiredData,
};

describe('TypUmowy Service', () => {
  let service: TypUmowyService;
  let httpMock: HttpTestingController;
  let expectedResult: ITypUmowy | ITypUmowy[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TypUmowyService);
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

    it('should create a TypUmowy', () => {
      const typUmowy = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(typUmowy).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TypUmowy', () => {
      const typUmowy = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(typUmowy).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TypUmowy', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TypUmowy', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TypUmowy', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTypUmowyToCollectionIfMissing', () => {
      it('should add a TypUmowy to an empty array', () => {
        const typUmowy: ITypUmowy = sampleWithRequiredData;
        expectedResult = service.addTypUmowyToCollectionIfMissing([], typUmowy);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(typUmowy);
      });

      it('should not add a TypUmowy to an array that contains it', () => {
        const typUmowy: ITypUmowy = sampleWithRequiredData;
        const typUmowyCollection: ITypUmowy[] = [
          {
            ...typUmowy,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTypUmowyToCollectionIfMissing(typUmowyCollection, typUmowy);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TypUmowy to an array that doesn't contain it", () => {
        const typUmowy: ITypUmowy = sampleWithRequiredData;
        const typUmowyCollection: ITypUmowy[] = [sampleWithPartialData];
        expectedResult = service.addTypUmowyToCollectionIfMissing(typUmowyCollection, typUmowy);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(typUmowy);
      });

      it('should add only unique TypUmowy to an array', () => {
        const typUmowyArray: ITypUmowy[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const typUmowyCollection: ITypUmowy[] = [sampleWithRequiredData];
        expectedResult = service.addTypUmowyToCollectionIfMissing(typUmowyCollection, ...typUmowyArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const typUmowy: ITypUmowy = sampleWithRequiredData;
        const typUmowy2: ITypUmowy = sampleWithPartialData;
        expectedResult = service.addTypUmowyToCollectionIfMissing([], typUmowy, typUmowy2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(typUmowy);
        expect(expectedResult).toContain(typUmowy2);
      });

      it('should accept null and undefined values', () => {
        const typUmowy: ITypUmowy = sampleWithRequiredData;
        expectedResult = service.addTypUmowyToCollectionIfMissing([], null, typUmowy, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(typUmowy);
      });

      it('should return initial array if no TypUmowy is added', () => {
        const typUmowyCollection: ITypUmowy[] = [sampleWithRequiredData];
        expectedResult = service.addTypUmowyToCollectionIfMissing(typUmowyCollection, undefined, null);
        expect(expectedResult).toEqual(typUmowyCollection);
      });
    });

    describe('compareTypUmowy', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTypUmowy(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTypUmowy(entity1, entity2);
        const compareResult2 = service.compareTypUmowy(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTypUmowy(entity1, entity2);
        const compareResult2 = service.compareTypUmowy(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTypUmowy(entity1, entity2);
        const compareResult2 = service.compareTypUmowy(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
