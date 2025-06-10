// 游戏状态
let counter = 0;
let catCount = 0;
let chickenCount = 0;
let cowCount = 0;
let pigCount = 0;
let eggs = [];
let milks = [];
let animals = [];
let hasUserInteracted = false;
let fryingPans = 0;
let activeFryingPans = 0;
let rawEggs = 0;
let friedEggsInPan = [];
let grilledFishes = [];
let grilledChickens = [];
let sausages = [];
let catTowers = 0;
let catsInTower = 0;
let fishTanks = 0;
let fishCount = 0;
let squidCount = 0;
let fishesInTank = [];
let squidsInTank = [];
let catsInTowerArea = [];

// 特殊物品收集统计
let collectionStats = {
    common: 0,
    uncommon: 0,
    rare: 0,
    epic: 0,
    legendary: 0
};

// 已收集物品记录
let collectedItems = {};

// Clicker系统优化
const MAX_CLICKERS = 80;
const CLICKER_POOL_SIZE = 100;
const clickers = [];
const clickerPool = [];

// 游戏配置
const GAME_CONFIG = {
    // 牛奶配置
    MILK_DURATION: 30000,
    MILK_PRODUCTION_RATE: 1000,
    COW_PRODUCTION_INTERVAL: 5000,

    // 鸡蛋配置
    EGG_DURATION: 5000,
    EGG_PRODUCTION_RATE: 1000,
    CHICKEN_PRODUCTION_INTERVAL: 3000,

    // 猪配置
    PIG_PRODUCTION_INTERVAL: 4000,
    PIG_VALUE: 150,

    // 煎蛋配置
    FRYING_DURATION: 5000,
    FRIED_EGG_DURATION: 10000,
    FRIED_EGG_VALUE: 30,

    // 烤鸡配置
    GRILLED_CHICKEN_DURATION: 12000,
    GRILLED_CHICKEN_VALUE: 60,

    // 烤肠配置
    SAUSAGE_MIN_COUNT: 6,
    SAUSAGE_MAX_COUNT: 10,
    SAUSAGE_DURATION: 5000,
    SAUSAGE_VALUE: 40,

    // 猫爬架配置
    CAT_TOWER_VALUE: 7,

    // 鱼配置
    FISH_PRODUCTION_INTERVAL: 7000,
    FISH_VALUE: 80,

    // 墨鱼配置
    SQUID_PRODUCTION_INTERVAL: 500,
    SQUID_VALUE: 18,

    // 烤鱼配置
    GRILLING_DURATION: 7000,
    GRILLED_FISH_DURATION: 7000,
    GRILLED_FISH_VALUE: 160,

    // 容量配置
    CATS_PER_TOWER: 7,
    EGGS_PER_PAN: 3,

    // 特殊物品配置
    SPECIAL_ITEMS: {
        item1: {
            name: "小雕像",
            rarity: "uncommon",
            dropChance: 0.0003, // 0.03%
            image: 'images/item1.png',
            value: 250
        },
        item2: {
            name: "无敌星星",
            rarity: "uncommon",
            dropChance: 0.0003, // 0.03%
            image: 'images/item2.png',
            value: 250
        },
        item3: {
            name: "土块",
            rarity: "rare",
            dropChance: 0.0001, // 0.01%
            image: 'images/item3.png',
            value: 500
        },
        item4: {
            name: "糖梅宝宝",
            rarity: "epic",
            dropChance: 0.00008, // 0.008%
            image: 'images/item4.png',
            value: 1000
        },
        item5: {
            name: "忍者",
            rarity: "legendary",
            dropChance: 0.00003, // 0.003%
            image: 'images/item5.png',
            value: 5000
        },
        item6: {
            name: "月球",
            rarity: "common",
            dropChance: 0.0008, // 0.08%
            image: 'images/item6.png',
            value: 100
        },
        item7: {
            name: "杨桃",
            rarity: "uncommon",
            dropChance: 0.0003, // 0.03%
            image: 'images/item7.png',
            value: 250
        },
        item8: {
            name: "龙蝇",
            rarity: "epic",
            dropChance: 0.00008, // 0.008%
            image: 'images/item8.png',
            value: 1000
        },
        item9: {
            name: "骷髅头",
            rarity: "common",
            dropChance: 0.0008, // 0.08%
            image: 'images/item9.png',
            value: 100
        },
        item10: {
            name: "抽纸",
            rarity: "common",
            dropChance: 0.0008, // 0.08%
            image: 'images/item10.png',
            value: 100
        },
        item11: {
            name: "冰",
            rarity: "rare",
            dropChance: 0.0001, // 0.01%
            image: 'images/item11.png',
            value: 500
        },
        item12: {
            name: "禁止",
            rarity: "uncommon",
            dropChance: 0.0003, // 0.03%
            image: 'images/item12.png',
            value: 250
        }
    }
};

// 物理参数
const PHYSICS = {
    GRAVITY: 0.2,
    BOUNCE: 0.85,
    ROTATION_SPEED: 2,
    FRICTION: 0.98,
    INITIAL_X_VELOCITY: 2,
    CAT_SIZE: 90,
    CHICKEN_SIZE: 80,
    COW_SIZE: 130,
    PIG_SIZE: 120,
    MILK_SIZE: 70,
    EGG_SIZE: 45,
    FRIED_EGG_SIZE: 70,
    GRILLED_CHICKEN_SIZE: 90,
    SAUSAGE_SIZE: 100,  // 增大烤肠尺寸
    GRILLED_FISH_SIZE: 100,  // 增大烤鱼尺寸

    // Clicker物理参数
    CLICKER_MIN_SIZE: 50,
    CLICKER_MAX_SIZE: 120,
    CLICKER_MIN_SPEED: 5,
    CLICKER_SPEED_RANGE: 5,
    CLICKER_ROTATION_RANGE: 10,

    // 猫爬架区域物理参数
    TOWER_GRAVITY: 0.3,
    TOWER_BOUNCE: 0.8,

    // 鱼缸区域物理参数
    FISH_SPEED: 1.5,
    SQUID_SPEED: 1.2
};

// 生产参数
const PRODUCTION = {
    CAT_INTERVAL: 1000,
    CAT_VALUE: 1,
    MILK_VALUE: 3,
    EGG_VALUE: 5,
    PIG_VALUE: 150
};

// 音频元素
const audio = {
    bgMusic: document.getElementById('bgMusic'),
    clickSound: document.getElementById('clickSound'),
    coinSound: document.getElementById('coinSound'),
    meowSound: document.getElementById('meowSound'),
    cowSound: document.getElementById('cowSound'),
    milkSound: document.getElementById('milkSound'),
    chickenSound: document.getElementById('chickenSound'),
    eggSound: document.getElementById('eggSound'),
    fryingPanSound: document.getElementById('fryingPanSound'),
    friedEggSound: document.getElementById('friedEggSound'),
    catTowerSound: document.getElementById('catTowerSound'),
    fishTankSound: document.getElementById('fishTankSound'),
    fishSound: document.getElementById('fishSound'),
    squidSound: document.getElementById('squidSound'),
    grilledFishSound: document.getElementById('grilledFishSound'),
    itemSound: document.getElementById('itemSound'),
    pigSound: document.getElementById('pigSound'),
    grilledChickenSound: document.getElementById('grilledChickenSound'),
    sausageSound: document.getElementById('sausageSound')
};

// 音量设置
const VOLUME = {
    BACKGROUND: 0.3,
    CLICK: 0.5,
    COIN: 0.5,
    MEOW: 0.7,
    COW: 0.6,
    MILK: 0.4,
    CHICKEN: 0.5,
    EGG: 0.3,
    FRYING_PAN: 0.6,
    FRIED_EGG: 0.5,
    CAT_TOWER: 0.5,
    FISH_TANK: 0.6,
    FISH: 0.5,
    SQUID: 0.6,
    GRILLED_FISH: 0.5,
    ITEM: 0.6,
    PIG: 0.6,
    GRILLED_CHICKEN: 0.5,
    SAUSAGE: 0.5
};

