// src/MainRouter.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import CartPage from "./pages/CartPage";
import MenuTestPage from "./pages/MenuTestPage";
import MenuAddForm from "./pages/MenuAddForm";
import MenuEditForm from "./pages/MenuEditForm";
import OrderCreatePage from "./pages/OrderCreatePage";
import OrderCompletePage from "./pages/OrderCompletePage";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import OrderList from "./components/OrderList";

import AdminHome from "./pages/AdminHome";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminOrders from "./components/admin/AdminOrders";
import AdminPayments from "./pages/AdminPayments";
import OrderDetail from "./components/admin/OrderDetail"; // ✅ 수정된 경로

import RequireAuth from "./components/RequireAuth";
import KitchenView from "./pages/KitchenView"; // 또는 주방.jsx 파일명에 따라 수정



function MainRouter() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (menu) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === menu.id);
      if (existing) {
        return prev.map((item) =>
          item.id === menu.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...menu, quantity: 1 }];
    });
  };

  const updateQuantity = (menuId, diff) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === menuId
            ? { ...item, quantity: item.quantity + diff }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <BrowserRouter>
      <Routes>
        {/* 일반 사용자 */}
        <Route
          path="/"
          element={
            <App
              key={cartItems.length}
              cartItems={cartItems}
              addToCart={addToCart}
              updateQuantity={updateQuantity}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              clearCart={clearCart}
            />
          }
        />
          <Route path="/menu" element={<MenuTestPage />} />
          <Route path="/kitchen" element={<KitchenView />} />        {/* ✅ /kitchen 경로 */}
        <Route path="/menu-test" element={<MenuTestPage />} />
        <Route path="/menu-add" element={<MenuAddForm />} />
        <Route path="/menu-edit/:id" element={<MenuEditForm />} />
        <Route path="/order/new" element={<OrderCreatePage />} />
        <Route path="/order/complete/:orderId" element={<OrderCompletePage />} />
        <Route path="/payment/:orderId" element={<PaymentPage />} />
        <Route
          path="/payment/success"
          element={<PaymentSuccessPage clearCart={clearCart} />}
        />
        <Route path="/orders" element={<OrderList />} />

        {/* 관리자 */}
        <Route path="/admin" element={<Navigate to="/admin/orders" />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/home"
          element={
            <RequireAuth>
              <AdminHome />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <RequireAuth>
              <AdminOrders />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/orders/:orderId"
          element={
            <RequireAuth>
              <OrderDetail /> {/* ✅ OrderDetailPage → OrderDetail */}
            </RequireAuth>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <RequireAuth>
              <AdminPayments />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;