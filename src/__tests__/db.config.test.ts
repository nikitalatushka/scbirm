import { describe } from 'node:test'
import * as db from '../config/db.config'

describe('given properties are declared individually', () => {
    const db_host = db.host;
    const db_port = db.port;
    const db_user = db.user;
    const db_pwd = db.pwd;
    const db_name = db.name;
    it('should not have null properties', () => {
        expect(db_host == null).toBe(false)
        expect(db_port == null).toBe(false)
        expect(db_user == null).toBe(false)
        expect(db_pwd == null).toBe(false)
        expect(db_name == null).toBe(false)
    });
});

describe('given properties are defined as an object', () => {
    const db_config = {
        host: db.host,
        port: db.port,
        user: db.user,
        pwd: db.pwd,
        name: db.name,
    }
    it('should not have null properties', () => {
        expect(db_config.host == null).toBe(false)
        expect(db_config.port == null).toBe(false)
        expect(db_config.user == null).toBe(false)
        expect(db_config.pwd == null).toBe(false)
        expect(db_config.name == null).toBe(false)
    });
})