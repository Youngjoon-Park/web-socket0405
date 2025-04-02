import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import OrderDetailPage from './pages/OrderDetailPage';
import OrderCreatePage from './pages/OrderCreatePage';
import OrderCompletePage from './pages/OrderCompletePage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentPage from './pages/PaymentPage';
import AdminOrders from './pages/AdminOrders';
import MenuTestPage from './pages/MenuTestPage';
import MenuAddForm from './pages/MenuAddForm';
import MenuEditForm from './pages/MenuEditForm';
import CartPage from "./pages/CartPage";
import AdminPayments from "./pages/AdminPayments"; // AdminPayments 컴포넌트
import AdminHome from './pages/AdminHome';
import OrderList from "./components/OrderList"; 
import App from "./App";

function MainRouter() {
  // ✅ 장바구니 상태를 MainRouter로 올리기
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (menu) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === menu.id);
      if (existing) {
        return prev.map(item =>
          item.id === menu.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...menu, quantity: 1 }];
    });
  };

  const updateQuantity = (menuId, diff) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === menuId ? { ...item, quantity: item.quantity + diff } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <App
          key={cartItems.length} // 🧠 cartItems가 초기화되면 App이 새로 렌더링됨
            cartItems={cartItems}
            addToCart={addToCart}
            updateQuantity={updateQuantity}
            clearCart={clearCart}
          />
        } />

        <Route path="/cart" element={
          <CartPage
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            clearCart={clearCart}
          />
        } />
        
        <Route path="/admin/home" element={<AdminHome />} />
        
        {/* 수정된 부분: AdminPayments 한 번만 사용 */}
        <Route path="/admin/payments" element={<AdminPayments />} />

        <Route path="/admin" element={<Navigate to="/admin/orders" />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/orders/:orderId" element={<OrderDetailPage />} />
        
        <Route path="/order/new" element={<OrderCreatePage />} />
        <Route path="/order/:orderId" element={<OrderDetailPage />} />
        <Route path="/order/complete/:orderId" element={<OrderCompletePage />} />
        
        <Route path="/payment/success" element={
                <PaymentSuccessPage clearCart={clearCart} />} />
        <Route path="/payment/:orderId" element={<PaymentPage />} />
        
        <Route path="/menu-test" element={<MenuTestPage />} />
        <Route path="/menu-add" element={<MenuAddForm />} />
        <Route path="/menu-edit/:id" element={<MenuEditForm />} />
        <Route path="/orders" element={<OrderList />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;
