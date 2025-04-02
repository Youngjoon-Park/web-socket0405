import axios from "axios";

export const getAllMenus = async () => {
  const response = await axios.get("http://localhost:8081/api/admin/menus");
  return response.data;
};
export const addMenu = async (menu) => {
  const response = await axios.post("http://localhost:8081/api/admin/menus", menu);
  return response.data;
};
export const deleteMenu = async (id) => {
  await axios.delete(`http://localhost:8081/api/admin/menus/${id}`);
};
export const getMenuById = async (id) => {
  const response = await axios.get(`http://localhost:8081/api/admin/menus/${id}`);
  return response.data;
};
export const updateMenu = async (id, menu) => {
  await axios.put(`http://localhost:8081/api/admin/menus/${id}`, menu);
};


