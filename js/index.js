// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 渲染推荐花束
    renderFeaturedFlowers();
    // 更新购物车数量
    updateCartCount();
});

// 渲染推荐花束
function renderFeaturedFlowers() {
    const flowerList = document.getElementById('flower-list');
    // 只显示前4个花束作为推荐
    const featured = flowers.slice(0, 4);
    
    featured.forEach(flower => {
        const flowerCard = document.createElement('div');
        flowerCard.className = 'flower-card';
        flowerCard.innerHTML = `
            <img src="${flower.image}" alt="${flower.name}">
            <div class="flower-info">
                <h3>${flower.name}</h3>
                <p class="flower-price">¥${flower.price}</p>
                <button class="add-to-cart-btn" 
                        data-id="${flower.id}"
                        data-name="${flower.name}"
                        data-price="${flower.price}"
                        data-image="${flower.image}">
                    加入购物车
                </button>
            </div>
        `;
        flowerList.appendChild(flowerCard);
    });
    
    // 为加入购物车按钮绑定事件
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}