import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Ogloszenie e2e test', () => {
  const ogloszeniePageUrl = '/ogloszenie';
  const ogloszeniePageUrlPattern = new RegExp('/ogloszenie(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const ogloszenieSample = {};

  let ogloszenie;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/ogloszenies+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/ogloszenies').as('postEntityRequest');
    cy.intercept('DELETE', '/api/ogloszenies/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (ogloszenie) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/ogloszenies/${ogloszenie.id}`,
      }).then(() => {
        ogloszenie = undefined;
      });
    }
  });

  it('Ogloszenies menu should load Ogloszenies page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('ogloszenie');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Ogloszenie').should('exist');
    cy.url().should('match', ogloszeniePageUrlPattern);
  });

  describe('Ogloszenie page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(ogloszeniePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Ogloszenie page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/ogloszenie/new$'));
        cy.getEntityCreateUpdateHeading('Ogloszenie');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ogloszeniePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/ogloszenies',
          body: ogloszenieSample,
        }).then(({ body }) => {
          ogloszenie = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/ogloszenies+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/ogloszenies?page=0&size=20>; rel="last",<http://localhost/api/ogloszenies?page=0&size=20>; rel="first"',
              },
              body: [ogloszenie],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(ogloszeniePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Ogloszenie page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('ogloszenie');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ogloszeniePageUrlPattern);
      });

      it('edit button click should load edit Ogloszenie page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Ogloszenie');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ogloszeniePageUrlPattern);
      });

      it('edit button click should load edit Ogloszenie page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Ogloszenie');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ogloszeniePageUrlPattern);
      });

      it('last delete button click should delete instance of Ogloszenie', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('ogloszenie').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ogloszeniePageUrlPattern);

        ogloszenie = undefined;
      });
    });
  });

  describe('new Ogloszenie page', () => {
    beforeEach(() => {
      cy.visit(`${ogloszeniePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Ogloszenie');
    });

    it('should create an instance of Ogloszenie', () => {
      cy.get(`[data-cy="tytul"]`).type('so');
      cy.get(`[data-cy="tytul"]`).should('have.value', 'so');

      cy.get(`[data-cy="opis"]`).type('blue');
      cy.get(`[data-cy="opis"]`).should('have.value', 'blue');

      cy.get(`[data-cy="dataPublikacji"]`).type('2024-01-26T20:58');
      cy.get(`[data-cy="dataPublikacji"]`).blur();
      cy.get(`[data-cy="dataPublikacji"]`).should('have.value', '2024-01-26T20:58');

      cy.get(`[data-cy="dataWaznosci"]`).type('2024-01-27T09:41');
      cy.get(`[data-cy="dataWaznosci"]`).blur();
      cy.get(`[data-cy="dataWaznosci"]`).should('have.value', '2024-01-27T09:41');

      cy.get(`[data-cy="startOd"]`).type('2024-01-27T18:00');
      cy.get(`[data-cy="startOd"]`).blur();
      cy.get(`[data-cy="startOd"]`).should('have.value', '2024-01-27T18:00');

      cy.get(`[data-cy="czyWidelki"]`).should('not.be.checked');
      cy.get(`[data-cy="czyWidelki"]`).click();
      cy.get(`[data-cy="czyWidelki"]`).should('be.checked');

      cy.get(`[data-cy="widelkiMin"]`).type('2308.43');
      cy.get(`[data-cy="widelkiMin"]`).should('have.value', '2308.43');

      cy.get(`[data-cy="widelkiMax"]`).type('23087.59');
      cy.get(`[data-cy="widelkiMax"]`).should('have.value', '23087.59');

      cy.get(`[data-cy="aktywne"]`).should('not.be.checked');
      cy.get(`[data-cy="aktywne"]`).click();
      cy.get(`[data-cy="aktywne"]`).should('be.checked');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        ogloszenie = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', ogloszeniePageUrlPattern);
    });
  });
});
