/// <reference types="cypress" />
import Reusable from "../../support/reusable.js";
import HomePage from '../../support/pageObjects/homePage'

let reusable = new Reusable();

describe("First suite", () => {
  let env, url, fileData, homePageObj;
  before(() => {
    env = Cypress.env('env');
    url = Cypress.env(env).url
    cy.log(`env is ${env}`)
    let filepath = `${env}/test1.csv`
    cy.log('filepath is ' + filepath)
    cy.readCsv(filepath).then(data=>{
      fileData = data});
      homePageObj = new HomePage();
  });
  it("validate the homepage", () => {
    cy.visit("/");
    homePageObj.getLogo().should('have.text','conduit');
    homePageObj.getTags().each((el, index) => {
      if (el.text().match("test")) {
        homePageObj.getTags().eq(index).click();
      }
    });
    homePageObj.getSignInButton().click();
    cy.visit("/");
    homePageObj.getSignUpButton().click();
    cy.visit("/");
    homePageObj.getHomeButton().click();
    cy.log(`the reusable number is ${reusable.getRandomNumber(1, 100)}`);
    cy.log(`local date without any format is ${reusable.getCurrentDate()}`);
    cy.log(
      `utc date without any format is ${reusable.getCurrentDate("", "", true)}`
    );
    cy.log(
      `local date with format is ${reusable.getCurrentDate(
        "",
        "YYYY-MM-DDThh:mm:ssTZD"
      )}`
    );
    cy.log(
      `local date with format is ${reusable.getCurrentDate(
        "05/10/2020 10:20",
        "DD-MM-YYYYThh:mm:ssTZD"
      )}`
    );
    
  });
});
