describe('Авторизация пользователя', () => {
    it('Авторизует пользователя в сервисе', () => {
      cy.visit('https://getblock.io/login');
      cy.get('input[name="username"]').type('your_username');
      cy.get('input[name="password"]').type('your_password');
      cy.get('form').submit();
      cy.url().should('eq', 'https://getblock.io/dashboard');
      cy.get('.welcome-message').should('contain', 'Добро пожаловать, user');
  
      // Отправка запроса
      cy.request({
        method: 'GET',
        url: 'https://btc.getblock.io/rest/chaininfo.json',
        headers: {
          'x-api-key': '<API-KEY>'
        }
      }).then((response) => {
        // Проверка ответа узла
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('chain');
        expect(response.body).to.have.property('blocks');
      });
    });
  });
