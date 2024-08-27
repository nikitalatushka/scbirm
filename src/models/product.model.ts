/* 
The purpose of this file is to enforce a structure on a model.
TypeScript has 2 ways to achieve this: 
    - type
        - use for non-composite properties
        - such as `type Direction = 'up' | 'down' | 'left' | 'right';`
    - interface
        - can be extended from/by classes
        - use when defining properties
^[1](https://stackoverflow.com/questions/35453630/creating-model-classes-in-typescript)
*/

// create model class for a product
export interface IProduct {
    ID: number;
    name: string;
    time: number;
    value: number;
    level: number;
    store_ID: number;
}


/* swagger.yaml
components:
    schemas:
        Product:
        type: object
        properties:
            ID:
                type: number
                example: 2001
            name:
                type: number 
                example: Nail
            time:
                type: number
                format: minutes
                example: 5
            value:
                type: number
                format: simeloneons
                example: 80
            level:
                type: number
                example: 1
            store:
                type: number
                example: 4001
*/