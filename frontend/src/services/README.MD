## Services
1. **Modular Structure**: Each entity (e.g., material, product, store) has its own directory, and related service files are grouped within that directory. This keeps the codebase organized and makes it easy to locate and manage specific API calls.
2. **Reusable API Instance**: Each service file imports the centralized api instance from api.ts, ensuring consistent configuration across all API calls.
3. **TypeScript Types**: The response data is strongly typed using TypeScript interfaces, such as Material, Product, Recipe, and Store, which improves type safety and code reliability. 
```
./src/services
├── api.ts
├── material
│   ├── getAllMaterials.ts
│   ├── getMaterialById.ts
│   └── getMaterialRecipes.ts
├── product
│   ├── getAllProducts.ts
│   ├── getProductById.ts
│   └── getProductRecipe.ts
└── store
    ├── getAllStores.ts
    ├── getStoreById.ts
    └── getStoreProducts.ts
``

