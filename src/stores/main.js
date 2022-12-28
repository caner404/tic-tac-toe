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
    playerWins() {
      this.gameStats.playerScore = this.gameStats.playerScore + 1;
      this.gameStats.playerWins = !this.gameStats.playerWins;
      this.modalMode = this.gameStats.getPlayerMark();
      this.showModal = !this.showModal;
      return;
    },
    enemyWins() {
      this.gameStats.enemyScore = this.gameStats.enemyScore + 1;
      this.gameStats.enemyWins = !this.gameStats.enemyWins;
      this.modalMode = this.gameStats.getEnemyMark();
      this.showModal = !this.showModal;
      return;
    },
    updateTie() {
      this.gameStats.tieScore = this.gameStats.tieScore + 1;
      this.showModal = !this.showModal;
      this.modalMode = "tie";
    },
    checkWin(hasWon, team) {
      if (team === "") return hasWon;
      else {
        return hasWon && this.gameStats.currentTeam === team;
      }
    },
    checkTie() {
      return (
        this.gameBoard.findFreeGameTile() == null &&
        this.gameStats.enemyWins === false &&
        this.gameStats.playerWins === false
      );
    },
    startRound(selectedTile) {
      let hasWon = false;
      let mark = "";

      if (selectedTile.value !== "") return;
      mark = this.gameStats.getCurrentMark();
      this.gameBoard.addMarkOnGameBoard(mark, selectedTile);
      let currentTile = this.gameBoard.getCurrentTile(selectedTile);

      hasWon = this.gameBoard.compareTile(currentTile);

      if (this.checkWin(hasWon, this.gameStats.playerTeam)) {
        this.playerWins();
        return;
      } else if (this.checkWin(hasWon, this.gameStats.enemyTeam)) {
        this.enemyWins();
        return;
      }
      this.gameStats.currentTeam = this.gameStats.switchTeams();

      const enemyTeamTimeout = setTimeout(() => {
        if (this.gameStats.isEnemy("cpu")) {
          let freeGameTile = this.gameBoard.findFreeGameTile();
          if (freeGameTile != null) {
            this.gameBoard.addMarkOnGameBoard(
              this.gameStats.getEnemyMark(),
              freeGameTile
            );

            hasWon = this.gameBoard.compareTile(freeGameTile);

            if (this.checkWin(hasWon, "")) {
              this.enemyWins();
              return;
            }
          }
          this.gameStats.currentTeam = this.gameStats.playerTeam;
        }
      }, 1500);

      if (this.checkTie()) this.updateTie();
    },
  },
});
