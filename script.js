var enemynamedisplay = document.querySelector("#enemyname");
var playerimage = document.querySelector("#dueler1");
var enemyimage = document.querySelector("#dueler2");
var playerstats = document.querySelector("#playerstats");
var enemystats = document.querySelector("#enemystats");

// The following info follows the form of the array
// Health num
// Attack num
// Armour num
// Speed num
// Reach num
// Attack outcome text
// Victory condition text
// Image url
// Name text
var duelerinfo = [
  [
    100,
    5,
    0,
    5,
    5,
    "",
    "",
    "url(https://oyster.ignimgs.com/mediawiki/apis.ign.com/game-of-thrones/c/c5/Eddard_stark_and_ice.jpg)",
    "Ned Stark",
  ],
  [
    60,
    3,
    0,
    2,
    1,
    "",
    "",
    "url(https://awoiaf.westeros.org/images/thumb/e/e4/Davos_Seaworth_HBO.jpg/1041px-Davos_Seaworth_HBO.jpg)",
    "Davos Seaworth",
  ],
  [
    80,
    5,
    3,
    4,
    2,
    "",
    "",
    "url(https://watchersonthewall.com/wp-content/uploads/2017/12/stannis.jpg)",
    "Stannis Baratheon",
  ],
  [
    90,
    6,
    5,
    3,
    4,
    "",
    "",
    "url(https://media.wired.com/photos/59335d07a4b3d04a47189eaa/master/pass/GOT-game-of-thrones-32826622-1280-848.jpg)",
    "Rob Stark",
  ],
  [
    40,
    9,
    2,
    8,
    7,
    "",
    "",
    "url(https://comicvine.gamespot.com/a/uploads/scale_super/11115/111150831/4502019-6359592372-)",
    "Oberyn Martell",
  ],
  [
    120,
    11,
    9,
    6,
    6,
    "",
    "",
    "url(https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/05/13/06/game-of-thrones-the-mountain.jpg?width=1200)",
    "The Mountain",
  ],
];

// The initial condition for the enemy choice, if 0 you fight yourself
var enemynum = 1;

// This function changes the html to fit the info
// Such as stats, name, image for both fighters
function drawfight(
  duelerinfo,
  playerimage,
  enemyimage,
  playerstats,
  enemystats,
  enemynum
) {
  enemynamedisplay.textContent = duelerinfo[enemynum][8];

  var playerhealth = duelerinfo[0][0];
  var playerattack = duelerinfo[0][1];
  var playerarmour = duelerinfo[0][2];
  var playerspeed = duelerinfo[0][3];
  var playerreach = duelerinfo[0][4];
  var playerurl = duelerinfo[0][7];
  var playerturn = duelerinfo[0][5];

  var enemyhealth = duelerinfo[enemynum][0];
  var enemyattack = duelerinfo[enemynum][1];
  var enemyarmour = duelerinfo[enemynum][2];
  var enemyspeed = duelerinfo[enemynum][3];
  var enemyreach = duelerinfo[enemynum][4];
  var enemystun = duelerinfo[enemynum][6];
  var enemyurl = duelerinfo[enemynum][7];
  var enemyturn = duelerinfo[enemynum][5];

  playerstats.innerHTML =
    "Health: " +
    parseInt(playerhealth) +
    "<br>" +
    "Statistics: <br>Attack: " +
    playerattack +
    "<br>" +
    "Armour: " +
    playerarmour +
    "<br>" +
    "Speed: " +
    playerspeed +
    "<br>" +
    "Reach: " +
    playerreach +
    "<br>" +
    "Outcome:<br>" +
    playerturn;

  enemystats.innerHTML =
    "Health: " +
    parseInt(enemyhealth) +
    "<br>" +
    "Statistics: <br>Attack: " +
    enemyattack +
    "<br>" +
    "Armour: " +
    enemyarmour +
    "<br>" +
    "Speed: " +
    enemyspeed +
    "<br>" +
    "Reach: " +
    enemyreach +
    "<br>" +
    "Outcome:<br>" +
    enemyturn +
    "<br>" +
    enemystun;
  playerimage.style.backgroundImage = playerurl;
  enemyimage.style.backgroundImage = enemyurl;
}

