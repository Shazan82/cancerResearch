///<reference types = "cypress" />


import DonationPage from "../../support/pageObjects/DonationPage";


describe ('Cancer Research Payment Page', () => {

    var donationsPage = new DonationPage ();

    context ('Positive Scenario', () =>{

        it ('navigates to URL and completes payment', () =>{

            //cy.visit('https://app.pws.int.cruk.org/support-us/your-donation')
            cy.visit('/') // when using baseUrl as "https://app.pws.int.cruk.org/support-us/your-donation" cypress was not working as the url was rendering to an error page so had to remove everything after org
            cy.url().should('eq', 'https://app.pws.int.cruk.org/support-us/your-donation');

            donationsPage.getOkButton().click();




        })
    })
})
