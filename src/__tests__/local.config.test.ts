import { describe } from 'node:test'
import * as local from '../config/local.config'

describe("given a port is declared using dotenv", () => {
    const port = local.default.port;
    it("should not be null", () => {
        expect(port == null).toBe(false);
    })
    it("should not be undefined", () => {
        expect(port == undefined).toBe(false);
    })
    it("should be type string", () => {
        expect(typeof port).toBe('string');
    })
})