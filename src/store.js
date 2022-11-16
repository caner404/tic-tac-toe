import { reactive } from "vue";

export const store = reactive({
  isGameboardActive: false,
  playerTeam: "X",
  enemyTeam: "",
  changeTeam() {
    this.playerTeam === "X" ? (this.playerTeam = "O") : (this.playerTeam = "X");
  },
  initGameWithCPU() {
    this.isGameboardActive = !this.isGameboardActive;
    this.enemyTeam = "CPU";
  },
  initGameWithPlayer() {
    this.isGameboardActive = !this.isGameboardActive;
    this.enemyTeam = "P1";
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
});
