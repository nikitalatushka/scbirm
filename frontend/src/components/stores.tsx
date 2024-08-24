import React, { useState, useEffect } from 'react';
import { fetchStores } from '../api';

// Defines the structure/shape of Store <object>
// The object's properties and methods
interface Store {
  store_ID: number;
  store_name: string;
  description: string; 
  level_unlocked: number;
}
// var: is globally scoped; use rarely
// const: when the variable's value cannot be changed
// let: when it can be changed


const Stores: React.FC = () => { // defines a 'function component' named Stores with no properties (props) 
  // Initializes a state variable stores as an empty array of Store objects.
  //`setStores` is the function used to update this state.
  const [stores, setStores] = useState<Store[]>([]); // useState<>() == hook
  useEffect(() => { // init a hook that runs side effects in the functional component
    const getStores = async () => { // async function `getStores` fetches data from the api
      const data = await fetchStores(); // gets `data` from API to get a promise from `fetchStores`
      setStores(data); // update `store` state  
    };
    getStores(); // invoke the side effect hook, fetch data from api
  }, []);

  return (
    <div className='stores-view'>
      <h2>Stores</h2>
      <div className="store-grid">
        {stores.map(store => (
          <div key={store.store_ID} className="store-card">
            <h3>{store.store_name}</h3>
            <p>{store.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stores;