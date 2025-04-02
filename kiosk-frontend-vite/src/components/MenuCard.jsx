// components/MenuCard.jsx
import React from 'react';

const MenuCard = ({ menu, addToCart }) => {
  return (
    <div style={styles.card}>
      <h3>{menu.name}</h3>
      <p>{menu.price}원</p>
      <button onClick={() => addToCart(menu)}>장바구니에 담기</button>
    </div>
  );
};

const styles = {
  card: {
    border: '2px solid red',
    padding: '16px',
    borderRadius: '8px',
    width: '200px',
    margin: '8px',
    textAlign: 'center',
    backgroundColor: 'lightyellow', // ✅ 카멜케이스 표기, 문자열로 값 지정
  },
};

export default MenuCard;
