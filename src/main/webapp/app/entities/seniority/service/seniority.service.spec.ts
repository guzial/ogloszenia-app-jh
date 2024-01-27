import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISeniority } from '../seniority.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../seniority.test-samples';

import { SeniorityService } from './seniority.service';

const requireRestSample: ISeniority = {
  ...sampleWithRequiredData,
};

describe('Seniority Service', () => {
  let service: SeniorityService;
  let httpMock: HttpTestingController;
  let expectedResult: ISeniority | ISeniority[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SeniorityService);
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

    it('should create a Seniority', () => {
      const seniority = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(seniority).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Seniority', () => {
      const seniority = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(seniority).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Seniority', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Seniority', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Seniority', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSeniorityToCollectionIfMissing', () => {
      it('should add a Seniority to an empty array', () => {
        const seniority: ISeniority = sampleWithRequiredData;
        expectedResult = service.addSeniorityToCollectionIfMissing([], seniority);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(seniority);
      });

      it('should not add a Seniority to an array that contains it', () => {
        const seniority: ISeniority = sampleWithRequiredData;
        const seniorityCollection: ISeniority[] = [
          {
            ...seniority,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSeniorityToCollectionIfMissing(seniorityCollection, seniority);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Seniority to an array that doesn't contain it", () => {
        const seniority: ISeniority = sampleWithRequiredData;
        const seniorityCollection: ISeniority[] = [sampleWithPartialData];
        expectedResult = service.addSeniorityToCollectionIfMissing(seniorityCollection, seniority);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(seniority);
      });

      it('should add only unique Seniority to an array', () => {
        const seniorityArray: ISeniority[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const seniorityCollection: ISeniority[] = [sampleWithRequiredData];
        expectedResult = service.addSeniorityToCollectionIfMissing(seniorityCollection, ...seniorityArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const seniority: ISeniority = sampleWithRequiredData;
        const seniority2: ISeniority = sampleWithPartialData;
        expectedResult = service.addSeniorityToCollectionIfMissing([], seniority, seniority2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(seniority);
        expect(expectedResult).toContain(seniority2);
      });

      it('should accept null and undefined values', () => {
        const seniority: ISeniority = sampleWithRequiredData;
        expectedResult = service.addSeniorityToCollectionIfMissing([], null, seniority, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(seniority);
      });

      it('should return initial array if no Seniority is added', () => {
        const seniorityCollection: ISeniority[] = [sampleWithRequiredData];
        expectedResult = service.addSeniorityToCollectionIfMissing(seniorityCollection, undefined, null);
        expect(expectedResult).toEqual(seniorityCollection);
      });
    });

    describe('compareSeniority', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSeniority(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSeniority(entity1, entity2);
        const compareResult2 = service.compareSeniority(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSeniority(entity1, entity2);
        const compareResult2 = service.compareSeniority(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSeniority(entity1, entity2);
        const compareResult2 = service.compareSeniority(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
