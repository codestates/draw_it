import React from 'react'

export const Item = ({ item, handleClick }) => {
    return (
      <div key={item.id} className='item'>
        <img className='item-img' src={item.image} alt={item.name} />
        <span className='item-name' data-testid={item.name}>{item.name}</span>
        <span className='item-price'>{item.price}</span>
        <button className='item-button' onClick={(e) => handleClick(e, item.id)}>장바구니 담기</button>
      </div>
    )
}
