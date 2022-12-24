import { defineStore } from "pinia";
import { useGameboardStore } from "./gameBoard";
import { useGameStatsStore } from "./gameStats";

export const useMainStore = defineStore("main", {
  state: () => ({
    gameStats: useGameStatsStore(),
    gameBoard: useGameboardStore(),
    showModal: false,
    modalMode: "",
  }),
  getters: {
    isShowModal: (state) => state.showModal,
    isModalMode: (state) => state.modalMode,
  },
  actions: {
    startGame(enemyType) {
      this.gameBoard.isGameboardActive = !this.gameBoard.isGameboardActive;
      this.gameStats.currentTeam = this.gameStats.playerTeam;
      this.gameStats.enemyTeam = this.gameStats.isPlayerTeamCircle()
        ? "X"
        : "O";
      this.gameStats.enemyType = enemyType.toUpperCase();
    },
    restart() {
      this.showModal = false;
      this.gameStats.playerTeam = "X";
      this.gameStats.enemyTeam = "";
      this.gameStats.currentTeam = this.gameStats.playerTeam;
      this.gameStats.playerWins = false;
      this.gameStats.enemyWins = false;
      this.gameStats.playerScore = 0;
      this.gameStats.enemyScore = 0;
      this.gameStats.tieScore = 0;
      this.gameBoard.isGameboardActive = false;
      this.gameBoard.resetValues();
    },
    nextRound() {
      this.showModal = false;
      this.gameStats.playerWins = false;
      this.gameStats.enemyWins = false;
      this.gameStats.currentTeam = this.gameStats.playerTeam;
      this.gameBoard.resetValues();
    },
    startRound(item) {
      let sameMarkStreakHorizontal = 0;
      let sameMarkStreakVertical = 0;
      let sameMarkDiagonal = 0;
      let mark = "";

      if (item.value !== "") return;
      mark =
        this.gameStats.currentTeam === this.gameStats.getEnemyTeam
          ? this.gameStats.getEnemyMark()
          : this.gameStats.getPlayerMark();
      this.gameBoard.addMarkOnGameBoard(mark, item);
      let currentGameBoardItem = this.gameBoard.getCurrentGameBoardItem(item);

      sameMarkStreakHorizontal =
        this.compareGameBoardItemHorizontal(currentGameBoardItem);
      sameMarkStreakVertical =
        this.compareGameBoardItemVertical(currentGameBoardItem);
      sameMarkDiagonal =
        this.compareGameBoardItemDiagonal(currentGameBoardItem);

      if (
        sameMarkStreakHorizontal === 3 ||
        sameMarkStreakVertical === 3 ||
        (sameMarkDiagonal === 3 &&
          this.gameStats.currentTeam === this.gameStats.getPlayerTeam)
      ) {
        //player wins!
        this.gameStats.playerScore = this.gameStats.playerScore + 1;
        this.gameStats.playerWins = !this.gameStats.playerWins;
        this.modalMode = this.gameStats.getPlayerMark();
        this.showModal = !this.showModal;
        return;
      } else if (
        sameMarkStreakHorizontal === 3 ||
        sameMarkStreakVertical === 3 ||
        (sameMarkDiagonal === 3 &&
          this.gameStats.currentTeam === this.gameStats.getEnemyTeam)
      ) {
        //enemy player wins!
        this.gameStats.enemyScore = this.gameStats.enemyScore + 1;
        this.gameStats.enemyWins = !this.gameStats.enemyWins;
        this.modalMode = this.gameStats.getEnemyMark();
        this.showModal = !this.showModal;
        return;
      }
      this.gameStats.currentTeam =
        this.gameStats.currentTeam === this.gameStats.playerTeam
          ? this.gameStats.enemyTeam
          : this.gameStats.playerTeam;

      const enemyTeamTimeout = setTimeout(() => {
        if (this.gameStats.isEnemy("cpu")) {
          //put random mark on board for cpu
          let randomFreeGameBoardItem = this.gameBoard.getFreeGameBoardSlot();
          if (randomFreeGameBoardItem != null) {
            this.gameBoard.addMarkOnGameBoard(
              this.gameStats.getEnemyMark(),
              randomFreeGameBoardItem
            );
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
              this.gameStats.enemyScore = this.gameStats.enemyScore + 1;
              this.gameStats.enemyWins = !this.gameStats.enemyWins;
              this.modalMode = this.gameStats.getEnemyMark();
              this.showModal = !this.showModal;
              return;
            }
          }
          this.gameStats.currentTeam = this.gameStats.playerTeam;
        }
      }, 1500);

      if (
        this.gameBoard.getFreeGameBoardSlot() == null &&
        this.gameStats.enemyWins === false &&
        this.gameStats.playerWins === false
      ) {
        //tie
        this.gameStats.tieScore = this.gameStats.tieScore + 1;
        this.showModal = !this.showModal;
        this.modalMode = "tie";
      }
    },

    compareGameBoardItemHorizontal(currentGameBoardItem) {
      let horizontalStreak = 0;
      const horizontalValue = currentGameBoardItem.xValue;
      for (
        let currentYValue = 0;
        currentYValue < this.gameBoard.yMaxValue;
        currentYValue++
      ) {
        let compareGameBoardItem = this.gameBoard.gameBoardItems.find(
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
        currentXValue < this.gameBoard.xMaxValue;
        currentXValue++
      ) {
        let compareGameBoardItem = this.gameBoard.gameBoardItems.find(
          (gameItem) =>
            gameItem.xValue === currentXValue &&
            gameItem.yValue === verticalValue
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
        x <= this.gameBoard.xMaxValue && y < this.gameBoard.yMaxValue;
        x++, y++
      ) {
        let compareGameBoardItem = this.gameBoard.gameBoardItems.find(
          (item) => item.xValue === x && item.yValue === y
        );
        if (compareGameBoardItem == null) continue;
        if (compareGameBoardItem.value === currentGameBoardItem.value)
          diagonalStreak++;
      }

      if (diagonalStreak != 3) {
        diagonalStreak = 0;
        for (
          let x = 0, y = 2;
          x <= this.gameBoard.xMaxValue && y >= this.gameBoard.yMinValue;
          x++, y--
        ) {
          let compareGameBoardItem = this.gameBoard.gameBoardItems.find(
            (item) => item.xValue === x && item.yValue === y
          );
          if (compareGameBoardItem == null) continue;
          if (compareGameBoardItem.value === currentGameBoardItem.value)
            diagonalStreak++;
        }
      }
      return diagonalStreak;
    },
  },
});
