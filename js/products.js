// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 渲染所有花束
    renderAllFlowers();
    // 更新购物车数量
    updateCartCount();
    // 绑定筛选按钮事件
    bindFilterButtons();
});

// 渲染所有花束
function renderAllFlowers(category = 'all') {
    const flowerList = document.getElementById('all-flowers');
    flowerList.innerHTML = ''; // 清空列表
    
    // 根据分类筛选花束
    const filteredFlowers = category === 'all' 
        ? flowers 
        : flowers.filter(flower => flower.category === category);
    
    // 渲染筛选后的花束
    filteredFlowers.forEach(flower => {
        const flowerCard = document.createElement('div');
        flowerCard.className = 'flower-card';
        flowerCard.innerHTML = `
            <img src="${flower.image}" alt="${flower.name}">
            <div class="flower-info">
                <h3>${flower.name}</h3>
                <p>${flower.description}</p>
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

// 绑定筛选按钮事件
function bindFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // 为当前点击的按钮添加active类
            this.classList.add('active');
            // 获取分类并重新渲染
            const category = this.dataset.category;
            renderAllFlowers(category);
        });
    });
}