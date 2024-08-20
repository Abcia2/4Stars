console.log("Abcia2 :D");
let pathname = window.location.pathname;

if(pathname != "/4Stars/"){
  window.location.href = "/4Stars/";
}

document.addEventListener("DOMContentLoaded", function () {
  let FadeInLayer = document.querySelector(".FadeInLayer");
  FadeInLayer.style.transition = "opacity 1s";
  FadeInLayer.style.opacity = 0;
  setTimeout(() => {
    FadeInLayer.classList.add("Hidden");
  }, 400);
});

//Assets
let PositionsArray = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];
let GameImages = [
  "./Assets/Star0.png",
  "./Assets/Star1.png",
  "./Assets/Star2.png",
];
let GridBGColors = ["", "NowPlaying1", "NowPlaying2"];

//Variables
let GameGrid = document.getElementById("GameGrid");
let FallingStarLayer = document.getElementById("FallingStarLayer");
let FallingStarImg = document.getElementById("FallingStarImg");
let FallingStar = document.getElementById("FallingStar");
let ComboTextLayer = document.getElementById("ComboTextLayer");
let ComboText = document.getElementById("ComboText");
let NowPlayingImg = document.getElementById("NowPlayingImg");
let Player1Name = document.getElementById("Player1Name");
let PlayerScore1 = document.getElementById("PlayerScore1");
let PlayerScore2 = document.getElementById("PlayerScore2");
let Player2Name = document.getElementById("Player2Name");
let SplashLayer = document.getElementById("SplashCon");
let NamesLayer = document.getElementById("NamesLayer");
let PlayerInputName1 = document.getElementById("PlayerInputName1");
let PlayerInputName2 = document.getElementById("PlayerInputName2");
let PageIcon = document.getElementById("PageIcon");
let TutroialLayer = document.getElementById("TutroialLayer");
let MuteButtonImg = document.getElementById("MuteButtonImg");
let CurrentPalyer = 1;

let BGM = document.getElementById("BGM");
let TapSFX1Items = document.querySelectorAll('.TapSFX1');
const ButtonClickSFX1 = new Audio();
ButtonClickSFX1.src = './Assets/TapSound.mp3';
const FallingStarSFX = new Audio();
FallingStarSFX.src = './Assets/FallingStarSound.mp3';
const VictorieSFX = new Audio();
VictorieSFX.src = './Assets/VictorySound.mp3';



/*Storage*/
let SettingsSaves = {
  SelectedNames: false,
  Tutorial: false,
  Score1: 0,
  Score2: 0,
  Volume: 1,
  PlayerName1: "Player 1",
  PlayerName2: "Player 2",
};
if (localStorage.getItem("4StarsSettings")) {
  let TempLoad = localStorage.getItem("4StarsSettings");
  SettingsSaves = JSON.parse(TempLoad);
  if(SettingsSaves.Volume == 0){
    MuteButtonImg.src="./Assets/AudioActivated.png"
  }
  else{
    MuteButtonImg.src="./Assets/AudioMuted.png"
  }
}



//UI
function HideSplashScreen() {
  BGM.play();
  BGM.volume = SettingsSaves.Volume;
  SplashLayer.classList.add("FadeOut");
  if (!SettingsSaves.Tutorial) {
    TutroialLayer.classList.remove("Hidden");
    TutroialLayer.classList.add("FadeIn");
  } else if (!SettingsSaves.SelectedNames) {
    NamesLayer.classList.remove("Hidden");
    NamesLayer.classList.add("FadeIn");
  } else {
    setTimeout(() => {
      SplashLayer.classList.remove("FadeOut");
      SplashLayer.classList.add("Hidden");
    }, 400);
  }
}

function HideTutorial() {
  TutroialLayer.classList.add("FadeOut");
  SettingsSaves.Tutorial = true;
  localStorage.setItem("4StarsSettings", JSON.stringify(SettingsSaves));
  if (!SettingsSaves.SelectedNames) {
    NamesLayer.classList.remove("Hidden");
    NamesLayer.classList.add("FadeIn");
  } 
    setTimeout(() => {
      TutroialLayer.classList.remove("FadeOut");
      TutroialLayer.classList.add("Hidden");
    }, 300);
  
}

