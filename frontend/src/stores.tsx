import React, { useState, useEffect } from 'react';
import { fetchStores } from './api';

interface Store {
  store_ID: number;
  store_name: string;
  description: string; 
  level_unlocked: number;
}

const Stores: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const getStores = async () => {
      const data = await fetchStores();
      setStores(data);
    };

    getStores();
  }, []);

  return (
    <div className="store-grid">
      {stores.map(store => (
        <div key={store.store_ID} className="store-card">
          <h2>{store.store_name}</h2>
          <p>{store.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Stores;