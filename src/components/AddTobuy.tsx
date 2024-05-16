import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Tobuy {
  id: string,
  item: string,
  price: number,
  isBought: boolean
}

interface AddTobuyProps {
  saveTobuy(data: Tobuy): void;
  editingTobuy?: Tobuy;
}

export const AddTobuy: React.FC<AddTobuyProps> = ({saveTobuy, editingTobuy}) => {
  const [item, setItem] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (editingTobuy) {
      setItem(editingTobuy.item);
      setPrice(editingTobuy.price);
      setIsEditing(true);
    } else {
      setItem('');
      setPrice(0);
      setIsEditing(false);
    }
  }, [editingTobuy])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTobuy) {
      saveTobuy({
        id: editingTobuy.id,
        item,
        price,
        isBought: false
      })
    } else {
      saveTobuy({
        id: '',
        item,
        price,
        isBought: false
      })
    }
    setItem('');
    setPrice(0);
    setIsEditing(false);
  }

  const Button = styled.button`
  border-color: #000066;
  background-color: #000066;
  color: white;

  &:hover {
    background-color: white;
    color: #000066;
  }
`
  
  return (
    <div className='input-area'>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.valueAsNumber)}
          />
        </div>
        <Button type="submit">{isEditing ? 'edit' : 'add'}</Button>
      </form>
    </div>
  )
}
