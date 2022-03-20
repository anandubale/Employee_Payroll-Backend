const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const response = require('express');

const app = require('../server');

//test cases for registers

    describe(`POST /users`, () => {                  //pas

      it('should register user.1', (done) => {

        const obj1 = {
          firstName : "Anand",
          lastName : "Ubale",
          emailID : "anandubale101@gmail.com",
          password : "1234567890"
        };

        request(app)
          .post('/register')
          .send(obj1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            done();
          });
      });


      it('Already registered user', (done) => {

        const obj1 = {
          firstName : "Anand",
          lastName : "Ubale",
          emailID : "anandubale101@gmail.com",
          password : "1234567890"
        };

        request(app)
          .post('/register')
          .send(obj1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            done();
          });
      });


      it('A)firstName is wrong', (done) => {

        const obj1 = {
          firstName : "A",
          lastName : "Ubale",
          emailID : "anandubale102@gmail.com",
          password : "1234567890"
        };

        request(app)
          .post('/register')
          .send(obj1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            done();
          });
      });

      it('B)lastName is wrong', (done) => {

        const obj1 = {
          firstName : "Anand",
          lastName : "U",
          emailID : "anandubale103@gmail.com",
          password : "1234567890"
        };

        request(app)
        .post('/register')
        .send(obj1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            done();
          });
      });

      it('C)emailID is wrong', (done) => {

        const obj1 = {
          firstName : "Anand",
          lastName : "Ubale",
          emailID : " ",
          password : "1234567890"
        };

        request(app)
        .post('/register')
        .send(obj1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            done();
          });
      });

      
      it('D)password is short wrong', (done) => {

        const obj1 = {
          firstName : "A",
          lastName : "Ubale",
          emailID : "anandubale104@gmail.com",
          password : "12345678"
        };

        request(app)
        .post('/register')
        .send(obj1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            done();
          });
      });
    });



   // login : 

    describe(`POST/login`, () => {
        it('shoud pass for login', (done) => {
          const obj2 = {
            emailID : "anandubale101@gmail.com",
            password : "1234567890"
          };

          request(app)
            .post('/login')
            .send(obj2)
            .end((err, res) => {
              expect(res.statusCode).to.equal(200);
              done();
            });
        });
    });


      describe(`POST/login`, () => {
        it('password is incorrect', (done) => {
          const obj2 = {
        
            emailID : "anandubale101@gmail.com",
            password : "1234567891"
          };

          request(app)
          .post('/login')
          .send(obj2)
            .end((err, res) => {
              expect(res.statusCode).to.equal(200);
              done();
            });
        });
      });

      describe(`POST/login`, () => {
        it('EMailID is not in database', (done) => {
          const obj2 = {
        
            emailID : "anandubale101@gmail.com",
            password : "1234567891"
          };

          request(app)
          .post('/login')
          .send(obj2)
            .end((err, res) => {
              expect(res.statusCode).to.equal(200);
              done();
            });
        });
      });