function ChangeNames() {
  PlayerInputName1.value = SettingsSaves.PlayerName1;
  PlayerInputName2.value = SettingsSaves.PlayerName2;
  NamesLayer.classList.remove("Hidden");
  NamesLayer.classList.add("FadeIn");
}

function Tutorial() {
  TutroialLayer.classList.remove("Hidden");
  TutroialLayer.classList.add("FadeIn");
}

function Reset() {
  FallingStarImg.src = GameImages[CurrentPalyer];
  FallingStarLayer.classList.remove("Hidden");
  FallingStarLayer.classList.add("FadeInOut");
  FallingStar.classList.add("FallAnimation");

  setTimeout(() => {
    let SettingsSaves = {
      SelectedNames: false,
      Tutorial: false,
      Score1: 0,
      Score2: 0,
      Volume: 1,
      PlayerName1: "Player 1",
      PlayerName2: "Player 2",
    };
    localStorage.setItem("4StarsSettings", JSON.stringify(SettingsSaves));
    window.location.href = "index.html";
  }, 600);
}

function ConfirmNames() {
  if (PlayerInputName1.value == "") {
    PlayerInputName1.classList.add("TextInputError");
    setTimeout(() => {
      PlayerInputName1.classList.remove("TextInputError");
    }, 500);
  }

  if (PlayerInputName2.value == "") {
    PlayerInputName2.classList.add("TextInputError");
    setTimeout(() => {
      PlayerInputName2.classList.remove("TextInputError");
    }, 500);
  }

  if (PlayerInputName1.value != "" && PlayerInputName2.value != "") {
    SettingsSaves.PlayerName1 = PlayerInputName1.value;
    SettingsSaves.PlayerName2 = PlayerInputName2.value;
    SettingsSaves.SelectedNames = true;
    localStorage.setItem("4StarsSettings", JSON.stringify(SettingsSaves));
    UpdateGrid();
    NamesLayer.classList.add("FadeOut");
    setTimeout(() => {
      NamesLayer.classList.remove("FadeOut");
      NamesLayer.classList.add("Hidden");
    }, 400);
  }
}


//Music
function ToggleMusic(){
  if(SettingsSaves.Volume == 0){
    SettingsSaves.Volume = 1;
    MuteButtonImg.src="./Assets/AudioMuted.png"
    BGM.volume = SettingsSaves.Volume;
    localStorage.setItem("4StarsSettings", JSON.stringify(SettingsSaves));
    return
  }
  else{
    SettingsSaves.Volume = 0;
    MuteButtonImg.src="./Assets/AudioActivated.png"
    BGM.volume = SettingsSaves.Volume;
    localStorage.setItem("4StarsSettings", JSON.stringify(SettingsSaves));
    return
  }
}

function PlayTapSFX1() {
  ButtonClickSFX1.volume = SettingsSaves.Volume;
  ButtonClickSFX1.currentTime = 0;
  ButtonClickSFX1.play();
}
TapSFX1Items.forEach(function(element) {
  element.addEventListener('click', function() {
      PlayTapSFX1()
  });
});

function FallingStarSFXPlay() {
  FallingStarSFX.volume = SettingsSaves.Volume;
  FallingStarSFX.currentTime = 0;
  FallingStarSFX.play();
}

function VictorieSFXPlay() {
  VictorieSFX.volume = SettingsSaves.Volume;
  VictorieSFX.currentTime = 0;
  VictorieSFX.play();
}



