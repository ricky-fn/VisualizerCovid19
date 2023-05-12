describe("Test index page functionality", () => {
  beforeEach(() => {
    cy.intercept("GET", "dev/api", { fixture: "api.json", delay: 1000 }).as(
      "loading",
    );

    cy.visit("/");
  });

  it("should display the spinner before finishing the api request", () => {
    cy.get("[data-cy='loader']").should("be.visible");

    cy.wait(["@loading"]);

    cy.get("[data-cy='loader']").should("not.visible");
  });

  describe("test the mandatory components", () => {
    it("should render the spark component", () => {
      cy.get("[data-cy='spark']").find("canvas").should("be.visible");
    });

    it("should render the ranking component", () => {
      cy.get("[data-cy='ranking']")
        .find(".ranking__container")
        .should("be.visible");
    });

    it("should render the button component", () => {
      cy.get("[data-cy='button_click_more']").should("be.visible");
    });

    it("should render the chart component", () => {
      cy.get("[data-cy='chart']").should(($el) => {
        expect($el.children()).to.have.length(1);
      });
    });
  });

  describe("test the overlay", () => {
    beforeEach(() => {
      cy.wait("@loading");
      cy.get("[data-cy='ranking'] .country:first-child").as("ranking_item");
      cy.get("@ranking_item").click();
    });

    it("should display the overlay after clicking the an item from the ranking list", () => {
      cy.get(".tooltip-animation").should("have.attr", "opacity", "1");
    });

    it("should set the correct flag image", () => {
      let flagSrc = "";

      cy.get("@ranking_item")
        .find(".country-flag")
        .should("have.attr", "style")
        .then((value) => {
          flagSrc = value.match(/url\((.*[^\)])/)[1];
        });

      cy.get(".tooltip-animation")
        .find(".country-flag")
        .then((dom) => {
          expect(dom.css("background-image")).to.contain(flagSrc);
        });
    });
  });

  describe("test the 'more information' popup", () => {
    beforeEach(() => {
      cy.get("[data-cy='button_click_more']").click();
    });
    it("should display the popup after clicking the button", () => {
      cy.get("[data-cy='more_information_popup']").should("be.visible");
    });

    it("should hide the popup after clicking the button", () => {
      cy.get("[data-cy='popup_close']").click();

      cy.get("[data-cy='more_information_popup']").should("not.visible");
    });
  });
});