// DOM元素
const elements = {
    counter: document.getElementById('counter'),
    clickBtn: document.getElementById('clickBtn'),
    buyCatBtn: document.getElementById('buyCat'),
    buyChickenBtn: document.getElementById('buyChicken'),
    buyCowBtn: document.getElementById('buyCow'),
    buyPigBtn: document.getElementById('buyPig'),
    buyFryingPanBtn: document.getElementById('buyFryingPan'),
    buyCatTowerBtn: document.getElementById('buyCatTower'),
    buyFishTankBtn: document.getElementById('buyFishTank'),
    buyFishBtn: document.getElementById('buyFish'),
    buySquidBtn: document.getElementById('buySquid'),
    catCount: document.getElementById('catCount'),
    chickenCount: document.getElementById('chickenCount'),
    cowCount: document.getElementById('cowCount'),
    pigCount: document.getElementById('pigCount'),
    fryingPanCount: document.getElementById('fryingPanCount'),
    catTowerCount: document.getElementById('catTowerCount'),
    fishTankCount: document.getElementById('fishTankCount'),
    fishCount: document.getElementById('fishCount'),
    squidCount: document.getElementById('squidCount'),
    animalsContainer: document.getElementById('animalsContainer'),
    resetBtn: document.getElementById('resetBtn'),
    musicHint: document.getElementById('musicHint'),
    fryingPanContainer: document.getElementById('fryingPanContainer'),
    addEggBtn: document.getElementById('addEggBtn'),
    fryEggBtn: document.getElementById('fryEggBtn'),
    addFishToPanBtn: document.getElementById('addFishToPanBtn'),
    addGrilledChickenBtn: document.getElementById('addGrilledChickenBtn'),
    addSausageBtn: document.getElementById('addSausageBtn'),
    rawEggCount: document.getElementById('rawEggCount'),
    fryingItemsContainer: document.getElementById('fryingItemsContainer'),
    fryingArea: document.getElementById('fryingArea'),
    catTowerContainer: document.getElementById('catTowerContainer'),
    addCatToTowerBtn: document.getElementById('addCatToTowerBtn'),
    catTowerArea: document.getElementById('catTowerArea'),
    fishTankContainer: document.getElementById('fishTankContainer'),
    fishTankArea: document.getElementById('fishTankArea'),
    fryingPanCapacity: document.getElementById('fryingPanCapacity'),
    catTowerCapacity: document.getElementById('catTowerCapacity'),
    specialItemsDisplay: document.getElementById('specialItemsDisplay'),
    commonCount: document.getElementById('commonCount'),
    uncommonCount: document.getElementById('uncommonCount'),
    rareCount: document.getElementById('rareCount'),
    epicCount: document.getElementById('epicCount'),
    legendaryCount: document.getElementById('legendaryCount')
};

// ============================================
// Clicker对象池系统
// ============================================

function initClickerPool() {
    for (let i = 0; i < CLICKER_POOL_SIZE; i++) {
        const clicker = document.createElement('div');
        clicker.className = 'clicker';
        clicker.style.display = 'none';
        document.body.appendChild(clicker);
        clickerPool.push({
            element: clicker,
            inUse: false
        });
    }
}

function createClicker() {
    if (clickers.length >= MAX_CLICKERS) return;

    const available = clickerPool.find(c => !c.inUse);
    if (!available) return;

    available.inUse = true;
    const clicker = available.element;

    // 随机属性
    const size = PHYSICS.CLICKER_MIN_SIZE +
        Math.random() * (PHYSICS.CLICKER_MAX_SIZE - PHYSICS.CLICKER_MIN_SIZE);
    const rotateSpeed = (Math.random() - 0.5) * PHYSICS.CLICKER_ROTATION_RANGE;
    const startX = Math.random() * (window.innerWidth * 0.6) + (window.innerWidth * 0.2);
    const speed = PHYSICS.CLICKER_MIN_SPEED + Math.random() * PHYSICS.CLICKER_SPEED_RANGE;

    clicker.style.display = 'block';
    clicker.style.width = `${size}px`;
    clicker.style.height = `${size}px`;
    clicker.style.left = `${startX}px`;
    clicker.style.top = `-${size}px`;
    clicker.style.transform = 'rotate(0deg)';

    const clickerObj = {
        element: clicker,
        poolItem: available,
        x: startX,
        y: -size,
        velocityY: speed,
        rotateSpeed: rotateSpeed,
        rotation: 0
    };

    const animate = (timestamp) => {
        if (!clickerObj.poolItem.inUse) return;

        // 基于时间的运动
        clickerObj.y += clickerObj.velocityY;
        clickerObj.rotation += clickerObj.rotateSpeed;

        clicker.style.top = `${clickerObj.y}px`;
        clicker.style.transform = `rotate(${clickerObj.rotation}deg)`;

        if (clickerObj.y > window.innerHeight + 100) {
            // 回收到对象池
            clicker.style.display = 'none';
            clickerObj.poolItem.inUse = false;
            const index = clickers.indexOf(clickerObj);
            if (index > -1) clickers.splice(index, 1);
        } else {
            requestAnimationFrame(animate);
        }
    };

    clickers.push(clickerObj);
    requestAnimationFrame(animate);
}

// ============================================
// 特殊物品系统
// ============================================

function checkSpecialItemDrop() {
    // 先检查哪些物品还没收集
    const uncollectedItems = Object.entries(GAME_CONFIG.SPECIAL_ITEMS)
        .filter(([itemId]) => !collectedItems[itemId]);

    if (uncollectedItems.length === 0) return; // 所有物品都已收集

    // 按稀有度从高到低检查
    const rarityOrder = ['legendary', 'epic', 'rare', 'uncommon', 'common'];

    for (const rarity of rarityOrder) {
        for (const [itemId, itemConfig] of uncollectedItems) {
            if (itemConfig.rarity === rarity && Math.random() < itemConfig.dropChance) {
                createSpecialItem(itemId);
                return; // 一次只掉一个物品
            }
        }
    }
}

function createSpecialItem(itemId) {
    const itemConfig = GAME_CONFIG.SPECIAL_ITEMS[itemId];
    if (!itemConfig) return;

    // 播放音效
    playSound(audio.itemSound, true);

    // 显示提示
    showToast(`获得了 ${itemConfig.name}!`, false);

    // 创建掉落动画
    const specialClicker = document.createElement('div');
    specialClicker.className = 'clicker special-clicker';
    specialClicker.style.backgroundImage = `url('${itemConfig.image}')`;
    document.body.appendChild(specialClicker);

    // 设置初始位置和大小
    const size = 80 + Math.random() * 40; // 80-120px大小
    const startX = Math.random() * (window.innerWidth - size);
    specialClicker.style.width = `${size}px`;
    specialClicker.style.height = `${size}px`;
    specialClicker.style.left = `${startX}px`;
    specialClicker.style.top = `-${size}px`;

    // 掉落动画参数
    let y = -size;
    let rotation = 0;
    const speed = 3; // 降低速度
    const rotateSpeed = (Math.random() - 0.5) * 5; // 降低旋转速度

    const animate = () => {
        y += speed;
        rotation += rotateSpeed;
        specialClicker.style.top = `${y}px`;
        specialClicker.style.transform = `rotate(${rotation}deg)`;

        if (y < window.innerHeight) {
            requestAnimationFrame(animate);
        } else {
            specialClicker.remove();
            // 添加到收集窗口
            addToCollection(itemId);
            // 增加点数
            counter += itemConfig.value;
            updateCounter();
        }
    };

    requestAnimationFrame(animate);
}

function addToCollection(itemId) {
    const itemConfig = GAME_CONFIG.SPECIAL_ITEMS[itemId];
    if (!itemConfig || collectedItems[itemId]) return; // 防止重复添加

    // 标记为已收集
    collectedItems[itemId] = true;

    // 更新统计
    collectionStats[itemConfig.rarity]++;
    updateCollectionStats();

    // 创建显示元素
    const itemElement = document.createElement('div');
    itemElement.className = `special-item rarity-${itemConfig.rarity}`;
    itemElement.style.backgroundImage = `url('${itemConfig.image}')`;
    itemElement.setAttribute('data-rarity', getRarityName(itemConfig.rarity));
    itemElement.title = `${itemConfig.name} - ${getRarityName(itemConfig.rarity)}`;

    elements.specialItemsDisplay.appendChild(itemElement);
}

function getRarityName(rarityKey) {
    const rarityNames = {
        'common': '普通',
        'uncommon': '罕见',
        'rare': '稀有',
        'epic': '史诗',
        'legendary': '传奇'
    };
    return rarityNames[rarityKey] || rarityKey;
}