//Game
function UpdateGrid() {
  GameGrid.innerHTML = `<div class="GridItemDropper" id="DropButton0" onclick="Drop(0)">Drop</div>
                <div class="GridItemDropper" id="DropButton1" onclick="Drop(1)">Drop</div>
                <div class="GridItemDropper" id="DropButton2" onclick="Drop(2)">Drop</div>
                <div class="GridItemDropper" id="DropButton3" onclick="Drop(3)">Drop</div>
                <div class="GridItemDropper" id="DropButton4" onclick="Drop(4)">Drop</div>
                <div class="GridItemDropper" id="DropButton5" onclick="Drop(5)">Drop</div>
                <div class="GridItemDropper" id="DropButton6" onclick="Drop(6)">Drop</div>`;

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      let NewItem = `<div class="GridItem" id="GridItemNumber${i}"><img src="${
        GameImages[PositionsArray[i][j]]
      }" class="GridImg"></div>`;
      GameGrid.innerHTML += NewItem;
    }
  }

  Player1Name.innerText = SettingsSaves.PlayerName1;
  Player2Name.innerText = SettingsSaves.PlayerName2;
  PlayerScore1.innerText = "Victories: " + SettingsSaves.Score1;
  PlayerScore2.innerText = "Victories: " + SettingsSaves.Score2;

  let DropButton0 = document.getElementById("DropButton0");
  let DropButton1 = document.getElementById("DropButton1");
  let DropButton2 = document.getElementById("DropButton2");
  let DropButton3 = document.getElementById("DropButton3");
  let DropButton4 = document.getElementById("DropButton4");
  let DropButton5 = document.getElementById("DropButton5");
  let DropButton6 = document.getElementById("DropButton6");
  if (PositionsArray[0][0] != 0) {
    DropButton0.classList.add("GridItemDropperDeactivated");
    DropButton0.classList.remove("GridItemDropper");
  }
  if (PositionsArray[0][1] != 0) {
    DropButton1.classList.add("GridItemDropperDeactivated");
    DropButton1.classList.remove("GridItemDropper");
  }
  if (PositionsArray[0][2] != 0) {
    DropButton2.classList.add("GridItemDropperDeactivated");
    DropButton2.classList.remove("GridItemDropper");
  }
  if (PositionsArray[0][3] != 0) {
    DropButton3.classList.add("GridItemDropperDeactivated");
    DropButton3.classList.remove("GridItemDropper");
  }
  if (PositionsArray[0][4] != 0) {
    DropButton4.classList.add("GridItemDropperDeactivated");
    DropButton4.classList.remove("GridItemDropper");
  }
  if (PositionsArray[0][5] != 0) {
    DropButton5.classList.add("GridItemDropperDeactivated");
    DropButton5.classList.remove("GridItemDropper");
  }
  if (PositionsArray[0][6] != 0) {
    DropButton6.classList.add("GridItemDropperDeactivated");
    DropButton6.classList.remove("GridItemDropper");
  }
}
UpdateGrid();



//Play Controls
function CheckWin(X, Y, Value) {
  let Rows = 6;
  let Columns = 7;

  //Check Column
  let CounterColumn = 1;
  let CheckY = Y - 1;
  while (CheckY >= 0 && PositionsArray[CheckY][X] == Value) {
    CounterColumn++;
    CheckY--;
    if (CounterColumn >= 4) return true;
  }
  CheckY = Y + 1;
  while (CheckY < Rows && PositionsArray[CheckY][X] == Value) {
    CounterColumn++;
    CheckY++;
    if (CounterColumn >= 4) return true;
  }

  //Check Row
  let CounterRow = 1;
  let CheckX = X - 1;
  while (CheckX >= 0 && PositionsArray[Y][CheckX] === Value) {
    CounterRow++;
    CheckX--;
    if (CounterRow >= 4) return true;
  }
  CheckX = X + 1;
  while (CheckX < Columns && PositionsArray[Y][CheckX] === Value) {
    CounterRow++;
    CheckX++;
    if (CounterRow >= 4) return true;
  }

  //Diagonal
  let CounterDiagonal1 = 1;
  let CounterDiagonal2 = 1;

  //Top Left
  CheckX = X - 1;
  CheckY = Y - 1;
  while (
    CheckX >= 0 &&
    CheckY >= 0 &&
    PositionsArray[CheckY][CheckX] === Value
  ) {
    CounterDiagonal1++;
    CheckX--;
    CheckY--;
    if (CounterDiagonal1 >= 4) return true;
  }

  //Bottom Right
  CheckX = X + 1;
  CheckY = Y + 1;
  while (
    CheckX < Columns &&
    CheckY < Rows &&
    PositionsArray[CheckY][CheckX] === Value
  ) {
    CounterDiagonal1++;
    CheckX++;
    CheckY++;
    if (CounterDiagonal1 >= 4) return true;
  }

  //Bottom Left
  CheckX = X - 1;
  CheckY = Y + 1;
  while (
    CheckX >= 0 &&
    CheckY < Rows &&
    PositionsArray[CheckY][CheckX] === Value
  ) {
    CounterDiagonal2++;
    CheckX--;
    CheckY++;
    if (CounterDiagonal2 >= 4) return true;
  }

  //Top Right
  CheckX = X + 1;
  CheckY = Y - 1;
  while (
    CheckX < Columns &&
    CheckY >= 0 &&
    PositionsArray[CheckY][CheckX] === Value
  ) {
    CounterDiagonal2++;
    CheckX++;
    CheckY--;
    if (CounterDiagonal2 >= 4) return true;
  }

  return false;
}

