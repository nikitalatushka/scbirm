import { describe } from 'node:test'
import { IProduct } from '../product.model'

// test create an object based on an interface file definition in TS
describe("given a typed object is declared with let and an interface", () => {
    let productA = {} as IProduct; // this type of declaration allows for undefined properties
    productA.ID = 2001;
    it("should return object properties", () => {
        expect(productA.ID).toBe(2001);
        expect(typeof productA.ID).toBe('number');
        expect(productA.name == undefined).toBe(true);
        expect(typeof productA).toBe('object');
        //https://stackoverflow.com/questions/62564800/how-to-assert-data-type-with-jest
            
    });
}); 
//https://bootcamp.uxdesign.cc/how-to-write-test-cases-in-typescript-fa7a263b7833

describe("given a typed object declared with constant and an interface", () => {
    const productB: IProduct = { // have to define all properties using this declaration
        ID: 2001,
        name: 'Nail',
        time: 5,
        value: 80,
        level: 1,
        store_ID: 4001,
    }
    it("should return object properties", () => {
        expect(productB.ID).toBe(2001);
        expect(typeof productB.ID).toBe('number');
        expect(productB.name == undefined).toBe(false);
        expect(typeof productB).toBe('object');
    });
});
