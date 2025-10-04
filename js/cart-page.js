// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 渲染购物车
    renderCart();
    // 更新购物车数量
    updateCartCount();
    // 绑定清空购物车按钮事件
    document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
    // 绑定结算按钮事件
    document.getElementById('checkout-btn').addEventListener('click', checkout);
});

// 渲染购物车
function renderCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartContainer = document.getElementById('empty-cart');
    const cartSummaryContainer = document.getElementById('cart-summary');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    // 清空容器
    cartItemsContainer.innerHTML = '';
    
    // 检查购物车是否为空
    if (cart.length === 0) {
        // 显示空购物车提示，隐藏购物车列表和总计
        emptyCartContainer.style.display = 'block';
        cartItemsContainer.style.display = 'none';
        cartSummaryContainer.style.display = 'none';
        return;
    }
    
    // 购物车不为空，隐藏空购物车提示，显示购物车列表和总计
    emptyCartContainer.style.display = 'none';
    cartItemsContainer.style.display = 'block';
    cartSummaryContainer.style.display = 'block';
    
    // 计算商品总价
    let subtotal = 0;
    
    // 渲染购物车商品
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>单价: ¥${item.price}</p>
            </div>
            <div class="quantity-control">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-total">¥${itemTotal}</div>
            <button class="remove-btn" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    // 计算总计（加配送费）
    const deliveryFee = 20;
    const total = subtotal + deliveryFee;
    
    // 更新总价显示
    subtotalElement.textContent = `¥${subtotal}`;
    totalElement.textContent = `¥${total}`;
    
    // 绑定数量修改事件
    bindQuantityEvents();
    // 绑定删除商品事件
    bindRemoveEvents();
}

// 绑定数量修改事件
function bindQuantityEvents() {
    // 减少数量按钮
    document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const flowerId = parseInt(this.dataset.id);
            const cart = getCart();
            const itemIndex = cart.findIndex(item => item.id === flowerId);
            
            if (itemIndex > -1) {
                if (cart[itemIndex].quantity > 1) {
                    // 数量大于1，减少数量
                    cart[itemIndex].quantity--;
                } else {
                    // 数量为1，从购物车中移除
                    cart.splice(itemIndex, 1);
                }
                
                // 保存购物车并重新渲染
                saveCart(cart);
                renderCart();
            }
        });
    });
    
    // 增加数量按钮
    document.querySelectorAll('.quantity-btn.increase').forEach(button => {
        button.addEventListener('click', function() {
            const flowerId = parseInt(this.dataset.id);
            const cart = getCart();
            const itemIndex = cart.findIndex(item => item.id === flowerId);
            
            if (itemIndex > -1) {
                // 增加数量
                cart[itemIndex].quantity++;
                
                // 保存购物车并重新渲染
                saveCart(cart);
                renderCart();
            }
        });
    });
}

// 绑定删除商品事件
function bindRemoveEvents() {
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const flowerId = parseInt(this.dataset.id);
            const cart = getCart();
            const newCart = cart.filter(item => item.id !== flowerId);
            
            // 保存购物车并重新渲染
            saveCart(newCart);
            renderCart();
        });
    });
}

// 清空购物车
function clearCart() {
    if (confirm('Are you sure you want to empty your shopping cart? ')) {
        localStorage.removeItem('cart');
        renderCart();
        updateCartCount();
    }
}

// 结算
function checkout() {
    alert('The order has been submitted successfully! Your flowers will be delivered as soon as possible～');
}