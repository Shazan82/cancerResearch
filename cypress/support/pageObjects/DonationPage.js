class DonationPage {

getOkButton(){

    return cy.get('#onetrust-accept-btn-handler')
}
getAmount(){

    return cy.get('#otherAmount')
}
getDonationType(){

    return cy.get('#typeRadioGroup')
}
getYourMotivation(){

    return cy.get('.sc-fKgJPI')
}
getYourDonationGoes(){

    return cy.get('#destinationRadioGroup0')
}
getYourTitle(){

    return cy.get("[name = 'title']")
}
getYourFirstName(){

    return cy.get("#forename")
}
getYourLastName(){

    return cy.get("#surname")
}
getYourEmail(){

    return cy.get("#emailAddress")
}
getYourPhoneNumber(){

    return cy.get("#phoneNumber")
}
getYourPostalCode(){

    return cy.get("#postalCode")
}
getSelectAddress(){

    return cy.get("#addressSelection")
}
getYourPaymentType(){

    return cy.get("#bt0")
}
getYourCardName(){

    return cy.get("#cardholderName")
}
}

export default DonationPage