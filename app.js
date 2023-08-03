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
    value: 15,
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
  // This is a check that ensures bosses health doesn't dip below 0
  if (boss.health < 0) {
    boss.health = 0
  }

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
// NOTE lets start by writing functions to draw Kneady Boy as sidekick
// function drawKneadyBoy() {
//   // I always start with a console to make sure function is working
//   // console.log('drawing kneady boy')
//   // create a template for kneady boy, which will be an empty string
//   let kneadyBoyTemplate = ''
//   // add to the template the html for kneady boy
//   kneadyBoyTemplate += `
//   <img class="img-fluid sidekick" src="${sidekicks[0].image}">
//   <h5>${sidekicks[0].name}</h5>
//   `
//   // @ts-ignore
//   document.getElementById('kneady-boy').innerHTML = kneadyBoyTemplate
// }
// drawKneadyBoy()

// NOTE now lets create a function that lets us buy kneady boy
// function buyKneadyBoy() {
//   // first i want to check that he isnt purchased yet, and that I have enough 🪙 to purchase
//   if (hero.coin >= sidekicks[0].cost && !sidekicks[0].isPurchased) {
//     // change is purchased to true
//     sidekicks[0].isPurchased = true
//     // decrease total coin by cost of sidekick, redraw coins
//     hero.coin -= sidekicks[0].cost
//     drawCoins()
//     console.log('[REMAINING COINS]', hero.coin);
//     drawKneadyBoy()
//   }
//   // alert player that they don't have enough coin or they already have this sidekick
//   else {
//     window.alert('You do not have enough 🪙, or you already have this sidekick, keep fighting Rat-a-tat-tat!')
//   }
// }

// now lets write a function so that kneady boy causes damage to boss
// function kneadyBoyAttacks() {
//   // make sure that the boss is alive
//   if (boss.health > 0) {
//     // decrease the bosses health by the sidekicks damage
//     boss.health -= sidekicks[0].value
//     drawBossStats()
//   } else {
//     window.alert('You have defeated Rat-a-tat-tat!')
//     // give the player a bonus
//     hero.coin = hero.coin += 100
//     hero.damage += 5
//     hero.health = 100
//     drawHeroStats()
//     levelUpBoss()
//   }
// }

// setInterval(() => {
//   if (sidekicks[0].isPurchased) {
//     kneadyBoyAttacks()
//   }
// }, 5000)


// NOTE now let's write some refactored code so that we can draw, buy, and have ALL the sidekicks attack

function drawSideKicks() {
  let sideKicksTemplate = ''
  // i need to grab one sidekick at a time, so lets for each over our sidekicks array
  sidekicks.forEach(sidekick => {
    if (sidekick.isPurchased) {
      sideKicksTemplate += `
      <div>
      <img class="img-fluid sidekick" src="${sidekick.image}">
      <h5>${sidekick.name}</h5>
    </div>
      `
    }
  })
  // @ts-ignore
  document.getElementById('sidekicks').innerHTML = sideKicksTemplate
}

// now lets create refactored code for buying a sidekick
function buySidekicks(sidekickName) {
  const purchasedSidekick = sidekicks.find(sidekick => sidekick.name == sidekickName)

  // check that we have enough mons and that sidekick has not been purchased
  // @ts-ignore
  if (hero.coin >= purchasedSidekick.cost && !purchasedSidekick.isPurchased) {
    // @ts-ignore
    hero.coin -= purchasedSidekick.cost
    // @ts-ignore
    purchasedSidekick.isPurchased = true
    drawCoins()
    drawSideKicks()
  } else {
    window.alert('You do not have enough 🪙, or you already have this sidekick, keep fighting Rat-a-tat-tat!')
  }
}

// now lets get the sidekicks to do their job
function sidekicksHelp() {
  sidekicks.forEach(sidekick => {
    if (boss.health <= 0) {
      boss.health = 0
      window.alert('You defeated Rat-a-tat-tat, play again?')
      hero.coin = hero.coin += 100
      drawCoins()
      hero.damage += 5
      hero.health = 100
      drawHeroStats()
      levelUpBoss()
      drawBossStats()
    }
    if (sidekick.isPurchased && boss.health > 0) {
      if (sidekick.type == 'damage') {
        boss.health -= sidekick.value
        drawBossStats()
      } else if (sidekick.type == 'healing') {
        hero.health += sidekick.value
        drawHeroStats()
      }
    }
  })
}

setInterval(sidekicksHelp, 3000)



// SECTION call draw functions on page load
drawHero()
drawHeroStats()
drawBoss()
drawBossStats()
drawCoins()