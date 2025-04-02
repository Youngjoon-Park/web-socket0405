import React, { useEffect, useState } from "react";
import { getAllMenus } from "../api/adminMenuApi"; // 경로는 실제 구조에 맞게 조정
import { deleteMenu } from './../api/adminMenuApi';
import { Link } from 'react-router-dom';

const MenuTestPage = () => {
  const [menus, setMenus] = useState([]);

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteMenu(id);
        alert("삭제되었습니다!");
        // 삭제 후 다시 불러오기
        const updatedMenus = await getAllMenus();
        setMenus(updatedMenus);
      } catch (error) {
        alert("삭제 실패!");
      }
    }
  };
  
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const data = await getAllMenus();
        setMenus(data);
      } catch (error) {
        console.error("메뉴 불러오기 실패:", error);
      }
    };

    fetchMenus();
  }, []);

  return (
    <div>
      <h2>📋 등록된 메뉴 목록</h2>
      <ul>
      {menus.map((menu) => (
        <li key={menu.id}>
          {menu.name} - {menu.price}원
          <Link to={`/menu-edit/${menu.id}`}>
            <button>수정</button>
          </Link>
          <button onClick={() => handleDelete(menu.id)}>삭제</button>
        </li>
))}
      </ul>
    </div>
  );
};

export default MenuTestPage;
