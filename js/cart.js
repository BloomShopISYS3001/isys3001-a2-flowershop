// 从本地存储获取购物车数据
function getCart() {
    const cartJson = localStorage.getItem('cart');
    return cartJson ? JSON.parse(cartJson) : [];
}

// 保存购物车数据到本地存储
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// 添加商品到购物车
function addToCart(event) {
    // 获取商品信息
    const flowerId = parseInt(event.target.dataset.id);
    const flowerName = event.target.dataset.name;
    const flowerPrice = parseFloat(event.target.dataset.price);
    const flowerImage = event.target.dataset.image;
    
    // 获取当前购物车
    const cart = getCart();
    
    // 检查商品是否已在购物车中
    const existingItemIndex = cart.findIndex(item => item.id === flowerId);
    
    if (existingItemIndex > -1) {
        // 如果已存在，增加数量
        cart[existingItemIndex].quantity++;
    } else {
        // 如果不存在，添加新商品
        cart.push({
            id: flowerId,
            name: flowerName,
            price: flowerPrice,
            image: flowerImage,
            quantity: 1
        });
    }
    
    // 保存购物车并更新数量显示
    saveCart(cart);
    
    // 显示提示
    alert(`${flowerName} 已添加到购物车！`);
}

// 更新购物车数量显示
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}