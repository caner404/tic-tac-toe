import { reactive } from "vue";

export const store = reactive({
  yMinValue: 0,
  xMinValue: 0,
  xMaxValue: 3,
  yMaxValue: 3,
  playerWins: false,
  enemyWins: false,
  playerScore: 0,
  enemyScore: 0,
  tieScore: 0,

  gameBoardItems: [
    {
      value: "",
      boxNumber: 0,
      xValue: 0,
      yValue: 0,
      hover: false,
    },
    {
      value: "",
      boxNumber: 1,
      xValue: 0,
      yValue: 1,
      hover: false,
    },
    {
      value: "",
      boxNumber: 2,
      xValue: 0,
      yValue: 2,
      hover: false,
    },
    {
      value: "",
      boxNumber: 3,
      xValue: 1,
      yValue: 0,
      hover: false,
    },
    {
      value: "",
      boxNumber: 4,
      xValue: 1,
      yValue: 1,
      hover: false,
    },
    {
      value: "",
      boxNumber: 5,
      xValue: 1,
      yValue: 2,
      hover: false,
    },
    {
      value: "",
      boxNumber: 6,
      xValue: 2,
      yValue: 0,
      hover: false,
    },
    {
      value: "",
      boxNumber: 7,
      xValue: 2,
      yValue: 1,
      hover: false,
    },
    {
      value: "",
      boxNumber: 8,
      xValue: 2,
      yValue: 2,
      hover: false,
    },
  ],
  isGameboardActive: false,
  showModal: false,
  modalMode: "",
  playerTeam: "X",
  enemyTeam: "",
  currentTeam: "",
  enemyType: "",
  restart() {
    this.isGameboardActive = false;
    this.showModal = false;
    this.playerTeam = "X";
    this.enemyTeam = "";
    this.currentTeam = this.playerTeam;
    this.playerWins = false;
    this.enemyWins = false;
    this.playerScore = 0;
    this.enemyScore = 0;
    this.tieScore = 0;
    this.gameBoardItems.forEach((item) => {
      item.value = "";
      item.hover = false;
    });
  },
  nextRound() {
    this.showModal = false;
    this.playerWins = false;
    this.enemyWins = false;
    this.currentTeam = this.playerTeam;
    this.gameBoardItems.forEach((item) => {
      item.value = "";
      item.hover = false;
    });
  },
  changeTeam() {
    this.playerTeam === "X" ? (this.playerTeam = "O") : (this.playerTeam = "X");
  },
  startGame(enemyType) {
    this.isGameboardActive = !this.isGameboardActive;
    this.currentTeam = this.playerTeam;
    this.enemyTeam = this.isPlayerTeamCircle() ? "X" : "O";
    this.enemyType = enemyType.toUpperCase();
  },

  getPlayerTeam() {
    return this.playerTeam;
  },
  getEnemyTeam() {
    return this.enemyTeam;
  },
  getEnemyType() {
    return this.enemyType;
  },
  getCurrentTeam() {
    return this.currentTeam;
  },
  isPlayerTeamCross() {
    return this.playerTeam === "X";
  },
  isPlayerTeamCircle() {
    return this.playerTeam === "O";
  },
  isEnemyCPU() {
    return this.enemyType === "CPU";
  },
  isEnemyOtherPlayer() {
    return this.enemyType === "PLAYER";
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
  getPlayerWins() {
    return this.playerWins;
  },
  getEnemyWins() {
    return this.enemyWins;
  },
  isATie() {
    return this.playerWins === false && this.enemyWins === false;
  },
  getPlayerScore() {
    return this.playerScore;
  },
  getEnemyScore() {
    return this.enemyScore;
  },
  getTieScore() {
    return this.tieScore;
  },
  executeGameLogic(item) {
    let sameMarkStreakHorizontal = 0;
    let sameMarkStreakVertical = 0;
    let sameMarkDiagonal = 0;
    let mark = "";

    console.log(`Current Team: Begin ${this.currentTeam}`);

    if (item.value !== "") return;
    mark =
      this.currentTeam === this.getEnemyTeam()
        ? this.getEnemyMark()
        : this.getPlayerMark();
    this.addMarkOnGameBoard(mark, item);
    let currentGameBoardItem = this.gameBoardItems.find(
      (gameBoardItem) => gameBoardItem.boxNumber === item.boxNumber
    );

    sameMarkStreakHorizontal =
      this.compareGameBoardItemHorizontal(currentGameBoardItem);
    sameMarkStreakVertical =
      this.compareGameBoardItemVertical(currentGameBoardItem);
    sameMarkDiagonal = this.compareGameBoardItemDiagonal(currentGameBoardItem);

    if (
      sameMarkStreakHorizontal === 3 ||
      sameMarkStreakVertical === 3 ||
      (sameMarkDiagonal === 3 && this.currentTeam === this.getPlayerTeam())
    ) {
      //player wins!
      this.playerScore = this.playerScore + 1;
      this.playerWins = !this.playerWins;
      this.modalMode = this.getPlayerMark();
      this.showModal = !this.showModal;
      return;
    } else if (
      sameMarkStreakHorizontal === 3 ||
      sameMarkStreakVertical === 3 ||
      (sameMarkDiagonal === 3 && this.currentTeam === this.getEnemyTeam())
    ) {
      //enemy player wins!
      this.enemyScore = this.enemyScore + 1;
      this.enemyWins = !this.enemyWins;
      this.modalMode = this.getEnemyMark();
      this.showModal = !this.showModal;
      return;
    }
    this.currentTeam =
      this.currentTeam === this.playerTeam ? this.enemyTeam : this.playerTeam;

    const enemyTeamTimeout = setTimeout(() => {
      if (this.isEnemyCPU()) {
        //put random mark on board for cpu
        let randomFreeGameBoardItem = this.gameBoardItems.find(
          (item) => item.value == ""
        );
        if (randomFreeGameBoardItem != null) {
          this.addMarkOnGameBoard(this.getEnemyMark(), randomFreeGameBoardItem);
          sameMarkStreakHorizontal = this.compareGameBoardItemHorizontal(
            randomFreeGameBoardItem
          );
          sameMarkStreakVertical = this.compareGameBoardItemVertical(
            randomFreeGameBoardItem
          );
          sameMarkDiagonal = this.compareGameBoardItemDiagonal(
            randomFreeGameBoardItem
          );

          if (
            sameMarkStreakHorizontal === 3 ||
            sameMarkStreakVertical === 3 ||
            sameMarkDiagonal === 3
          ) {
            //cpu wins!
            this.enemyScore = this.enemyScore + 1;
            this.enemyWins = !this.enemyWins;
            this.modalMode = this.getEnemyMark();
            this.showModal = !this.showModal;
            return;
          }
        }
        this.currentTeam = this.playerTeam;
      }
    }, 1500);

    if (
      this.gameBoardItems.find((item) => item.value === "") == null &&
      this.enemyWins === false &&
      this.playerWins === false
    ) {
      //tie
      this.tieScore = this.tieScore + 1;
      this.showModal = !this.showModal;
      this.modalMode = "tie";
    }
    console.log(`Current Team: Ending ${this.currentTeam}`);
  },
  addMarkOnGameBoard(markValue, gameItem) {
    this.gameBoardItems.forEach((item) => {
      if (item.boxNumber === gameItem.boxNumber) {
        item.value = markValue;
        item.hover = !item.hover;
      }
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
      let compareGameBoardItem = this.gameBoardItems.find(
        (gameItem) =>
          gameItem.xValue === horizontalValue &&
          gameItem.yValue === currentYValue
      );
      if (compareGameBoardItem == null) {
        continue;
      }
      if (compareGameBoardItem.value === currentGameBoardItem.value) {
        horizontalStreak++;
      }
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

      if (compareGameBoardItem == null) continue;
      if (compareGameBoardItem.value === currentGameBoardItem.value)
        verticalStreak++;
    }
    return verticalStreak;
  },
  compareGameBoardItemDiagonal(currentGameBoardItem) {
    let diagonalStreak = 0;

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
