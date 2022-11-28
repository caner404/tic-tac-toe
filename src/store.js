import { reactive } from "vue";

export const store = reactive({
  yMinValue: 0,
  xMinValue: 0,
  xMaxValue: 3,
  yMaxValue: 3,

  gameBoardItems: [
    {
      value: "",
      boxNumber: 0,
      xValue: 0,
      yValue: 0,
    },
    {
      value: "",
      boxNumber: 1,
      xValue: 0,
      yValue: 1,
    },
    {
      value: "",
      boxNumber: 2,
      xValue: 0,
      yValue: 2,
    },
    {
      value: "",
      boxNumber: 3,
      xValue: 1,
      yValue: 0,
    },
    {
      value: "",
      boxNumber: 4,
      xValue: 1,
      yValue: 1,
    },
    {
      value: "",
      boxNumber: 5,
      xValue: 1,
      yValue: 2,
    },
    {
      value: "",
      boxNumber: 6,
      xValue: 2,
      yValue: 0,
    },
    {
      value: "",
      boxNumber: 7,
      xValue: 2,
      yValue: 1,
    },
    {
      value: "",
      boxNumber: 8,
      xValue: 2,
      yValue: 2,
    },
  ],
  isGameboardActive: false,
  playerTeam: "X",
  enemyTeam: "",
  restart() {
    this.isGameboardActive = false;
    this.playerTeam = "X";
    this.enemyTeam = "";
    this.gameBoardItems.forEach((item) => (item.value = ""));
  },
  changeTeam() {
    this.playerTeam === "X" ? (this.playerTeam = "O") : (this.playerTeam = "X");
  },
  initGameWithCPU() {
    this.isGameboardActive = !this.isGameboardActive;
    this.enemyTeam = "CPU";
  },
  initGameWithPlayer() {
    this.isGameboardActive = !this.isGameboardActive;
    this.enemyTeam = "player";
  },
  getPlayerTeam() {
    return this.playerTeam;
  },
  getEnemyTeam() {
    return this.enemyTeam;
  },
  isPlayerTeamCross() {
    return this.playerTeam === "X";
  },
  isPlayerTeamCircle() {
    return this.playerTeam === "O";
  },
  isEnemyCPU() {
    return this.enemyTeam === "CPU";
  },
  isEnemyOtherPlayer() {
    return this.enemyTeam === "player";
  },
  isGameValueEmpty(gameItem) {
    return gameItem.value === "";
  },
  isGameValueCross(gameItem) {
    return gameItem.value === "X";
  },
  isGameValueCircle(gameItem) {
    return gameItem.value === "O";
  },
  getGameBoardItems() {
    return this.gameBoardItems;
  },
  getPlayerMark() {
    return this.isPlayerTeamCircle() ? "O" : "X";
  },
  getEnemyMark() {
    const mark = this.getPlayerMark();
    return this.isPlayerTeamCircle() ? "X" : "O";
  },
  executeGameLogic(item) {
    let sameMarkStreakHorizontal = 0;
    let sameMarkStreakVertical = 0;
    let sameMarkDiagonal = 0;

    //nur ausführen wenn kein Wert enthalten ist
    //TODO
    if (item.value !== "") return;
    this.addMarkOnGameBoard(this.getPlayerMark(), item);
    let currentGameBoardItem = this.gameBoardItems.find(
      (gameBoardItem) => gameBoardItem.boxNumber === item.boxNumber
    );

    sameMarkStreakHorizontal =
      this.compareGameBoardItemHorizontal(currentGameBoardItem);
    sameMarkStreakVertical =
      this.compareGameBoardItemVertical(currentGameBoardItem);
    sameMarkDiagonal = this.compareGameBoardItemDiagonal(currentGameBoardItem);

    if (this.isEnemyCPU()) {
      //put random mark on board for cpu
      let randomFreeGameBoardItem = this.gameBoardItems.find(
        (item) => item.value == ""
      );
      console.log(`${JSON.stringify(randomFreeGameBoardItem)}`);
      if (randomFreeGameBoardItem != null) {
        this.addMarkOnGameBoard(this.getEnemyMark(), randomFreeGameBoardItem);
      }
    }

    console.table(this.gameBoardItems);
    /*
    console.log(`Horizontal match: ${sameMarkStreakHorizontal}`);
    console.log(`Vertical match: ${sameMarkStreakVertical}`);
    console.log(`Diagonal match: ${sameMarkDiagonal}`);
    */
  },
  addMarkOnGameBoard(markValue, gameItem) {
    this.gameBoardItems.forEach((item) => {
      if (item.boxNumber === gameItem.boxNumber) item.value = markValue;
    });
  },
  compareGameBoardItemHorizontal(currentGameBoardItem) {
    let horizontalStreak = 0;
    const horizontalValue = currentGameBoardItem.xValue;
    for (
      let currentYValue = 0;
      currentYValue < this.yMaxValue;
      currentYValue++
    ) {
      //console.log(`Xvalue: ${horizontalValue}: YValue:${currentYValue}`);
      let compareGameBoardItem = this.gameBoardItems.find(
        (gameItem) =>
          gameItem.xValue === horizontalValue &&
          gameItem.yValue === currentYValue
      );
      if (compareGameBoardItem == null) {
        //console.log("NULL");
        continue;
      }
      if (compareGameBoardItem.value === currentGameBoardItem.value) {
        //console.log(`Found horizontal Value: ${compareGameBoardItem.value}`);
        horizontalStreak++;
      }
      //console.table(this.gameBoardItems);
    }

    return horizontalStreak;
  },
  compareGameBoardItemVertical(currentGameBoardItem) {
    let verticalStreak = 0;
    const verticalValue = currentGameBoardItem.yValue;
    for (
      let currentXValue = 0;
      currentXValue < this.xMaxValue;
      currentXValue++
    ) {
      let compareGameBoardItem = this.gameBoardItems.find(
        (gameItem) =>
          gameItem.xValue === currentXValue && gameItem.yValue === verticalValue
      );
      //console.log(`Xvalue: ${currentXValue}: YValue:${verticalValue}`);
      if (compareGameBoardItem == null) continue;
      if (compareGameBoardItem.value === currentGameBoardItem.value)
        verticalStreak++;
    }
    return verticalStreak;
  },
  compareGameBoardItemDiagonal(currentGameBoardItem) {
    let diagonalStreak = 0;
    let verticalValue = currentGameBoardItem.yValue;
    let horizontalValue = currentGameBoardItem.xValue;
    // links oben -> rechts unten ; currentX+1, currentY+1
    for (
      let x = 0, y = 0;
      x <= this.xMaxValue && y < this.yMaxValue;
      x++, y++
    ) {
      let compareGameBoardItem = this.gameBoardItems.find(
        (item) => item.xValue === x && item.yValue === y
      );
      if (compareGameBoardItem == null) continue;
      if (compareGameBoardItem.value === currentGameBoardItem.value)
        diagonalStreak++;
    }
    // rechts oben -> links unten ; currentX+1, currentY-1
    if (diagonalStreak != 3) {
      diagonalStreak = 0;
      for (
        let x = 0, y = 2;
        x <= this.xMaxValue && y >= this.yMinValue;
        x++, y--
      ) {
        let compareGameBoardItem = this.gameBoardItems.find(
          (item) => item.xValue === x && item.yValue === y
        );
        if (compareGameBoardItem == null) continue;
        if (compareGameBoardItem.value === currentGameBoardItem.value)
          diagonalStreak++;
      }
    }

    return diagonalStreak;
  },
});