function updateCollectionStats() {
    elements.commonCount.textContent = collectionStats.common;
    elements.uncommonCount.textContent = collectionStats.uncommon;
    elements.rareCount.textContent = collectionStats.rare;
    elements.epicCount.textContent = collectionStats.epic;
    elements.legendaryCount.textContent = collectionStats.legendary;
}

// ============================================
// 核心游戏功能
// ============================================

// 初始化游戏
function initGame() {
    initClickerPool(); // 初始化Clicker对象池
    setupAudio();
    loadGame();
    requestAnimationFrame(updateObjects);
    startProductionIntervals();
    document.addEventListener('click', handleFirstInteraction, { once: true });
}

// 设置音频
function setupAudio() {
    Object.entries(VOLUME).forEach(([key, volume]) => {
        const soundKey = key.toLowerCase() + 'Sound';
        if (audio[soundKey]) audio[soundKey].volume = volume;
    });

    Object.values(audio).forEach(sound => {
        sound?.addEventListener('error', () => console.log(`${sound.id} 加载失败`));
    });
}

// 处理首次交互
function handleFirstInteraction() {
    hasUserInteracted = true;
    try {
        audio.bgMusic.play()
            .then(() => {
                elements.musicHint.textContent = "背景音乐播放中";
                elements.musicHint.style.color = "#4CAF50";
            })
            .catch(e => {
                console.log("自动播放被阻止:", e);
                elements.musicHint.textContent = "点击页面启用音乐";
                elements.musicHint.style.color = "#FF5722";
            });
    } catch (e) {
        console.log("音频播放错误:", e);
        elements.musicHint.textContent = "音乐播放失败";
        elements.musicHint.style.color = "#FF5722";
    }
}

// 非阻塞提示系统
function showToast(message, isError = false) {
    const toast = document.createElement('div');
    toast.className = `toast ${isError ? 'toast-error' : ''}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2000);
    }, 10);
}

// 点击按钮事件
elements.clickBtn.addEventListener('click', () => {
    counter++;
    updateCounter();
    playSound(audio.clickSound);
});

// 开始生产间隔
function startProductionIntervals() {
    // 猫咪自动生产点数（全局）
    setInterval(() => {
        if (catCount > 0) {
            counter += catCount * PRODUCTION.CAT_VALUE;
            updateCounter();
            saveGame();
        }
    }, PRODUCTION.CAT_INTERVAL);
}

// 更新计数器显示（优化版）
let lastClickerTime = 0;
const CLICKER_CREATE_INTERVAL = 50; // 毫秒

function updateCounter() {
    elements.counter.textContent = counter;
    elements.counter.classList.add('counter-animate');
    setTimeout(() => {
        elements.counter.classList.remove('counter-animate');
    }, 300);

    // 控制Clicker创建频率
    const now = Date.now();
    if (hasUserInteracted && now - lastClickerTime > CLICKER_CREATE_INTERVAL) {
        createClicker();
        lastClickerTime = now;

        // 检查特殊物品掉落
        checkSpecialItemDrop();
    }
}

// 播放音效
function playSound(sound, isSpecialItem = false) {
    if (!hasUserInteracted || !sound) return;
    try {
        sound.currentTime = 0;
        if (isSpecialItem) {
            sound.volume = VOLUME.ITEM * 1.5; // 特殊物品音效更响亮
        } else {
            sound.volume = VOLUME.ITEM;
        }
        sound.play().catch(e => console.log(`${sound.id} 播放失败:`, e));
    } catch (e) {
        console.log("音效播放错误:", e);
    }
}

// 购买事件处理
function setupShopEvents() {
    elements.buyCatBtn.addEventListener('click', () => {
        if (counter >= 50) {
            counter -= 50;
            catCount++;
            updateCounter();
            elements.catCount.textContent = `小猫数量: ${catCount}`;
            createAnimal('cat');
            saveGame();
            playSound(audio.clickSound);
        } else {
            showToast('点数不足!', true);
        }
    });

    elements.buyChickenBtn.addEventListener('click', () => {
        if (counter >= 400) {
            counter -= 400;
            chickenCount++;
            updateCounter();
            elements.chickenCount.textContent = `鸡数量: ${chickenCount}`;
            createAnimal('chicken');
            saveGame();
            playSound(audio.clickSound);
        } else {
            showToast('点数不足!', true);
        }
    });

    elements.buyCowBtn.addEventListener('click', () => {
        if (counter >= 1000) {
            counter -= 1000;
            cowCount++;
            updateCounter();
            elements.cowCount.textContent = `奶牛数量: ${cowCount}`;
            createAnimal('cow');
            saveGame();
            playSound(audio.clickSound);
        } else {
            showToast('点数不足!', true);
        }
    });

    elements.buyPigBtn.addEventListener('click', () => {
        if (counter >= 1000) {
            counter -= 1000;
            pigCount++;
            updateCounter();
            elements.pigCount.textContent = `猪数量: ${pigCount}`;
            createAnimal('pig');
            saveGame();
            playSound(audio.pigSound);
        } else {
            showToast('点数不足!', true);
        }
    });

    elements.buyFryingPanBtn.addEventListener('click', () => {
        if (counter >= 5000) {
            counter -= 5000;
            fryingPans++;
            updateCounter();
            elements.fryingPanCount.textContent = `平底锅: ${fryingPans}`;
            updateFryingPanCapacity();

            if (fryingPans === 1) {
                elements.fryingPanContainer.style.display = 'block';
            }

            playSound(audio.fryingPanSound);
            saveGame();
        } else {
            showToast('点数不足!', true);
        }
    });

    elements.buyCatTowerBtn.addEventListener('click', () => {
        if (counter >= 1400) {
            counter -= 1400;
            catTowers++;
            updateCounter();
            elements.catTowerCount.textContent = `猫爬架: ${catTowers}`;
            updateCatTowerCapacity();

            if (catTowers === 1) {
                elements.catTowerContainer.style.display = 'block';
            }

            playSound(audio.catTowerSound);
            saveGame();
        } else {
            showToast('点数不足!', true);
        }
    });

    elements.buyFishTankBtn.addEventListener('click', () => {
        if (counter >= 20000) {
            counter -= 20000;
            fishTanks++;
            updateCounter();
            elements.fishTankCount.textContent = `鱼缸: ${fishTanks}`;

            if (fishTanks === 1) {
                elements.fishTankContainer.style.display = 'block';
            }

            playSound(audio.fishTankSound);
            saveGame();
        } else {
            showToast('点数不足!', true);
        }
    });
}

// 更新煎蛋区容量显示
function updateFryingPanCapacity() {
    elements.fryingPanCapacity.textContent =
        `${friedEggsInPan.length + grilledFishes.length + grilledChickens.length + sausages.length}/${fryingPans * GAME_CONFIG.EGGS_PER_PAN}`;
}

// 更新猫爬架容量显示
function updateCatTowerCapacity() {
    elements.catTowerCapacity.textContent = `${catsInTower}/${catTowers * GAME_CONFIG.CATS_PER_TOWER}`;
}

// 煎蛋系统
function setupFryingPanEvents() {
    elements.addEggBtn.addEventListener('click', () => {
        if (eggs.length > 0) {
            const egg = eggs.pop();
            if (egg.productionInterval) clearInterval(egg.productionInterval);
            if (egg.disappearTimeout) clearTimeout(egg.disappearTimeout);
            egg.element.remove();

            rawEggs++;
            elements.rawEggCount.textContent = rawEggs;
            saveGame();
            playSound(audio.eggSound);
        } else {
            showToast('没有可用的鸡蛋!', true);
        }
    });

    elements.fryEggBtn.addEventListener('click', () => {
        if (rawEggs > 0 && activeFryingPans < fryingPans &&
            friedEggsInPan.length + grilledFishes.length + grilledChickens.length + sausages.length < fryingPans * GAME_CONFIG.EGGS_PER_PAN) {
            rawEggs--;
            activeFryingPans++;
            elements.rawEggCount.textContent = rawEggs;

            const fryingItem = document.createElement('div');
            fryingItem.className = 'frying-item';
            fryingItem.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <span class="frying-status">煎制中... (0%)</span>
            `;
            elements.fryingItemsContainer.appendChild(fryingItem);

            startFryingEgg(fryingItem);
            saveGame();
        } else if (rawEggs <= 0) {
            showToast('没有可用的鸡蛋!', true);
        } else if (friedEggsInPan.length + grilledFishes.length + grilledChickens.length + sausages.length >= fryingPans * GAME_CONFIG.EGGS_PER_PAN) {
            showToast('平底锅已满!', true);
        } else {
            showToast('所有平底锅都在使用中!', true);
        }
    });
}

