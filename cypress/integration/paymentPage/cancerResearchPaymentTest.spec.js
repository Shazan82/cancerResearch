///<reference types = "cypress" />


import DonationPage from "../../support/pageObjects/DonationPage";


describe ('Cancer Research Payment Page', () => {

    var donationsPage = new DonationPage ();

    before (() => {

        cy.fixture('donorData').then((data) =>{

            globalThis.data=data;
        })
    })


    context ('Positive Scenario', () =>{

        it ('navigates to URL and completes payment', () =>{

            //cy.visit('https://app.pws.int.cruk.org/support-us/your-donation')
            cy.visit('/') // when using baseUrl as "https://app.pws.int.cruk.org/support-us/your-donation" cypress was not working as the url was rendering to an error page so had to remove everything after org
            cy.url().should('eq', 'https://app.pws.int.cruk.org/support-us/your-donation');

            donationsPage.getOkButton().click();
            donationsPage.getAmount().type(data.amount);
            donationsPage.getDonationType().find("[type= 'radio']").first().check({force:true}).should('be.checked')//.should('have.text', data.donationType)
            donationsPage.getYourMotivation().select(data.motivation).should("have.value", data.motivation)
            donationsPage.getYourDonationGoes().should("have.value", 'greatest')
            cy.get("button").contains("Continue").click()

            //Details Page
            donationsPage.getYourTitle().select(data.title).should("have.value", data.title)
            donationsPage.getYourFirstName().clear()
            donationsPage.getYourFirstName().type(data.firstname)
            donationsPage.getYourLastName().clear()
            donationsPage.getYourLastName().type(data.lastname)
            donationsPage.getYourEmail().clear()
            donationsPage.getYourEmail().type(data.email)
            donationsPage.getYourPhoneNumber().clear()
            donationsPage.getYourPhoneNumber().type(data.phone)
            donationsPage.getYourPostalCode().clear()
            donationsPage.getYourPostalCode().type(data.homeAddress.postcode)
            cy.get("button").contains("Find address").click()
            donationsPage.getSelectAddress().select(data.homeAddress.address1 + ", " + data.homeAddress.town + ", " + data.homeAddress.postcode)
            cy.get("[name = 'emailOptIn'][value = 'no']").check({force: true}).wait(5000)
            cy.get("button").contains("Continue").click()

            //payment page
            cy.get('#main > div:nth-child(3) > form > div:nth-child(1) > div > fieldset > div.PaymentToggle__PaymentOption-sc-1lx54at-3 > div').should('not.be.visible')
            donationsPage.getYourPaymentType().check({force:true}).should('exist').should('be.checked')
            cy.get('#main > div:nth-child(3) > form > div:nth-child(1) > div > fieldset > div.PaymentToggle__PaymentOption-sc-1lx54at-3 > div').should('be.visible')

            donationsPage.getYourCardName().clear()
            donationsPage.getYourCardName().type(data.title + " " + data.firstname + " " + data.lastname)       

            cy.getIframeBody('#braintree-hosted-field-number').within(() => {

                cy.get('#credit-card-number').type(data.cardNumber)
            })


            cy.getIframeBody('#braintree-hosted-field-expirationDate').within(() => {
                cy.get('#expiration').type(data.cardExpiry)

            })
            cy.getIframeBody('#braintree-hosted-field-cvv').within(() => {
                cy.get('#cvv').type(data.cardExpiry)

            })

            cy.get('#giftAid1').check({force: true})

            cy.get("button").contains("Complete my donation").click()    
        })
    })
})
