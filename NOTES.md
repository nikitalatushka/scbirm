# Vocab
- variable 
- constant - a value that cannot change during the execution of the function or procedure.
- interface
- type
- class
- default - a value that is used when no value is passed to the procedure or function.
- controller - crud logic
- handler 
- crud

# Interface vs. Type
The purpose of this file is to enforce a structure on a model.
TypeScript has 2 ways to achieve this: 
    - type
        - use for non-composite properties
        - such as `type Direction = 'up' | 'down' | 'left' | 'right';`
    - interface
        - can be extended from/by classes
        - use when defining properties
^[1](https://stackoverflow.com/questions/35453630/creating-model-classes-in-typescript)
  

  > [Best practices for REST API design](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)