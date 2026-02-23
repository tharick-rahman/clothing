const CART_KEY = "luxemotion_cart_v1";

function safeParse(json, fallback){
  try{
    const v = JSON.parse(json);
    return v ?? fallback;
  }catch{
    return fallback;
  }
}

export function readCart(){
  const raw = localStorage.getItem(CART_KEY);
  const cart = safeParse(raw, []);
  return Array.isArray(cart) ? cart : [];
}

export function writeCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getCartCount(){
  return readCart().reduce((sum, it) => sum + (Number(it.qty) || 0), 0);
}

export function addToCart({ id, size, qty = 1 }){
  const cart = readCart();
  const normalizedQty = Math.max(1, Math.min(99, Number(qty) || 1));
  const keySize = String(size || "").trim() || "Default";

  const idx = cart.findIndex(it => it.id === id && it.size === keySize);
  if (idx >= 0){
    cart[idx].qty = Math.max(1, Math.min(99, (Number(cart[idx].qty) || 0) + normalizedQty));
  }else{
    cart.push({ id, size: keySize, qty: normalizedQty });
  }
  writeCart(cart);
  return cart;
}

export function removeFromCart({ id, size }){
  const keySize = String(size || "").trim() || "Default";
  const cart = readCart().filter(it => !(it.id === id && it.size === keySize));
  writeCart(cart);
  return cart;
}

export function setCartQty({ id, size, qty }){
  const keySize = String(size || "").trim() || "Default";
  const next = Math.max(1, Math.min(99, Number(qty) || 1));
  const cart = readCart();
  const idx = cart.findIndex(it => it.id === id && it.size === keySize);
  if (idx >= 0){
    cart[idx].qty = next;
    writeCart(cart);
  }
  return cart;
}

export function clearCart(){
  writeCart([]);
}

