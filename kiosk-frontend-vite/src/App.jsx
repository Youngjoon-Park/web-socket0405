
import MenuList from './components/MenuList';
import Cart from './components/Cart';
function App({ cartItems, addToCart, updateQuantity, clearCart }) {
  return (
    <div
      key={cartItems.length} // ✅ 여기로 옮기세요
      style={{
        padding: "30px",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <h1 style={{ textAlign: "center" }}>키오스크 메인</h1>

      <MenuList addToCart={addToCart} />

      <Cart
        cartItems={cartItems}
        clearCart={clearCart}
        updateQuantity={updateQuantity}
      />
    </div>
  );
}
export default App;
