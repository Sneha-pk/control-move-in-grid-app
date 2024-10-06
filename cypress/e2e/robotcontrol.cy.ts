describe("Robot Grid Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("robot initially at position (0, 0)", () => {
    cy.get('[ data-cy="grid-div"]').should("exist");
    cy.get('[data-cy^="grid-cell-"]').should("have.length", 25);

    cy.get('[data-cy="robot"]').should("exist");
  });

  it("robot moves forward in the direction facing", () => {
    cy.get('[data-cy="grid-position"]').click();
    cy.get('[data-cy="robot"]').should(
      "have.css",
      "transform",
      //   "matrix((0, -1, 1, 0, 0, 0)"
      "matrix(-1, 0, 0, -1, 0, 0)"
    );

    cy.get('[data-cy="grid-position"]').click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Cannot move further south!");
    });
  });

  it("robot moves towards east", () => {
    cy.get('[data-cy="direction-clock"]').click();
    cy.get('[data-cy="robot"]').should(
      "have.css",
      "transform",
      "matrix(0, 1, -1, 0, 0, 0)"
    );

    for (let i = 0; i < 5; i++) {
      cy.get('[data-cy="grid-position"]').click();
    }
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Cannot move further east!");
    });
  });

  it("robot moves towards west", () => {
    cy.get('[data-cy="direction-clock"]').click(); // Rotate to face east
    cy.get('[data-cy="direction-clock"]').click(); // Rotate to face east
    cy.get('[data-cy="direction-clock"]').click(); // Rotate to face east

    // Verify that the robot is now facing west
    cy.get('[data-cy="robot"]').should(
      "have.css",
      "transform",
      "matrix(0, -1, 1, 0, 0, 0)" // Correct matrix for west orientation
    );

    // Move the robot towards the west boundary
    for (let i = 0; i < 5; i++) {
      cy.get('[data-cy="grid-position"]').click();
    }

    // Assert that the robot can't move further west
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Cannot move further west!");
    });
  });

  it("robot facing south cannot move north", () => {
    // Rotate robot to face south (initially set to south, but for clarity in tests)
    cy.get('[data-cy="direction-clock"]').click(); // Rotate to east
    cy.get('[data-cy="direction-clock"]').click(); // Rotate to south
    cy.get('[data-cy="direction-clock"]').click(); // Rotate to south

    // Check the initial state of the robot
    cy.get('[data-cy="robot"]').should(
      "have.css",
      "transform",
      "matrix(0, -1, 1, 0, 0, 0)" // Correct matrix for south orientation
    );

    // Attempt to move upward (north)
    cy.get('[data-cy="grid-position"]').click();

    // Assert that the correct alert is shown
    cy.on("window:alert", (text) => {
      expect(text).to.contain("Cannot move further north!"); // Verify the alert message
    });
  });

  it("should rotate the robot anti-clockwise", () => {
    cy.get('[data-cy="direction-clock"]').click();
    cy.get('[data-cy="robot"]').should(
      "have.css",
      "transform",
      "matrix(0, 1, -1, 0, 0, 0)"
    );
  });

  it("should rotate the robot clockwise", () => {
    cy.get('[data-cy="direction-anti-clock"]').click();
    cy.get('[data-cy="robot"]').should(
      "have.css",
      "transform",
      "matrix(0, -1, 1, 0, 0, 0)"
    );
  });
});
