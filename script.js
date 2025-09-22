document.addEventListener('DOMContentLoaded', () => {

    const map = L.map('map').setView([34.6937, 135.5023], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 店舗データ配列（每个店铺都包含坐标和顾客评价）
    const shops = [
        {
            name: "元祖たこ焼",
            coords: [34.6657, 135.5034],
            rating: 4.5,
            reviews: 405,
            distance: "0.3km",
            image: "https://via.placeholder.com/600x400?text=元祖たこ焼",
            logo: "https://via.placeholder.com/80?text=たこ",
            details: "創業60年の老舗たこ焼店。職人が一つ一つ丁寧に焼き上げた逸品が自慢です。",
            hours: "18:00-22:00",
            tags: ["関西グルメ百選 TOPS", "大阪名物", "メディア掲載"],
            customerReviews: [
                { author: "山本さん", text: "外はカリカリ、中はとろーりで最高でした！", rating: 5 },
                { author: "佐藤さん", text: "並ぶ価値あり！秘伝の出汁が効いていて美味しかったです。", rating: 5 },
                { author: "田中さん", text: "お店の雰囲気がとても良かったです。また行きます。", rating: 4 }
            ]
        },
        {
            name: "お好み焼き 竜巻",
            coords: [34.6680, 135.5012],
            rating: 4.5,
            reviews: 124,
            distance: "0.8km",
            image: "https://via.placeholder.com/600x400?text=お好み焼き+竜巻",
            logo: "https://via.placeholder.com/80?text=お好み",
            details: "開店当初から続く名店の味。ふわふわの生地と特製秘伝のタレが織りなす絶妙な味わい。",
            hours: "11:00-23:00",
            tags: ["関西グルメ部門 TOPS", "予約必須", "百名店"],
            customerReviews: [
                { author: "山田さん", text: "生地が本当にふわふわ！お好み焼きの概念が変わりました。", rating: 5 },
                { author: "小林さん", text: "並びましたが、待った甲斐がありました。特製ソースが絶品です。", rating: 4 },
                { author: "鈴木さん", text: "店内は少し狭いですが、活気があって楽しかったです。", rating: 4 }
            ]
        },
        { name: "丸亀製麺 心斎橋店", coords: [34.6705, 135.4988], rating: 4.5, reviews: 579, distance: "0.5km", image: "https://via.placeholder.com/600x400?text=丸亀製麺", logo: "https://via.placeholder.com/80?text=うどん", details: "手打ちうどんの確かなコシ、コシのある麺とオリジナルの出汁が絶品。", hours: "10:00-22:00", tags: ["うどん部門 TOPS", "コスパ最高", "チェーン店大賞"], customerReviews: [] },
        { name: "串カツだるま 道頓堀店", coords: [34.6687, 135.5020], rating: 4.3, reviews: 800, distance: "0.4km", image: "https://via.placeholder.com/600x400?text=串カツだるま", logo: "https://via.placeholder.com/80?text=串カツ", details: "大阪名物串カツの老舗。二度漬け禁止の特製ソースで味わう絶品串カツ。", hours: "12:00-22:00", tags: ["串カツ", "有名店", "観光客人気"], customerReviews: [] },
        { name: "神座ラーメン 道頓堀店", coords: [34.6695, 135.5025], rating: 4.1, reviews: 650, distance: "0.6km", image: "https://via.placeholder.com/600x400?text=神座ラーメン", logo: "https://via.placeholder.com/80?text=ラーメン", details: "「どうとんぼり神座」特製の優しい味わいのラーメン。飲んだ後の〆にも最適。", hours: "11:00-翌7:00", tags: ["ラーメン", "深夜営業", "あっさり系"], customerReviews: [] },
        { name: "自由軒 難波本店", coords: [34.6650, 135.5000], rating: 4.4, reviews: 520, distance: "0.2km", image: "https://via.placeholder.com/600x400?text=自由軒", logo: "https://via.placeholder.com/80?text=カレー", details: "明治創業の老舗洋食店。生卵とルーを混ぜて食べる「名物カレー」は必食。", hours: "11:30-21:20", tags: ["カレー", "洋食", "老舗"], customerReviews: [] },
        { name: "豚平焼き専門店 とん平", coords: [34.6675, 135.4995], rating: 4.0, reviews: 280, distance: "0.7km", image: "https://via.placeholder.com/600x400?text=豚平焼き", logo: "https://via.placeholder.com/80?text=とん平", details: "豚平焼きの専門店。ふわふわの卵と豚肉の組み合わせが絶妙。", hours: "17:00-23:00", tags: ["豚平焼き", "居酒屋", "隠れた名店"], customerReviews: [] },
        { name: "梅田たこ焼き一番", coords: [34.7050, 135.4970], rating: 4.2, reviews: 350, distance: "5.0km", image: "https://via.placeholder.com/600x400?text=梅田たこ焼き一番", logo: "https://via.placeholder.com/80?text=たこ焼", details: "梅田の中心部にある人気のたこ焼き店。定番のソース味から変わり種まで楽しめる。", hours: "11:00-23:00", tags: ["たこ焼き", "梅田", "駅チカ"], customerReviews: [] },
        { name: "天王寺お好み焼き本舗", coords: [34.6475, 135.5070], rating: 4.3, reviews: 290, distance: "3.5km", image: "https://via.placeholder.com/600x400?text=天王寺お好み焼き本舗", logo: "https://via.placeholder.com/80?text=お好み焼", details: "天王寺エリアで愛されるお好み焼き店。家族連れにもおすすめ。", hours: "11:00-22:00", tags: ["お好み焼き", "天王寺", "家族向け"], customerReviews: [] },
        { name: "神戸餃子楼", coords: [34.6900, 135.1956], rating: 4.6, reviews: 700, distance: "30.0km", image: "https://via.placeholder.com/600x400?text=神戸餃子楼", logo: "https://via.placeholder.com/80?text=餃子", details: "神戸元町中華街にある老舗餃子専門店。皮はパリパリ、餡はジューシー。", hours: "11:00-21:00", tags: ["餃子", "神戸", "中華街"], customerReviews: [] },
        { name: "お好み焼き きじ 本店", coords: [34.7000, 135.4965], rating: 4.7, reviews: 900, distance: "5.1km", image: "https://via.placeholder.com/600x400?text=お好み焼き+きじ", logo: "https://via.placeholder.com/80?text=きじ", details: "大阪駅前第一ビル地下にある人気店。独特のふわふわ生地が特徴。", hours: "11:30-21:30", tags: ["お好み焼き", "梅田", "名店"], customerReviews: [] },
        { name: "たこ焼き道場", coords: [34.6590, 135.5010], rating: 4.1, reviews: 310, distance: "1.2km", image: "https://via.placeholder.com/600x400?text=たこ焼き道場", logo: "https://via.placeholder.com/80?text=道場", details: "自分好みのたこ焼きが作れる体験型のお店。友達と盛り上がること間違いなし！", hours: "14:00-23:00", tags: ["たこ焼き", "体験型", "ユニーク"], customerReviews: [] },
        { name: "味乃家", coords: [34.6645, 135.5028], rating: 4.6, reviews: 1100, distance: "0.1km", image: "https://via.placeholder.com/600x400?text=味乃家", logo: "https://via.placeholder.com/80?text=味乃家", details: "難波にあるお好み焼きの名店。特製の山芋ベースの生地が絶品です。", hours: "12:00-22:30", tags: ["お好み焼き", "老舗", "人気店"], customerReviews: [] }
    ];

    const visitedCountEl = document.getElementById('visited-count');
    const checkinCountEl = document.getElementById('checkin-count');
    const pointsCountEl = document.getElementById('points-count');
    const shopListContainer = document.getElementById('shop-list-container');
    const mapContainer = document.getElementById('map-container');
    const shopListEl = document.getElementById('shop-list');
    const shopPanel = document.getElementById('shop-panel');
    const closePanelBtn = document.getElementById('close-panel-btn');
    const reviewsListEl = document.getElementById('reviews-list');

    const shopNameEl = document.getElementById('shop-name');
    const shopRatingEl = document.getElementById('shop-rating');
    const panelDistanceEl = document.getElementById('panel-distance');
    const panelLogoEl = document.getElementById('panel-logo');
    const shopDetailsEl = document.getElementById('shop-details');
    const shopHoursEl = document.getElementById('shop-hours');
    const tagsEl = document.getElementById('tags');
    const checkInBtn = document.getElementById('check-in-btn');

    // UI要素
    const mapViewBtn = document.getElementById('map-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');

    // 全店舗リストを生成
    function createShopList() {
        shops.forEach(shop => {
            const card = document.createElement('div');
            card.className = 'shop-card';
            card.innerHTML = `
                <div class="shop-card-header">
                    <img src="${shop.logo}" alt="${shop.name}" class="shop-card-logo">
                    <div class="shop-card-info">
                        <h3 class="shop-card-name">${shop.name}</h3>
                        <div class="shop-card-rating">評価: ${'★'.repeat(Math.floor(shop.rating))} (${shop.reviews}件)</div>
                    </div>
                    <div class="shop-card-distance">${shop.distance}</div>
                </div>
                <div class="shop-card-details">${shop.details}</div>
                <div class="info-item">
                    <span class="icon">⏰</span>
                    <span>${shop.hours}</span>
                </div>
                <div class="shop-card-tags">
                    ${shop.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            `;
            card.addEventListener('click', () => {
                showShopPanel(shop);
            });
            shopListEl.appendChild(card);
        });
    }

    // マーカーを追加
    function addMarkers() {
        shops.forEach(shop => {
            const marker = L.marker(shop.coords).addTo(map);
            marker.on('click', () => {
                showShopPanel(shop);
            });
        });
    }

    // 単一店舗情報パネルを表示
    function showShopPanel(shop) {
        shopNameEl.textContent = shop.name;
        shopRatingEl.textContent = `${'★'.repeat(Math.floor(shop.rating))} (${shop.reviews}件)`;
        panelDistanceEl.textContent = shop.distance;
        panelLogoEl.src = shop.logo;
        shopDetailsEl.textContent = shop.details;
        shopHoursEl.textContent = shop.hours;
        tagsEl.innerHTML = shop.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        displayCustomerReviews(shop.customerReviews);

        checkInBtn.onclick = () => {
            checkIn(shop.name);
        };
    }

    // 顾客评价显示函数
    function displayCustomerReviews(reviews) {
        reviewsListEl.innerHTML = '';
        if (reviews && reviews.length > 0) {
            reviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = 'review-card';
                reviewCard.innerHTML = `
                    <div class="review-header">
                        <span class="review-author">${review.author}</span>
                        <span class="review-rating">${'★'.repeat(review.rating)}</span>
                    </div>
                    <p class="review-text">${review.text}</p>
                `;
                reviewsListEl.appendChild(reviewCard);
            });
        } else {
            reviewsListEl.innerHTML = '<p class="no-reviews">まだ評価がありません。</p>';
        }
    }

    // 打卡機能
    function checkIn(shopName) {
        let checkInHistory = JSON.parse(localStorage.getItem('checkInHistory')) || [];
        const today = new Date().toISOString().split('T')[0];
        const currentPoints = parseInt(localStorage.getItem('userPoints')) || 0;

        const alreadyCheckedIn = checkInHistory.some(item => item.shopName === shopName && item.date === today);

        if (alreadyCheckedIn) {
            alert("本日、このお店は既にチェックイン済みです！");
            return;
        }

        checkInHistory.push({ shopName: shopName, date: today });
        localStorage.setItem('checkInHistory', JSON.stringify(checkInHistory));

        const pointsEarned = 100;
        const newPoints = currentPoints + pointsEarned;
        localStorage.setItem('userPoints', newPoints);

        updateCounts();
        alert(`${shopName}でチェックインしました！\n${pointsEarned}ポイント獲得！`);
    }

    // カウントを更新する関数
    function updateCounts() {
        const checkInHistory = JSON.parse(localStorage.getItem('checkInHistory')) || [];
        const userPoints = localStorage.getItem('userPoints') || 0;

        checkinCountEl.textContent = checkInHistory.length;
        visitedCountEl.textContent = checkInHistory.length;
        pointsCountEl.textContent = userPoints;
    }

    // パネル切り替え機能
    mapViewBtn.addEventListener('click', () => {
        mapContainer.classList.add('active');
        shopListContainer.classList.remove('active');
        mapViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        map.invalidateSize();
    });

    listViewBtn.addEventListener('click', () => {
        shopListContainer.classList.add('active');
        mapContainer.classList.remove('active');
        listViewBtn.classList.add('active');
        mapViewBtn.classList.remove('active');
    });

    // 初始化函数
    function init() {
        createShopList();
        addMarkers(); // 确保在页面加载时调用这个函数
        updateCounts();
        if (shops.length > 0) {
            showShopPanel(shops[0]);
        }
    }

    init();
});