function startFryingEgg(fryingItem) {
    const progressFill = fryingItem.querySelector('.progress-fill');
    const statusText = fryingItem.querySelector('.frying-status');
    const startTime = Date.now();

    const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / GAME_CONFIG.FRYING_DURATION, 1);

        progressFill.style.width = `${progress * 100}%`;
        statusText.textContent = `煎制中... (${Math.round(progress * 100)}%)`;

        if (progress < 1) {
            requestAnimationFrame(updateProgress);
        } else {
            activeFryingPans--;
            createFriedEgg();

            statusText.textContent = '煎蛋完成!';
            fryingItem.style.backgroundColor = '#e8f5e9';

            setTimeout(() => {
                fryingItem.remove();
            }, 1000);
        }
    };

    updateProgress();
}

function createFriedEgg() {
    const egg = document.createElement('div');
    egg.className = 'fried-egg';
    elements.fryingArea.appendChild(egg);

    const eggObj = {
        element: egg,
        x: Math.random() * (elements.fryingArea.offsetWidth - PHYSICS.FRIED_EGG_SIZE),
        y: -PHYSICS.FRIED_EGG_SIZE,
        velocityY: 0,
        rotation: 0,
        rotationSpeed: (Math.random() * 2 - 1) * 3,
        value: GAME_CONFIG.FRIED_EGG_VALUE,
        productionInterval: null,
        disappearTimeout: null
    };

    playSound(audio.friedEggSound);

    eggObj.productionInterval = setInterval(() => {
        counter += eggObj.value;
        updateCounter();
        playSound(audio.coinSound);
        saveGame();
    }, GAME_CONFIG.EGG_PRODUCTION_RATE);

    eggObj.disappearTimeout = setTimeout(() => {
        clearInterval(eggObj.productionInterval);
        egg.style.transition = 'opacity 0.5s';
        egg.style.opacity = '0';
        setTimeout(() => {
            egg.remove();
            const index = friedEggsInPan.indexOf(eggObj);
            if (index > -1) {
                friedEggsInPan.splice(index, 1);
                updateFryingPanCapacity();
            }
        }, 500);
    }, GAME_CONFIG.FRIED_EGG_DURATION);

    friedEggsInPan.push(eggObj);
    updateFryingPanCapacity();
}

// 烤鸡功能
elements.addGrilledChickenBtn.addEventListener('click', () => {
    if (chickenCount > 0 && activeFryingPans < fryingPans &&
        friedEggsInPan.length + grilledFishes.length + grilledChickens.length + sausages.length < fryingPans * GAME_CONFIG.EGGS_PER_PAN) {
        chickenCount--;
        activeFryingPans++;
        elements.chickenCount.textContent = `鸡数量: ${chickenCount}`;

        // 移除一只鸡
        const chickenToRemove = animals.find(a => a.type === 'chicken');
        if (chickenToRemove) {
            if (chickenToRemove.productionInterval) clearInterval(chickenToRemove.productionInterval);
            chickenToRemove.element.remove();
            animals.splice(animals.indexOf(chickenToRemove), 1);
        }

        const fryingItem = document.createElement('div');
        fryingItem.className = 'frying-item';
        fryingItem.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <span class="frying-status">烤制中... (0%)</span>
        `;
        elements.fryingItemsContainer.appendChild(fryingItem);

        startGrillingChicken(fryingItem);
        saveGame();
    } else if (chickenCount <= 0) {
        showToast('没有可用的鸡!', true);
    } else if (friedEggsInPan.length + grilledFishes.length + grilledChickens.length + sausages.length >= fryingPans * GAME_CONFIG.EGGS_PER_PAN) {
        showToast('平底锅已满!', true);
    } else {
        showToast('所有平底锅都在使用中!', true);
    }
});

function startGrillingChicken(fryingItem) {
    const progressFill = fryingItem.querySelector('.progress-fill');
    const statusText = fryingItem.querySelector('.frying-status');
    const startTime = Date.now();

    const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / GAME_CONFIG.GRILLING_DURATION, 1);

        progressFill.style.width = `${progress * 100}%`;
        statusText.textContent = `烤制中... (${Math.round(progress * 100)}%)`;

        if (progress < 1) {
            requestAnimationFrame(updateProgress);
        } else {
            activeFryingPans--;
            createGrilledChicken();

            statusText.textContent = '烤鸡完成!';
            fryingItem.style.backgroundColor = '#e8f5e9';

            setTimeout(() => {
                fryingItem.remove();
            }, 1000);
        }
    };

    updateProgress();
}

function createGrilledChicken() {
    const grilledChicken = document.createElement('div');
    grilledChicken.className = 'grilled-chicken';
    elements.fryingArea.appendChild(grilledChicken);

    const grilledChickenObj = {
        element: grilledChicken,
        x: Math.random() * (elements.fryingArea.offsetWidth - PHYSICS.GRILLED_CHICKEN_SIZE),
        y: -PHYSICS.GRILLED_CHICKEN_SIZE,
        velocityY: 0,
        rotation: 0,
        rotationSpeed: (Math.random() * 2 - 1) * 3,
        value: GAME_CONFIG.GRILLED_CHICKEN_VALUE,
        productionInterval: null,
        disappearTimeout: null
    };

    playSound(audio.grilledChickenSound);

    grilledChickenObj.productionInterval = setInterval(() => {
        counter += grilledChickenObj.value;
        updateCounter();
        playSound(audio.coinSound);
        saveGame();
    }, 1000);

    grilledChickenObj.disappearTimeout = setTimeout(() => {
        clearInterval(grilledChickenObj.productionInterval);
        grilledChicken.style.transition = 'opacity 0.5s';
        grilledChicken.style.opacity = '0';
        setTimeout(() => {
            grilledChicken.remove();
            const index = grilledChickens.indexOf(grilledChickenObj);
            if (index > -1) {
                grilledChickens.splice(index, 1);
                updateFryingPanCapacity();
            }
        }, 500);
    }, GAME_CONFIG.GRILLED_CHICKEN_DURATION);

    grilledChickens.push(grilledChickenObj);
    updateFryingPanCapacity();
}

// 烤肠功能
elements.addSausageBtn.addEventListener('click', () => {
    if (pigCount > 0 && activeFryingPans < fryingPans) {
        pigCount--;
        activeFryingPans++;
        elements.pigCount.textContent = `猪数量: ${pigCount}`;

        // 移除一头猪
        const pigToRemove = animals.find(a => a.type === 'pig');
        if (pigToRemove) {
            if (pigToRemove.productionInterval) clearInterval(pigToRemove.productionInterval);
            pigToRemove.element.remove();
            animals.splice(animals.indexOf(pigToRemove), 1);
        }

        const fryingItem = document.createElement('div');
        fryingItem.className = 'frying-item';
        fryingItem.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <span class="frying-status">制作中... (0%)</span>
        `;
        elements.fryingItemsContainer.appendChild(fryingItem);

        startMakingSausage(fryingItem);
        saveGame();
    } else if (pigCount <= 0) {
        showToast('没有可用的猪!', true);
    } else {
        showToast('所有平底锅都在使用中!', true);
    }
});

function startMakingSausage(fryingItem) {
    const progressFill = fryingItem.querySelector('.progress-fill');
    const statusText = fryingItem.querySelector('.frying-status');
    const startTime = Date.now();

    const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / GAME_CONFIG.GRILLING_DURATION, 1);

        progressFill.style.width = `${progress * 100}%`;
        statusText.textContent = `制作中... (${Math.round(progress * 100)}%)`;

        if (progress < 1) {
            requestAnimationFrame(updateProgress);
        } else {
            activeFryingPans--;
            createSausages();

            statusText.textContent = '烤肠完成!';
            fryingItem.style.backgroundColor = '#e8f5e9';

            setTimeout(() => {
                fryingItem.remove();
            }, 1000);
        }
    };

    updateProgress();
}

