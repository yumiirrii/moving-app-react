import React from 'react';
import styled from 'styled-components';

interface Tobuy {
  id: string,
  item: string,
  price: number,
  isBought: boolean
}

interface TobuyListProps {
  tobuys: Tobuy[];
  boughts: Tobuy[];
  moveTobuy(index: number): void;
  editTobuy(index: number): void;
  deleteTobuy(id: string): void;
}

const Button = styled.button`
  border-color: #FF0099;
  background-color: white;
  color: #FF0099;

  &:hover {
    background-color: #FF0099;
    color: white;
  }
`

export const TobuyList: React.FC<TobuyListProps> = ({tobuys, boughts, moveTobuy, editTobuy, deleteTobuy}) => {
  
  const calcEstimate = () => {
    let total = 0;
    tobuys.forEach((tobuy) => {
      total += tobuy.price
    })
    return total;
  }

  const calcSpent = () => {
    let total = 0;
    boughts.forEach((bought) => {
      total += bought.price
    })
    return total;
  }

  return (
    <div className='items'>
      <ul className='item-list'>
        {tobuys.map((tobuy, index) => (
          <li key={index} className='item'>
            <div>
              <Button onClick={() => moveTobuy(index)}>bought</Button>
            </div>
            <div>
              {tobuy.item}
            </div>
            <div>
              ¥ {tobuy.price.toLocaleString()}
            </div>
            <div>
              <Button onClick={() => editTobuy(index)}>edit</Button>
            </div>
            <div>
              <Button onClick={() => deleteTobuy(tobuy.id)}>delete</Button>
            </div>
          </li>
        ))}
        <div>
          <span>total estimate: ¥ {calcEstimate().toLocaleString()}</span>
        </div>
      </ul>
      <ul className='moved-item-list'>
        {boughts.map((bought, index) => (
          <li key={index} className='item'>
            <div></div>
            <div>
              {bought.item}
            </div>
            <div>
              ¥ {bought.price.toLocaleString()}
            </div>
            <div></div>
            <div>
              <Button onClick={() => deleteTobuy(bought.id)}>delete</Button>
            </div>
          </li>
        ))}
         <div>
          <span>total spent: ¥ {calcSpent().toLocaleString()}</span>
        </div>
      </ul>
    </div>
  )
}
