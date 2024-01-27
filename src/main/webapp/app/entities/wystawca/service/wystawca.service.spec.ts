import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IWystawca } from '../wystawca.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../wystawca.test-samples';

import { WystawcaService } from './wystawca.service';

const requireRestSample: IWystawca = {
  ...sampleWithRequiredData,
};

describe('Wystawca Service', () => {
  let service: WystawcaService;
  let httpMock: HttpTestingController;
  let expectedResult: IWystawca | IWystawca[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(WystawcaService);
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

    it('should create a Wystawca', () => {
      const wystawca = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(wystawca).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Wystawca', () => {
      const wystawca = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(wystawca).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Wystawca', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Wystawca', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Wystawca', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addWystawcaToCollectionIfMissing', () => {
      it('should add a Wystawca to an empty array', () => {
        const wystawca: IWystawca = sampleWithRequiredData;
        expectedResult = service.addWystawcaToCollectionIfMissing([], wystawca);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(wystawca);
      });

      it('should not add a Wystawca to an array that contains it', () => {
        const wystawca: IWystawca = sampleWithRequiredData;
        const wystawcaCollection: IWystawca[] = [
          {
            ...wystawca,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addWystawcaToCollectionIfMissing(wystawcaCollection, wystawca);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Wystawca to an array that doesn't contain it", () => {
        const wystawca: IWystawca = sampleWithRequiredData;
        const wystawcaCollection: IWystawca[] = [sampleWithPartialData];
        expectedResult = service.addWystawcaToCollectionIfMissing(wystawcaCollection, wystawca);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(wystawca);
      });

      it('should add only unique Wystawca to an array', () => {
        const wystawcaArray: IWystawca[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const wystawcaCollection: IWystawca[] = [sampleWithRequiredData];
        expectedResult = service.addWystawcaToCollectionIfMissing(wystawcaCollection, ...wystawcaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const wystawca: IWystawca = sampleWithRequiredData;
        const wystawca2: IWystawca = sampleWithPartialData;
        expectedResult = service.addWystawcaToCollectionIfMissing([], wystawca, wystawca2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(wystawca);
        expect(expectedResult).toContain(wystawca2);
      });

      it('should accept null and undefined values', () => {
        const wystawca: IWystawca = sampleWithRequiredData;
        expectedResult = service.addWystawcaToCollectionIfMissing([], null, wystawca, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(wystawca);
      });

      it('should return initial array if no Wystawca is added', () => {
        const wystawcaCollection: IWystawca[] = [sampleWithRequiredData];
        expectedResult = service.addWystawcaToCollectionIfMissing(wystawcaCollection, undefined, null);
        expect(expectedResult).toEqual(wystawcaCollection);
      });
    });

    describe('compareWystawca', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareWystawca(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareWystawca(entity1, entity2);
        const compareResult2 = service.compareWystawca(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareWystawca(entity1, entity2);
        const compareResult2 = service.compareWystawca(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareWystawca(entity1, entity2);
        const compareResult2 = service.compareWystawca(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
