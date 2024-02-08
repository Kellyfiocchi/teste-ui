/// <reference types="cypress" />
import "cypress-xpath";

describe("Funcionalidade: Login", () => {
  it("Deve fazer login com sucesso", () => {
    cy.visit("http://lojaebac.ebaconline.art.br/minha-conta/");
    cy.get('input[type="text"].input-text.form-control[name="username"]').type(
      "kelly.teste@teste.com"
    );
    cy.get("#password").type("teste@teste");
    cy.get('input[type="submit"].button[name="login"]').click();
    cy.xpath("//span[contains(text(), 'Welcome kelly.teste')]").should(
      "be.visible"
    );
  });

  it("Deve exibir uma mensagem de erro quando inserir usuário inválido   ", () => {
    cy.visit("http://lojaebac.ebaconline.art.br/minha-conta/");
    cy.get('input[type="text"].input-text.form-control[name="username"]').type(
      "ly.teste@teste.com"
    );
    cy.get("#password").type("suaSenhaAqui");
    cy.get('input[type="submit"].button[name="login"]').click();
    //cy.xpath(
    //  '//li[contains(text(), "Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.")]'
    // ).should("be.visible");
    cy.xpath(
      '//li[contains(text(), "Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.")]'
    ).should("exist");
  });

  it.only("Deve exibir uma mensagem de erro quando inserir senha inválida", () => {
    cy.visit("http://lojaebac.ebaconline.art.br/minha-conta/");
    cy.get('input[type="text"].input-text.form-control[name="username"]').type(
      "kelly.teste@teste.com"
    );
    cy.get("#password").type("suaSenhaAqui");
    cy.get('input[type="submit"].button[name="login"]').click();
    cy.contains(
      "li",
      "Erro: A senha fornecida para o e-mail kelly.teste@teste.com está incorreta."
    ).should("exist");
    cy.contains(
      "li",
      "Erro: A senha fornecida para o e-mail kelly.teste@teste.com está incorreta."
    )
      .should("be.visible")
      .should("contain", "Erro");
  });
});