function createSausages() {
    playSound(audio.sausageSound);

    // 随机生成6-10根烤肠
    const sausageCount = Math.floor(Math.random() *
            (GAME_CONFIG.SAUSAGE_MAX_COUNT - GAME_CONFIG.SAUSAGE_MIN_COUNT + 1)) +
        GAME_CONFIG.SAUSAGE_MIN_COUNT;

    for (let i = 0; i < sausageCount; i++) {
        const sausage = document.createElement('div');
        sausage.className = 'sausage';
        elements.fryingArea.appendChild(sausage);

        const sausageObj = {
            element: sausage,
            x: Math.random() * (elements.fryingArea.offsetWidth - 100),
            y: -20,
            velocityY: 0,
            rotation: 0,
            rotationSpeed: (Math.random() * 2 - 1) * 5,
            value: GAME_CONFIG.SAUSAGE_VALUE,
            productionInterval: null,
            disappearTimeout: null
        };

        sausageObj.productionInterval = setInterval(() => {
            counter += sausageObj.value;
            updateCounter();
            playSound(audio.coinSound);
            saveGame();
        }, 1000);

        sausageObj.disappearTimeout = setTimeout(() => {
            clearInterval(sausageObj.productionInterval);
            sausage.style.transition = 'opacity 0.5s';
            sausage.style.opacity = '0';
            setTimeout(() => {
                sausage.remove();
                const index = sausages.indexOf(sausageObj);
                if (index > -1) {
                    sausages.splice(index, 1);
                    updateFryingPanCapacity();
                }
            }, 500);
        }, GAME_CONFIG.SAUSAGE_DURATION);

        sausages.push(sausageObj);
    }

    updateFryingPanCapacity();
}

// 猫爬架系统
function setupCatTowerEvents() {
    elements.addCatToTowerBtn.addEventListener('click', () => {
        if (catCount > 0 && catsInTower < catTowers * GAME_CONFIG.CATS_PER_TOWER) {
            catCount--;
            catsInTower++;
            elements.catCount.textContent = `小猫数量: ${catCount}`;

            const catToRemove = animals.find(a => a.type === 'cat');
            if (catToRemove) {
                if (catToRemove.productionInterval) clearInterval(catToRemove.productionInterval);
                catToRemove.element.remove();
                animals.splice(animals.indexOf(catToRemove), 1);
            }

            const catInTower = document.createElement('div');
            catInTower.className = 'cat-in-tower';
            elements.catTowerArea.appendChild(catInTower);

            const catObj = {
                element: catInTower,
                x: Math.random() * (elements.catTowerArea.offsetWidth - 50),
                y: Math.random() * (elements.catTowerArea.offsetHeight - 50),
                velocityY: -2,
                velocityX: (Math.random() * 2 - 1),
                rotation: 0,
                rotationSpeed: (Math.random() * 2 - 1) * 3,
                productionInterval: null,
                removed: false
            };

            const updateCat = () => {
                catObj.velocityY += PHYSICS.TOWER_GRAVITY;
                catObj.x += catObj.velocityX;
                catObj.y += catObj.velocityY;
                catObj.rotation += catObj.rotationSpeed;

                if (catObj.x <= 0 || catObj.x >= elements.catTowerArea.offsetWidth - 50) {
                    catObj.velocityX *= -1;
                    catObj.x = Math.max(0, Math.min(catObj.x, elements.catTowerArea.offsetWidth - 50));
                }

                if (catObj.y <= 0) {
                    catObj.y = 0;
                    catObj.velocityY = -catObj.velocityY * PHYSICS.TOWER_BOUNCE;
                } else if (catObj.y >= elements.catTowerArea.offsetHeight - 50) {
                    catObj.y = elements.catTowerArea.offsetHeight - 50;
                    catObj.velocityY = -Math.abs(catObj.velocityY) * PHYSICS.TOWER_BOUNCE;
                }

                catInTower.style.left = `${catObj.x}px`;
                catInTower.style.top = `${catObj.y}px`;
                catInTower.style.transform = `rotate(${catObj.rotation}deg)`;

                if (!catObj.removed) {
                    requestAnimationFrame(updateCat);
                }
            };

            catObj.productionInterval = setInterval(() => {
                counter += GAME_CONFIG.CAT_TOWER_VALUE;
                updateCounter();
                playSound(audio.coinSound);
                saveGame();
            }, 1000);

            catsInTowerArea.push(catObj);
            updateCatTowerCapacity();
            updateCat();
            saveGame();
        } else if (catCount <= 0) {
            showToast('没有可用的猫咪!', true);
        } else {
            showToast('猫爬架已满!', true);
        }
    });
}

