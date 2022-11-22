describe('all api tests',()=>{

  Cypress.config('baseUrl','https://reqres.in/api')
  it('get 1',()=>{
      cy.request('/users?page=2')
          .then((response)=>{
              expect(response).to.have.property('status',200)
              expect(response.status).to.equal(200)
              expect(response.body).not.to.be.null;
              expect(response.body).to.have.property('page',2)
              expect(response.body.data).to.have.length(6)
          })
  })

  it('get 2',()=>{
      cy.request('/users?page=2').as('user_list')
      cy.get('@user_list')
          .should((response)=>{
              expect(response).to.have.property('status',200)
              expect(response.status).to.equal(200)
              expect(response.body).not.to.be.null;
              expect(response.body).to.have.property('page',2)
              expect(response.body.data).to.have.length(6)
          })
  })

  it('Get 3',()=>{
      cy.request({
          'method':'GET',
          'url': '/users?page=2',

          Headers:{
              'Content-Type':'application/json',
          },
          auth:{
              'username':'user1',
              'password':'pass1'
          }
      }).then((response)=>{
          expect(response).to.have.property('status',200)
          expect(response.status).to.equal(200)
          expect(response.body).not.to.be.null;
          expect(response.body).to.have.property('page',2)
          expect(response.body.data).to.have.length(6)
      })
  })

  it('POST 1',()=>{
      cy.request({
          'method':'POST',
          'url':'/users',
          body:{
              "name": "MOHD SOHAIL ALI",
              "job": "ASE- TRAINEE"
          }
      }).then((response)=>{
          expect(response).to.have.property('status',201)
          expect(response.status).to.equal(201)
          expect(response.body).not.to.be.null;
          expect(response.body).to.have.property('name','MOHD SOHAIL ALI')
      })
  })

  it('POST 2',()=>{

      const reqbody={
          'name':'Mohandas Ragendra',
          'job':'Team leader LGB'
      }

      cy.request('POST','/users',reqbody)
          .then((response)=>{
          expect(response).to.have.property('status',201)
          expect(response.status).to.equal(201)
          expect(response.body).not.to.be.null;
          expect(response.body).to.have.property('name','Mohandas Ragendra')
      })
  })

  it('PUT ',()=>{
      cy.request({
          'method':'PUT',
          'url':'/users/2',
          body:{
              "name": 'Mohd Sohail Ali',
              "job": "ASE-TRAINEE"
          }
      }).then((response)=>{
          expect(response).to.have.property('status',200)
          expect(response.status).to.equal(200)
          expect(response.body).not.to.be.null;
          expect(response.body).to.have.property('name','Mohd Sohail Ali')
      })
  })

  it('DELETE ',()=>{
      cy.request({
          'method':'DELETE',
          'url':'/users/2',
      }).then((response)=>{
          expect(response.status).to.be.equal(204)
      })
  })
})