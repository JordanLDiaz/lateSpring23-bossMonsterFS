// SECTION boss, hero, sidekick data
const boss = {
  name: "Rat-a-tat-tat",
  health: 100,
  maxHealth: 100,
  damage: 5,
  level: 1,
  image: "assets/squirrel-mafia.gif"
}

const hero = {
  name: 'SuperCat',
  health: 100,
  maxHealth: 100,
  damage: 5,
  coin: 0,
  image: "assets/superCat.gif"
}

const sidekicks = [
  {
    name: 'Kneady Boy',
    type: 'damage',
    image: "assets/kneady-boy2.gif",
    cost: 100,
    value: 5,
    isPurchased: false
  },
  {
    name: 'Major SideEye',
    type: 'damage',
    image: "assets/major-sideeye.gif",
    cost: 200,
    value: 10,
    isPurchased: false
  },
  {
    name: 'Lazer Kitty',
    type: 'healing',
    image: "assets/lazer-kitty2.gif",
    cost: 500,
    value: 20,
    isPurchased: false
  },
  {
    name: "Rock n Gato",
    type: 'damage',
    image: "assets/rock'n'gato.gif",
    cost: 1000,
    value: 25,
    isPurchased: false
  },
]

// SECTION draw functions for hero, boss, stats, coins
function drawHero() {
  let heroTemplate = ''
  heroTemplate += `
  <img class="img-fluid hero" src="${hero.image}">
  <h5 class="text-center">${hero.name}</h5>
  `
  // @ts-ignore
  document.getElementById('hero').innerHTML = heroTemplate
}

function drawHeroStats() {
  let heroStatsTemplate = ''
  heroStatsTemplate += `
  <h5 class="mx-2">Health: <span>${hero.health}</span></h5>
  <h5 class="mx-2">Damage: <span>${hero.damage}</span></h5>
  `
  // @ts-ignore
  document.getElementById('hero-stats').innerHTML = heroStatsTemplate
}

function drawBoss() {
  let bossTemplate = ''
  bossTemplate += `
  <img onclick="attackBoss()" class="img-fluid" src="${boss.image}">
  <h4>${boss.name}</h4>
  `
  // @ts-ignore
  document.getElementById('boss').innerHTML = bossTemplate
}

function drawBossStats() {
  let bossStatsTemplate = ''
  bossStatsTemplate += `
  <h5>Level: <span>${boss.level}</span></h5>
  <div class="progress" role="progressbar" aria-label="Danger striped progress bar" aria-valuenow="${boss.health / boss.maxHealth * 100}"
    aria-valuemin="0" aria-valuemax="${boss.maxHealth}">
    <div class="progress-bar progress-bar-striped bg-danger" style="width:${boss.health / boss.maxHealth * 100}%"></div>
  </div>
  <div class="d-flex justify-content-evenly text-center">
  <p>Health: <span>${boss.health}</span></p>
  <p>Damage: <span>${boss.damage}</span></p>
  </div>
  `
  // @ts-ignore
  document.getElementById('boss-stats').innerHTML = bossStatsTemplate
}

function drawCoins() {
  // @ts-ignore
  document.getElementById('coin').innerText = hero.coin
}

// SECTION base game logic (no companions)
function attackBoss() {
  // first add an onclick to boss img in boss template, then make sure button is hooked up
  // console.log('attacking boss');

  // decrease bosses health by hero's damage
  boss.health -= hero.damage
  // console.log('[BOSSES HEALTH]', boss.health);

  // give hero $ each time they attack, redraw coins
  hero.coin += boss.level
  // console.log('[HERO COINS]', hero.coin);
  drawCoins()

  // check that bosses health is < 0
  if (boss.health <= 0) {
    // alert player that they defeated boss, move onto next level
    if (window.confirm('You defeated the boss and earned a bonus! Ready for the next level?')) {
      // call levelUp to reset boss to next level's stats
      levelUpBoss()
    }

    // after user confirms/levels up boss, increase amount of damage hero can cause
    hero.damage += 5
    // reset hero health to 100 and redraw hero stats
    hero.health = 100
    drawHeroStats()
    // give player bonus $ for winning level, redraw coins
    hero.coin += 100
    drawCoins()
  }
  drawBossStats()
}

function levelUpBoss() {
  // increase boss level by 1
  boss.level++
  // increase boss damage by current damage *2
  boss.damage = boss.damage * 2
  // reset boss health and increase it by level * 100
  boss.health = boss.level * 100
  // reset the maxHealth to the new health
  boss.maxHealth = boss.health
}

function bossAttacks() {
  // decrease hero's healthy by boss damage
  hero.health -= boss.damage
  // if hero dies...
  if (hero.health < 0) {
    hero.health = 0
    hero.coin = 0
    drawCoins()
    window.alert('Oh no! You have been defeated by Rat-a-tat-tat. GAME OVER ☠️')
  }
  drawHeroStats()
}

setInterval(bossAttacks, 5000)

// SECTION Start fireside here by adding companions (companion array exists in data section)
// NOTE lets start by writing functions to buy Kneady Boy as sidekick


// SECTION call draw functions on page load
drawHero()
drawHeroStats()
drawBoss()
drawBossStats()
drawCoins()