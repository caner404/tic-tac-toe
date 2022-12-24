import { defineStore } from "pinia";

export const useGameStatsStore = defineStore("gameStats", {
  state: () => ({
    playerWins: false,
    enemyWins: false,
    playerScore: 0,
    enemyScore: 0,
    tieScore: 0,
    playerTeam: "X",
    enemyTeam: "",
    currentTeam: "",
    enemyType: "",
  }),
  getters: {
    getPlayerWins: (state) => state.playerWins,
    getEnemyWins: (state) => state.enemyWins,
    getPlayerScore: (state) => state.playerScore,
    getEnemyScore: (state) => state.enemyScore,
    getTieScore: (state) => state.tieScore,
    getPlayerTeam: (state) => state.playerTeam,
    getEnemyTeam: (state) => state.enemyTeam,
    getEnemyType: (state) => state.enemyType,
    getCurrentTeam: (state) => state.currentTeam,
  },
  actions: {
    changeTeam() {
      this.playerTeam === "X"
        ? (this.playerTeam = "O")
        : (this.playerTeam = "X");
    },
    isPlayerTeamCross() {
      return this.playerTeam === "X";
    },
    isPlayerTeamCircle() {
      return this.playerTeam === "O";
    },
    isCurrentTeamCross() {
      return this.currentTeam === "X";
    },
    isCurrentTeamCircle() {
      return this.currentTeam === "O";
    },
    isATie() {
      return this.playerWins === false && this.enemyWins === false;
    },
    isEnemy(enemyType) {
      return this.enemyType === enemyType.toUpperCase();
    },
    getPlayerMark() {
      return this.isPlayerTeamCircle() ? "O" : "X";
    },
    getEnemyMark() {
      return this.isPlayerTeamCircle() ? "X" : "O";
    },
  },
});
