// 📄 src/components/MenuList.jsx
import React, { useEffect, useState } from "react";
import { getAllMenus } from "../api/adminMenuApi";

const MenuList = ({ addToCart }) => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllMenus();
      setMenus(data);
    };
    fetchData();
  }, []);

  return (
    <div style={{
      padding: "30px",
      maxWidth: "1200px",
      margin: "0 auto",
    }}>
      <h2 style={{ textAlign: "center" }}>🍔 원하시는 메뉴를 선택하세요</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // 핵심
          gap: "20px",
          marginTop: "20px",
          backgroundColor: "#fffefc",
          padding: "20px",
        }}
      >
        {menus.map((menu) => (
          <div
            key={menu.id}
            style={{
              padding: "16px",
              border: "2px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "lightyellow",
              textAlign: "center",
              boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
            onClick={() => addToCart(menu)}
          >
            <h3>{menu.name}</h3>
            <p>{menu.description}</p>
            <strong>{menu.price.toLocaleString()}원</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
