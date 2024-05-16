import React, { useEffect, useState } from 'react';
import { AddTobuy } from './components/AddTobuy';
import { TobuyList } from './components/TobuyList';
import { deleteById, getAll, save } from './firebase/dbManager';

interface Tobuy {
  id: string,
  item: string,
  price: number,
  isBought: boolean
}

export const TobuyView: React.FC = () => {
  const [tobuys, setTobuys] = useState<Tobuy[]>([]);
  const [boughts, setBoughts] = useState<Tobuy[]>([]);
  const [editingTobuy, setEditingTobuy] = useState<Tobuy | undefined>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data: Tobuy[] = await getAll('tobuys');
    setTobuys(data.filter(item => !item.isBought));
    setBoughts(data.filter(item => item.isBought));
  }

  const saveItem = async (tobuy: Tobuy) => {
    await save('tobuys', tobuy);
    fetchData();
  }

  const moveItem = async (index: number) => {
    const tobuy: Tobuy = tobuys[index];
    tobuy.isBought = true;
    await save('tobuys', tobuy);
    fetchData();
  }

  const editItem = async (index: number) => {
    setEditingTobuy(tobuys[index]);
  }

  const deleteItem = async (id: string) => {
    await deleteById('tobuys', id);
    fetchData();
  }

  return (
    <div>
      <AddTobuy
        saveTobuy={saveItem}
        editingTobuy={editingTobuy}
      />
      <TobuyList
        tobuys={tobuys}
        boughts={boughts}
        moveTobuy={moveItem}
        editTobuy={editItem}
        deleteTobuy={deleteItem}
      />
    </div>
  )
}
