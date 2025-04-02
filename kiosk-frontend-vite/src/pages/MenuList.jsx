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
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">🍔 원하시는 메뉴를 선택하세요</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="bg-yellow-100 border-2 border-gray-300 rounded-lg p-4 text-center shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => addToCart(menu)}
          >
            <h3 className="text-lg font-semibold">{menu.name}</h3>
            <p className="text-gray-700">{menu.description}</p>
            <strong className="block mt-2 text-xl">{menu.price.toLocaleString()}원</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
