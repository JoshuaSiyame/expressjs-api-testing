// import modules/packages
const request = require("supertest");
const assert = require("assert");
const mocha = require("mocha");
const chai = require("chai");
const app = require("../server");

const expect = chai.expect;

// endpoints and tests
describe("Testing the app endpoints", () => {
    it("Returns a plain text response from testing endpoint", () => {
        request(app)
            .get("/test")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.error(err);
                }
            });
    });

    it("Returns a json array data of birds details", ()=>{
        request(app)
            .get("/birds")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res)=>{
                if(err){
                    console.error(err);
                };
            });
    });

    it("Returns a json data of bird detail", ()=>{
        request(app)
            // for the id get any valid id and add it here below
            .get("/bird/648d7b8d4a3873a93d6fe35a")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res)=>{
                if(err){
                    console.error(err);
                };
            });
    });

    it("Creates a new bird data in the database", ()=>{
        request(app)
            .post("/new-bird")
            .send({ name: "kuku", family: "kukuliae", lifeSpan: 8 })
            .set("Accept", "application/json")
            .expect(201)
            .end((err, res)=>{
                if(err){
                    console.error(err);
                };
            });
    });

    it("Updates a bird data in the database", ()=>{
        request(app)
            .put("/bird/648d7e8ac1c3aec58341bb9e")
            .send({ name: "batamaji", family: "kukuliae", lifeSpan: 8 })
            .set("Accept", "application/json")
            .expect(200)
            .end((err, res)=>{
                if(err){
                    console.error(err);
                };
            });
    });

    it("Deletes a bird from the database", ()=>{
        request(app)
            .delete("/bird/648d7e8ac1c3aec58341bb9e")
            .expect(200)
            .end((err, res)=>{
                if(err){
                    console.error(err);
                };
            });
    });

});