function Drop(Column) {
  if (PositionsArray[0][Column] == 0) {
    FallingStarImg.src = GameImages[CurrentPalyer];
    FallingStarLayer.classList.remove("Hidden");
    FallingStarLayer.classList.add("FadeInOut");
    FallingStar.classList.add("FallAnimation");
    FallingStarSFXPlay()

    if (CurrentPalyer == 1) {
      setTimeout(() => {
        CurrentPalyer = 2;
        NowPlayingImg.src = GameImages[CurrentPalyer];
        PageIcon.href = "./Assets/Icon2.png";
        GameGrid.classList.add("GameGridBG2");
        GameGrid.classList.remove("GameGridBG1");
      }, 950);
    }

    if (CurrentPalyer == 2) {
      setTimeout(() => {
        CurrentPalyer = 1;
        NowPlayingImg.src = GameImages[CurrentPalyer];
        PageIcon.href = "./Assets/Icon1.png";
        GameGrid.classList.add("GameGridBG1");
        GameGrid.classList.remove("GameGridBG2");
      }, 950);
    }

    setTimeout(() => {
      let Index = 5;
      if (PositionsArray[0][Column] == 0) {
        for (let i = 0; i < 6; i++) {
          if (PositionsArray[i][Column] != 0) {
            Index = i - 1;
            break;
          }
        }
        PositionsArray[Index][Column] = CurrentPalyer;
        UpdateGrid();
        if (CheckWin(Column, Index, CurrentPalyer)) {
          setTimeout(() => {
            ComboTextApper(CurrentPalyer - 1);
            VictorieSFXPlay()
          }, 850);
        }
      }
    }, 500);

    FallingStarLayer.addEventListener("animationend", () => {
      FallingStarLayer.classList.remove("FadeInOut");
      FallingStarLayer.classList.add("Hidden");
    });
    FallingStar.addEventListener("animationend", () => {
      FallingStar.classList.remove("FallAnimation");
    });
  }
}

function ComboTextApper(numero) {
  ComboTextLayer.classList.remove("Hidden");
  ComboTextLayer.classList.add("FadeInOut2");

  if (numero == 1) {
    ComboText.classList.add("Player1");
    ComboText.classList.remove("Player2");
    ComboText.innerText = `${SettingsSaves.PlayerName1} Won`;
    SettingsSaves.Score1++;
  } else {
    ComboText.classList.add("Player2");
    ComboText.classList.remove("Player1");
    ComboText.innerText = `${SettingsSaves.PlayerName2} Won`;
    SettingsSaves.Score2++;
  }

  localStorage.setItem("4StarsSettings", JSON.stringify(SettingsSaves));
  PositionsArray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  setTimeout(() => {
    UpdateGrid();
  }, 2500);

  setTimeout(() => {
    ComboTextLayer.classList.remove("FadeInOut2");
    ComboTextLayer.classList.add("Hidden");
  }, 3600);
}

