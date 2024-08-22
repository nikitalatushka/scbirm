import React, { useState, useEffect } from 'react';
import { fetchStores } from './api';

interface Store {
  id: number;
  store_name: string;
  location: string; // Add more fields as necessary
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
        <div key={store.id} className="store-card">
          <h2>{store.store_name}</h2>
          <p>{store.location}</p>
          {/* Add more details as necessary */}
        </div>
      ))}
    </div>
  );
};

export default Stores;