// Draws when pages loads and everytime something happens
drawfight(
  duelerinfo,
  playerimage,
  enemyimage,
  playerstats,
  enemystats,
  enemynum
);

// What happens when the user presses the attack button, changes health, attack outcome and victory condition
function playerattack(
  duelerinfo,
  playerimage,
  enemyimage,
  playerstats,
  enemystats,
  enemynum
) {
  // If the previous player action is a successful dodge,
  // The enemy always gets hit
  // Changes attack conditions for player and enemy
  if (duelerinfo[enemynum][6] == "STUNNED!") {
    duelerinfo[enemynum][5] = "HURT";

    // The attack calculation is based on players attack,speed,reach and a random number
    duelerinfo[enemynum][0] =
      duelerinfo[enemynum][0] +
      duelerinfo[enemynum][2] -
      (duelerinfo[0][1] + duelerinfo[0][3] + duelerinfo[0][4]) +
      Math.floor(Math.random() * 5) -
      Math.floor(Math.random() * 5);

    // If enemy is dead (Health <=0) present victory condition
    if (duelerinfo[enemynum][0] <= 0) {
      duelerinfo[0][5] = "VICTORY";
      duelerinfo[enemynum][5] = "DEFEATED";
    }

    // If enemy is not dead, do not present victory condition
    duelerinfo[enemynum][6] = "";
  } else {
    // If enemy's attack condition is not stunned
    // A random chance is calculated based on enemy's speed
    if (Math.random() > duelerinfo[enemynum][3] * 0.1) {
      duelerinfo[enemynum][5] = "HURT";
      duelerinfo[enemynum][0] =
        duelerinfo[enemynum][0] +
        duelerinfo[enemynum][2] -
        (duelerinfo[0][1] + duelerinfo[0][3] + duelerinfo[0][4]) +
        Math.floor(Math.random() * 5) -
        Math.floor(Math.random() * 5);
      duelerinfo[enemynum][6] = "";
      if (duelerinfo[0][0] <= 0) {
        duelerinfo[enemynum][5] = "VICTORY";
        duelerinfo[0][5] = "DEFEATED";
      }

      if (Math.random() > duelerinfo[0][3] * 0.1) {
        duelerinfo[0][5] = "HURT";
        duelerinfo[0][0] =
          duelerinfo[0][0] +
          duelerinfo[0][2] -
          (duelerinfo[enemynum][1] +
            duelerinfo[enemynum][3] +
            duelerinfo[enemynum][4]) +
          Math.floor(Math.random() * 5) -
          Math.floor(Math.random() * 5);
        duelerinfo[enemynum][6] = "";
      } else {
        duelerinfo[0][5] = "DODGED!";
        duelerinfo[enemynum][6] = "";
      }

      duelerinfo[0][5] = "HURT";
      duelerinfo[0][0] =
        duelerinfo[0][0] +
        duelerinfo[0][2] -
        (duelerinfo[enemynum][1] +
          duelerinfo[enemynum][3] +
          duelerinfo[enemynum][4]) +
        Math.floor(Math.random() * 5) -
        Math.floor(Math.random() * 5);
      duelerinfo[enemynum][6] = "";
      if (duelerinfo[0][0] <= 0) {
        duelerinfo[enemynum][5] = "VICTORY";
        duelerinfo[0][5] = "DEFEATED";
      }
    } else {
      duelerinfo[enemynum][5] = "DODGED!";
      duelerinfo[0][5] = "MISSED!";
      duelerinfo[0][0] =
        duelerinfo[0][0] +
        duelerinfo[0][2] -
        (duelerinfo[enemynum][1] +
          duelerinfo[enemynum][3] +
          duelerinfo[enemynum][4]) +
        Math.floor(Math.random() * 5) -
        Math.floor(Math.random() * 5);
      duelerinfo[enemynum][6] = "";

      if (Math.random() > duelerinfo[0][3] * 0.1) {
        duelerinfo[0][5] = "HURT";
        duelerinfo[0][0] =
          duelerinfo[0][0] +
          duelerinfo[0][2] -
          (duelerinfo[enemynum][1] +
            duelerinfo[enemynum][3] +
            duelerinfo[enemynum][4]) +
          Math.floor(Math.random() * 5) -
          Math.floor(Math.random() * 5);
        duelerinfo[enemynum][6] = "";
        if (duelerinfo[0][0] <= 0) {
          duelerinfo[enemynum][5] = "VICTORY";
          duelerinfo[0][5] = "DEFEATED";
        }
      } else {
        duelerinfo[0][5] = "DODGED!";
        duelerinfo[enemynum][6] = "";
      }

      duelerinfo[0][5] = "HURT";
      duelerinfo[0][0] =
        duelerinfo[0][0] +
        duelerinfo[0][2] -
        (duelerinfo[enemynum][1] +
          duelerinfo[enemynum][3] +
          duelerinfo[enemynum][4]) +
        Math.floor(Math.random() * 5) -
        Math.floor(Math.random() * 5);
      duelerinfo[enemynum][6] = "";
      if (duelerinfo[0][0] <= 0) {
        duelerinfo[enemynum][5] = "VICTORY";
        duelerinfo[0][5] = "DEFEATED";
      }
    }

    if (duelerinfo[enemynum][0] <= 0) {
      duelerinfo[0][5] = "VICTORY";
      duelerinfo[enemynum][5] = "DEFEATED";
    }
  }

  duelerinfo = drawfight(
    duelerinfo,
    playerimage,
    enemyimage,
    playerstats,
    enemystats,
    enemynum
  );
}
function playerdodge(
  duelerinfo,
  playerimage,
  enemyimage,
  playerstats,
  enemystats,
  enemynum
) {
  if (Math.random() > duelerinfo[0][3] * 0.1) {
    duelerinfo[enemynum][5] = "HIT";
    duelerinfo[0][5] = "HURT";
    duelerinfo[0][0] =
      duelerinfo[0][0] +
      duelerinfo[0][2] -
      (duelerinfo[enemynum][1] +
        duelerinfo[enemynum][3] +
        duelerinfo[enemynum][4]) +
      Math.floor(Math.random() * 5) -
      Math.floor(Math.random() * 5);
  } else {
    duelerinfo[0][5] = "DODGED!";
    duelerinfo[enemynum][5] = "MISSED!";
    duelerinfo[enemynum][6] = "STUNNED!";
  }

  duelerinfo = drawfight(
    duelerinfo,
    playerimage,
    enemyimage,
    playerstats,
    enemystats,
    enemynum
  );
}
function nextenemy(enemynum) {
  return enemynum + 1;
}

var nextbutton = document.getElementById("nextbutton");
nextbutton.addEventListener("click", function () {
  enemynum = nextenemy(enemynum);
  drawfight(
    duelerinfo,
    playerimage,
    enemyimage,
    playerstats,
    enemystats,
    enemynum
  );
});

var attackbutton = document.getElementById("attackbutton");
attackbutton.addEventListener("click", function () {
  playerattack(
    duelerinfo,
    playerimage,
    enemyimage,
    playerstats,
    enemystats,
    enemynum
  );
});

var attackbutton = document.getElementById("dodgebutton");
attackbutton.addEventListener("click", function () {
  playerdodge(
    duelerinfo,
    playerimage,
    enemyimage,
    playerstats,
    enemystats,
    enemynum
  );
});