// 鱼缸系统
function setupFishTankEvents() {
    elements.addFishToPanBtn.addEventListener('click', () => {
        if (fishesInTank.length > 0 && activeFryingPans < fryingPans &&
            friedEggsInPan.length + grilledFishes.length + grilledChickens.length + sausages.length < fryingPans * GAME_CONFIG.EGGS_PER_PAN) {
            const fish = fishesInTank.pop();
            clearInterval(fish.productionInterval);
            fish.removed = true;
            fish.element.remove();
            fishCount--;
            elements.fishCount.textContent = `鱼数量: ${fishCount}`;

            const fryingItem = document.createElement('div');
            fryingItem.className = 'frying-item';
            fryingItem.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <span class="frying-status">烤制中... (0%)</span>
            `;
            elements.fryingItemsContainer.appendChild(fryingItem);

            startGrillingFish(fryingItem);
            saveGame();
        } else if (fishesInTank.length <= 0) {
            showToast('没有可用的鱼!', true);
        } else if (friedEggsInPan.length + grilledFishes.length + grilledChickens.length + sausages.length >= fryingPans * GAME_CONFIG.EGGS_PER_PAN) {
            showToast('平底锅已满!', true);
        } else {
            showToast('所有平底锅都在使用中!', true);
        }
    });

    elements.buyFishBtn.addEventListener('click', () => {
        if (counter >= 700) {
            counter -= 700;
            fishCount++;
            updateCounter();
            elements.fishCount.textContent = `鱼数量: ${fishCount}`;
            createFish();
            saveGame();
        } else {
            showToast('点数不足!', true);
        }
    });

    elements.buySquidBtn.addEventListener('click', () => {
        if (counter >= 5500) {
            counter -= 5500;
            squidCount++;
            updateCounter();
            elements.squidCount.textContent = `墨鱼数量: ${squidCount}`;
            createSquid();
            saveGame();
        } else {
            showToast('点数不足!', true);
        }
    });
}

function startGrillingFish(fryingItem) {
    const progressFill = fryingItem.querySelector('.progress-fill');
    const statusText = fryingItem.querySelector('.frying-status');
    const startTime = Date.now();

    const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / GAME_CONFIG.GRILLING_DURATION, 1);

        progressFill.style.width = `${progress * 100}%`;
        statusText.textContent = `烤制中... (${Math.round(progress * 100)}%)`;

        if (progress < 1) {
            requestAnimationFrame(updateProgress);
        } else {
            activeFryingPans--;
            createGrilledFish();

            statusText.textContent = '烤鱼完成!';
            fryingItem.style.backgroundColor = '#e8f5e9';

            setTimeout(() => {
                fryingItem.remove();
            }, 1000);
        }
    };

    updateProgress();
}

// 创建鱼
function createFish() {
    const fish = document.createElement('div');
    fish.className = 'fish';
    elements.fishTankArea.appendChild(fish);

    const fishObj = {
        element: fish,
        x: Math.random() * (elements.fishTankArea.offsetWidth - 70),
        y: Math.random() * (elements.fishTankArea.offsetHeight - 50),
        velocityX: (Math.random() * 2 - 1) * PHYSICS.FISH_SPEED,
        velocityY: (Math.random() * 2 - 1) * PHYSICS.FISH_SPEED,
        rotation: 0,
        rotationSpeed: (Math.random() * 2 - 1) * 2,
        value: GAME_CONFIG.FISH_VALUE,
        productionInterval: null,
        removed: false
    };

    const updateFish = () => {
        fishObj.x += fishObj.velocityX;
        fishObj.y += fishObj.velocityY;
        fishObj.rotation += fishObj.rotationSpeed;

        if (fishObj.x <= 0 || fishObj.x >= elements.fishTankArea.offsetWidth - 70) {
            fishObj.velocityX *= -1;
            fishObj.x = Math.max(0, Math.min(fishObj.x, elements.fishTankArea.offsetWidth - 70));
        }

        if (fishObj.y <= 0 || fishObj.y >= elements.fishTankArea.offsetHeight - 50) {
            fishObj.velocityY *= -1;
            fishObj.y = Math.max(0, Math.min(fishObj.y, elements.fishTankArea.offsetHeight - 50));
        }

        fish.style.left = `${fishObj.x}px`;
        fish.style.top = `${fishObj.y}px`;
        fish.style.transform = `rotate(${fishObj.rotation}deg)`;

        if (!fishObj.removed) {
            requestAnimationFrame(updateFish);
        }
    };

    fishObj.productionInterval = setInterval(() => {
        counter += fishObj.value;
        updateCounter();
        playSound(audio.coinSound);
        saveGame();
    }, GAME_CONFIG.FISH_PRODUCTION_INTERVAL);

    fishesInTank.push(fishObj);
    playSound(audio.fishSound);
    updateFish();
}

// 创建墨鱼
function createSquid() {
    const squid = document.createElement('div');
    squid.className = 'squid';
    elements.fishTankArea.appendChild(squid);

    const squidObj = {
        element: squid,
        x: Math.random() * (elements.fishTankArea.offsetWidth - 70),
        y: Math.random() * (elements.fishTankArea.offsetHeight - 50),
        velocityX: (Math.random() * 2 - 1) * PHYSICS.SQUID_SPEED,
        velocityY: (Math.random() * 2 - 1) * PHYSICS.SQUID_SPEED,
        rotation: 0,
        rotationSpeed: (Math.random() * 2 - 1) * 2,
        value: GAME_CONFIG.SQUID_VALUE,
        productionInterval: null,
        removed: false
    };

    const updateSquid = () => {
        squidObj.x += squidObj.velocityX;
        squidObj.y += squidObj.velocityY;
        squidObj.rotation += squidObj.rotationSpeed;

        if (squidObj.x <= 0 || squidObj.x >= elements.fishTankArea.offsetWidth - 70) {
            squidObj.velocityX *= -1;
            squidObj.x = Math.max(0, Math.min(squidObj.x, elements.fishTankArea.offsetWidth - 70));
        }

        if (squidObj.y <= 0 || squidObj.y >= elements.fishTankArea.offsetHeight - 50) {
            squidObj.velocityY *= -1;
            squidObj.y = Math.max(0, Math.min(squidObj.y, elements.fishTankArea.offsetHeight - 50));
        }

        squid.style.left = `${squidObj.x}px`;
        squid.style.top = `${squidObj.y}px`;
        squid.style.transform = `rotate(${squidObj.rotation}deg)`;

        if (!squidObj.removed) {
            requestAnimationFrame(updateSquid);
        }
    };

    squidObj.productionInterval = setInterval(() => {
        counter += squidObj.value;
        updateCounter();
        playSound(audio.coinSound);
        saveGame();
    }, GAME_CONFIG.SQUID_PRODUCTION_INTERVAL);

    squidsInTank.push(squidObj);
    playSound(audio.squidSound);
    updateSquid();
}

// 创建烤鱼
function createGrilledFish() {
    const grilledFish = document.createElement('div');
    grilledFish.className = 'grilled-fish';
    elements.fryingArea.appendChild(grilledFish);

    const grilledFishObj = {
        element: grilledFish,
        x: Math.random() * (elements.fryingArea.offsetWidth - 100),
        y: -30,
        velocityY: 0,
        rotation: 0,
        rotationSpeed: (Math.random() * 2 - 1) * 3,
        value: GAME_CONFIG.GRILLED_FISH_VALUE,
        productionInterval: null,
        disappearTimeout: null
    };

    playSound(audio.grilledFishSound);

    grilledFishObj.productionInterval = setInterval(() => {
        counter += grilledFishObj.value;
        updateCounter();
        playSound(audio.coinSound);
        saveGame();
    }, 1000);

    grilledFishObj.disappearTimeout = setTimeout(() => {
        clearInterval(grilledFishObj.productionInterval);
        grilledFish.style.transition = 'opacity 0.5s';
        grilledFish.style.opacity = '0';
        setTimeout(() => {
            grilledFish.remove();
            const index = grilledFishes.indexOf(grilledFishObj);
            if (index > -1) {
                grilledFishes.splice(index, 1);
                updateFryingPanCapacity();
            }
        }, 500);
    }, GAME_CONFIG.GRILLED_FISH_DURATION);

    grilledFishes.push(grilledFishObj);
    updateFryingPanCapacity();
}

// 创建动物
function createAnimal(type) {
    const animal = document.createElement('div');
    animal.className = type;

    const containerRect = elements.animalsContainer.getBoundingClientRect();
    const startX = Math.random() * (containerRect.width - PHYSICS[`${type.toUpperCase()}_SIZE`]);
    const startY = Math.max(0, Math.random() * containerRect.height * 0.3);

    const animalObj = {
        element: animal,
        type: type,
        x: startX,
        y: startY,
        velocityX: (Math.random() * 2 - 1) * PHYSICS.INITIAL_X_VELOCITY,
        velocityY: 0,
        rotation: 0,
        rotationSpeed: (Math.random() * 2 - 1) * PHYSICS.ROTATION_SPEED,
        productionInterval: null
    };

    // 根据动物类型设置生产间隔
    if (type === 'cat') {
        animalObj.productionInterval = setInterval(() => {
            counter += PRODUCTION.CAT_VALUE;
            updateCounter();
            playSound(audio.coinSound);
            saveGame();
        }, PRODUCTION.CAT_INTERVAL);
    } else if (type === 'cow') {
        animalObj.productionInterval = setInterval(() => {
            createMilk();
        }, GAME_CONFIG.COW_PRODUCTION_INTERVAL);
    } else if (type === 'chicken') {
        animalObj.productionInterval = setInterval(() => {
            createEgg();
        }, GAME_CONFIG.CHICKEN_PRODUCTION_INTERVAL);
    } else if (type === 'pig') {
        animalObj.productionInterval = setInterval(() => {
            counter += PRODUCTION.PIG_VALUE;
            updateCounter();
            playSound(audio.coinSound);
            saveGame();
        }, GAME_CONFIG.PIG_PRODUCTION_INTERVAL);
    }

    animal.style.left = `${animalObj.x}px`;
    animal.style.top = `${animalObj.y}px`;
    elements.animalsContainer.appendChild(animal);
    animals.push(animalObj);

    setTimeout(() => {
        const soundMap = {
            'cat': audio.meowSound,
            'chicken': audio.chickenSound,
            'cow': audio.cowSound,
            'pig': audio.pigSound
        };
        playSound(soundMap[type]);
    }, Math.random() * 500);

    return animalObj;
}

// 创建牛奶
function createMilk() {
    const milk = document.createElement('div');
    milk.className = 'milk';

    const containerRect = elements.animalsContainer.getBoundingClientRect();
    const startX = Math.random() * (containerRect.width - PHYSICS.MILK_SIZE);
    const startY = Math.max(0, Math.random() * containerRect.height * 0.3);

    const milkObj = {
        element: milk,
        x: startX,
        y: startY,
        velocityX: (Math.random() * 2 - 1) * PHYSICS.INITIAL_X_VELOCITY,
        velocityY: 0,
        rotation: 0,
        rotationSpeed: (Math.random() * 2 - 1) * PHYSICS.ROTATION_SPEED,
        value: PRODUCTION.MILK_VALUE,
        productionInterval: null,
        disappearTimeout: null
    };

    milk.style.left = `${milkObj.x}px`;
    milk.style.top = `${milkObj.y}px`;
    elements.animalsContainer.appendChild(milk);

    milkObj.productionInterval = setInterval(() => {
        counter += milkObj.value;
        updateCounter();
        playSound(audio.coinSound);
        saveGame();
    }, GAME_CONFIG.MILK_PRODUCTION_RATE);

    milkObj.disappearTimeout = setTimeout(() => {
        clearInterval(milkObj.productionInterval);
        milk.style.transition = 'opacity 0.5s';
        milk.style.opacity = '0';

        setTimeout(() => {
            milk.remove();
            const index = milks.indexOf(milkObj);
            if (index > -1) {
                milks.splice(index, 1);
            }
        }, 500);
    }, GAME_CONFIG.MILK_DURATION);

    milks.push(milkObj);
    playSound(audio.milkSound);
}

// 创建鸡蛋
function createEgg() {
    const egg = document.createElement('div');
    egg.className = 'egg';

    const containerRect = elements.animalsContainer.getBoundingClientRect();
    const startX = Math.random() * (containerRect.width - PHYSICS.EGG_SIZE);
    const startY = Math.max(0, Math.random() * containerRect.height * 0.3);

    const eggObj = {
        element: egg,
        x: startX,
        y: startY,
        velocityX: (Math.random() * 2 - 1) * PHYSICS.INITIAL_X_VELOCITY,
        velocityY: 0,
        rotation: 0,
        rotationSpeed: (Math.random() * 2 - 1) * PHYSICS.ROTATION_SPEED,
        value: PRODUCTION.EGG_VALUE,
        productionInterval: null,
        disappearTimeout: null
    };

    egg.style.left = `${eggObj.x}px`;
    egg.style.top = `${eggObj.y}px`;
    elements.animalsContainer.appendChild(egg);

    eggObj.productionInterval = setInterval(() => {
        counter += eggObj.value;
        updateCounter();
        playSound(audio.coinSound);
        saveGame();
    }, GAME_CONFIG.EGG_PRODUCTION_RATE);

    eggObj.disappearTimeout = setTimeout(() => {
        clearInterval(eggObj.productionInterval);
        egg.style.transition = 'opacity 0.5s';
        egg.style.opacity = '0';

        setTimeout(() => {
            egg.remove();
            const index = eggs.indexOf(eggObj);
            if (index > -1) {
                eggs.splice(index, 1);
            }
        }, 500);
    }, GAME_CONFIG.EGG_DURATION);

    eggs.push(eggObj);
    playSound(audio.eggSound);
}

// 更新所有物体位置
function updateObjects() {
    const containerRect = elements.animalsContainer.getBoundingClientRect();

    animals.forEach(animal => {
        updatePhysics(animal, PHYSICS[`${animal.type.toUpperCase()}_SIZE`]);
    });

    milks.forEach(milk => {
        updatePhysics(milk, PHYSICS.MILK_SIZE);
    });

    eggs.forEach(egg => {
        updatePhysics(egg, PHYSICS.EGG_SIZE);
    });

    catsInTowerArea.forEach(cat => {
        if (!cat.removed) {
            cat.element.style.left = `${cat.x}px`;
            cat.element.style.top = `${cat.y}px`;
            cat.element.style.transform = `rotate(${cat.rotation}deg)`;
        }
    });

    friedEggsInPan.forEach(egg => {
        egg.velocityY += PHYSICS.GRAVITY * 0.5;
        egg.y += egg.velocityY;
        egg.rotation += egg.rotationSpeed;

        egg.element.style.left = `${egg.x}px`;
        egg.element.style.top = `${egg.y}px`;
        egg.element.style.transform = `rotate(${egg.rotation}deg)`;

        if (egg.y + 100 >= elements.fryingArea.offsetHeight) {  // 修改为100
            egg.y = elements.fryingArea.offsetHeight - 100;
            egg.velocityY *= -PHYSICS.BOUNCE * 0.5;
        }
    });

    grilledFishes.forEach(fish => {
        fish.velocityY += PHYSICS.GRAVITY * 0.5;
        fish.y += fish.velocityY;
        fish.rotation += fish.rotationSpeed;

        fish.element.style.left = `${fish.x}px`;
        fish.element.style.top = `${fish.y}px`;
        fish.element.style.transform = `rotate(${fish.rotation}deg)`;

        if (fish.y + 100 >= elements.fryingArea.offsetHeight) {  // 修改为100
            fish.y = elements.fryingArea.offsetHeight - 100;
            fish.velocityY *= -PHYSICS.BOUNCE * 0.5;
        }
    });

    grilledChickens.forEach(chicken => {
        chicken.velocityY += PHYSICS.GRAVITY * 0.5;
        chicken.y += chicken.velocityY;
        chicken.rotation += chicken.rotationSpeed;

        chicken.element.style.left = `${chicken.x}px`;
        chicken.element.style.top = `${chicken.y}px`;
        chicken.element.style.transform = `rotate(${chicken.rotation}deg)`;

        if (chicken.y + 100 >= elements.fryingArea.offsetHeight) {  // 修改为100
            chicken.y = elements.fryingArea.offsetHeight - 100;
            chicken.velocityY *= -PHYSICS.BOUNCE * 0.5;
        }
    });

    sausages.forEach(sausage => {
        sausage.velocityY += PHYSICS.GRAVITY * 0.5;
        sausage.y += sausage.velocityY;
        sausage.rotation += sausage.rotationSpeed;

        sausage.element.style.left = `${sausage.x}px`;
        sausage.element.style.top = `${sausage.y}px`;
        sausage.element.style.transform = `rotate(${sausage.rotation}deg)`;

        if (sausage.y + 50 >= elements.fryingArea.offsetHeight) {  // 修改为50
            sausage.y = elements.fryingArea.offsetHeight - 50;
            sausage.velocityY *= -PHYSICS.BOUNCE * 0.5;
        }
    });

    requestAnimationFrame(updateObjects);
}

// 物理更新
function updatePhysics(obj, size) {
    obj.velocityY += PHYSICS.GRAVITY;
    obj.x += obj.velocityX;
    obj.y += obj.velocityY;
    obj.rotation += obj.rotationSpeed;

    handleBoundaryCollision(obj, size);
    updateElementPosition(obj);
}

// 边界碰撞处理
function handleBoundaryCollision(obj, size) {
    const containerRect = elements.animalsContainer.getBoundingClientRect();

    if (obj.x <= 0) {
        obj.x = 0;
        obj.velocityX *= -PHYSICS.BOUNCE;
    } else if (obj.x >= containerRect.width - size) {
        obj.x = containerRect.width - size;
        obj.velocityX *= -PHYSICS.BOUNCE;
    }

    if (obj.y >= containerRect.height - size) {
        obj.y = containerRect.height - size;
        obj.velocityY *= -PHYSICS.BOUNCE;
    }

    if (obj.y <= 0) {
        obj.y = 0;
        obj.velocityY = 0;
    }
}

// 更新元素位置
function updateElementPosition(obj) {
    obj.element.style.left = `${obj.x}px`;
    obj.element.style.top = `${obj.y}px`;
    obj.element.style.transform = `rotate(${obj.rotation}deg)`;
}

// 重置游戏
function resetGame() {
    if (confirm('确定要重置游戏吗？所有进度将丢失！')) {
        // 清除所有物品和动物的间隔和超时
        [...milks, ...eggs, ...friedEggsInPan, ...grilledFishes, ...grilledChickens, ...sausages].forEach(item => {
            if (item.productionInterval) clearInterval(item.productionInterval);
            if (item.disappearTimeout) clearTimeout(item.disappearTimeout);
        });

        animals.forEach(animal => {
            if (animal.productionInterval) clearInterval(animal.productionInterval);
        });

        catsInTowerArea.forEach(cat => {
            if (cat.productionInterval) clearInterval(cat.productionInterval);
            cat.removed = true;
        });

        fishesInTank.forEach(fish => {
            if (fish.productionInterval) clearInterval(fish.productionInterval);
            fish.removed = true;
        });

        squidsInTank.forEach(squid => {
            if (squid.productionInterval) clearInterval(squid.productionInterval);
            squid.removed = true;
        });

        // 清理Clicker元素
        clickers.forEach(clicker => {
            clicker.element.remove();
        });
        clickers.length = 0;

        // 重置对象池
        clickerPool.forEach(poolItem => {
            poolItem.inUse = false;
            poolItem.element.style.display = 'none';
        });

        // 重置所有状态变量
        counter = 0;
        catCount = 0;
        chickenCount = 0;
        cowCount = 0;
        pigCount = 0;
        fryingPans = 0;
        activeFryingPans = 0;
        rawEggs = 0;
        catTowers = 0;
        catsInTower = 0;
        fishTanks = 0;
        fishCount = 0;
        squidCount = 0;
        grilledChickens = [];
        sausages = [];

        // 重置收集统计
        collectionStats = {
            common: 0,
            uncommon: 0,
            rare: 0,
            epic: 0,
            legendary: 0
        };

        // 重置已收集物品记录
        collectedItems = {};

        // 清空所有DOM元素
        elements.animalsContainer.innerHTML = '';
        elements.fryingItemsContainer.innerHTML = '';
        elements.fryingArea.innerHTML = '';
        elements.catTowerArea.innerHTML = '';
        elements.fishTankArea.innerHTML = '';
        elements.specialItemsDisplay.innerHTML = '';

        // 隐藏特殊容器
        elements.fryingPanContainer.style.display = 'none';
        elements.catTowerContainer.style.display = 'none';
        elements.fishTankContainer.style.display = 'none';

        // 更新所有显示
        updateCounter();
        elements.catCount.textContent = '小猫数量: 0';
        elements.chickenCount.textContent = '鸡数量: 0';
        elements.cowCount.textContent = '奶牛数量: 0';
        elements.pigCount.textContent = '猪数量: 0';
        elements.rawEggCount.textContent = '0';
        elements.fryingPanCount.textContent = '平底锅: 0';
        elements.catTowerCount.textContent = '猫爬架: 0';
        elements.fishTankCount.textContent = '鱼缸: 0';
        elements.fishCount.textContent = '鱼数量: 0';
        elements.squidCount.textContent = '墨鱼数量: 0';
        elements.fryingPanCapacity.textContent = '0/0';
        elements.catTowerCapacity.textContent = '0/0';
        updateCollectionStats();

        // 清除本地存储
        localStorage.removeItem('animalGame');

        playSound(audio.clickSound);
    }
}

// 保存游戏
function saveGame() {
    const gameState = {
        counter,
        catCount,
        chickenCount,
        cowCount,
        pigCount,
        fryingPans,
        rawEggs,
        catTowers,
        catsInTower,
        fishTanks,
        fishCount,
        squidCount,
        collectionStats,
        collectedItems,  // 保存已收集物品记录
        version: 2.5  // 更新版本号
    };
    localStorage.setItem('animalGame', JSON.stringify(gameState));
}

// 加载游戏
function loadGame() {
    const savedGame = localStorage.getItem('animalGame');
    if (savedGame) {
        try {
            const gameState = JSON.parse(savedGame);

            // 基础状态恢复
            counter = gameState.counter || 0;
            catCount = gameState.catCount || 0;
            chickenCount = gameState.chickenCount || 0;
            cowCount = gameState.cowCount || 0;
            pigCount = gameState.pigCount || 0;
            fryingPans = gameState.fryingPans || 0;
            rawEggs = gameState.rawEggs || 0;
            catTowers = gameState.catTowers || 0;
            catsInTower = gameState.catsInTower || 0;
            fishTanks = gameState.fishTanks || 0;
            fishCount = gameState.fishCount || 0;
            squidCount = gameState.squidCount || 0;
            collectionStats = gameState.collectionStats || {
                common: 0,
                uncommon: 0,
                rare: 0,
                epic: 0,
                legendary: 0
            };
            collectedItems = gameState.collectedItems || {};

            // 更新UI
            updateCounter();
            elements.catCount.textContent = `小猫数量: ${catCount}`;
            elements.chickenCount.textContent = `鸡数量: ${chickenCount}`;
            elements.cowCount.textContent = `奶牛数量: ${cowCount}`;
            elements.pigCount.textContent = `猪数量: ${pigCount}`;
            elements.fryingPanCount.textContent = `平底锅: ${fryingPans}`;
            elements.rawEggCount.textContent = rawEggs;
            elements.catTowerCount.textContent = `猫爬架: ${catTowers}`;
            elements.fishTankCount.textContent = `鱼缸: ${fishTanks}`;
            elements.fishCount.textContent = `鱼数量: ${fishCount}`;
            elements.squidCount.textContent = `墨鱼数量: ${squidCount}`;
            updateFryingPanCapacity();
            updateCatTowerCapacity();
            updateCollectionStats();

            // 显示已解锁的特殊容器
            if (fryingPans > 0) elements.fryingPanContainer.style.display = 'block';
            if (catTowers > 0) elements.catTowerContainer.style.display = 'block';
            if (fishTanks > 0) elements.fishTankContainer.style.display = 'block';

            // 恢复特殊物品收集
            elements.specialItemsDisplay.innerHTML = ''; // 先清空
            Object.entries(GAME_CONFIG.SPECIAL_ITEMS).forEach(([itemId, itemConfig]) => {
                if (collectedItems[itemId]) {
                    const itemElement = document.createElement('div');
                    itemElement.className = `special-item rarity-${itemConfig.rarity}`;
                    itemElement.style.backgroundImage = `url('${itemConfig.image}')`;
                    itemElement.setAttribute('data-rarity', getRarityName(itemConfig.rarity));
                    itemElement.title = `${itemConfig.name} - ${getRarityName(itemConfig.rarity)}`;
                    elements.specialItemsDisplay.appendChild(itemElement);
                }
            });

            // 重新创建动物
            const createPromises = [];
            for (let i = 0; i < catCount; i++) createPromises.push(createAnimal('cat'));
            for (let i = 0; i < chickenCount; i++) createPromises.push(createAnimal('chicken'));
            for (let i = 0; i < cowCount; i++) createPromises.push(createAnimal('cow'));
            for (let i = 0; i < pigCount; i++) createPromises.push(createAnimal('pig'));
            for (let i = 0; i < fishCount; i++) createPromises.push(createFish());
            for (let i = 0; i < squidCount; i++) createPromises.push(createSquid());

            // 恢复猫爬架上的猫
            if (catsInTower > 0) {
                const maxCats = catTowers * GAME_CONFIG.CATS_PER_TOWER;
                for (let i = 0; i < Math.min(catsInTower, maxCats); i++) {
                    createPromises.push(new Promise(resolve => {
                        const catInTower = document.createElement('div');
                        catInTower.className = 'cat-in-tower';
                        elements.catTowerArea.appendChild(catInTower);

                        const catObj = {
                            element: catInTower,
                            x: Math.random() * (elements.catTowerArea.offsetWidth - 50),
                            y: Math.random() * (elements.catTowerArea.offsetHeight - 50),
                            velocityY: -2,
                            velocityX: (Math.random() * 2 - 1),
                            rotation: 0,
                            rotationSpeed: (Math.random() * 2 - 1) * 3,
                            productionInterval: setInterval(() => {
                                counter += GAME_CONFIG.CAT_TOWER_VALUE;
                                updateCounter();
                                playSound(audio.coinSound);
                                saveGame();
                            }, 1000),
                            removed: false
                        };

                        const updateCat = () => {
                            catObj.velocityY += PHYSICS.TOWER_GRAVITY;
                            catObj.x += catObj.velocityX;
                            catObj.y += catObj.velocityY;
                            catObj.rotation += catObj.rotationSpeed;

                            if (catObj.x <= 0 || catObj.x >= elements.catTowerArea.offsetWidth - 50) {
                                catObj.velocityX *= -1;
                                catObj.x = Math.max(0, Math.min(catObj.x, elements.catTowerArea.offsetWidth - 50));
                            }

                            if (catObj.y <= 0) {
                                catObj.y = 0;
                                catObj.velocityY = -catObj.velocityY * PHYSICS.TOWER_BOUNCE;
                            } else if (catObj.y >= elements.catTowerArea.offsetHeight - 50) {
                                catObj.y = elements.catTowerArea.offsetHeight - 50;
                                catObj.velocityY = -Math.abs(catObj.velocityY) * PHYSICS.TOWER_BOUNCE;
                            }

                            catInTower.style.left = `${catObj.x}px`;
                            catInTower.style.top = `${catObj.y}px`;
                            catInTower.style.transform = `rotate(${catObj.rotation}deg)`;

                            if (!catObj.removed) {
                                requestAnimationFrame(updateCat);
                            }
                        };

                        catsInTowerArea.push(catObj);
                        updateCat();
                        resolve();
                    }));
                }
            }

            Promise.all(createPromises).then(() => {
                console.log('游戏加载完成');
            });
        } catch (e) {
            console.error('加载游戏失败:', e);
            resetGame();
        }
    }
}

// 设置商店事件
setupShopEvents();
setupFryingPanEvents();
setupCatTowerEvents();
setupFishTankEvents();

// 重置按钮事件
elements.resetBtn.addEventListener('click', resetGame);

// 初始化游戏
initGame();