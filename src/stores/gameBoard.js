import { defineStore } from "pinia";

export const useGameboardStore = defineStore("gameBoard", {
  state: () => ({
    yMinValue: 0,
    xMinValue: 0,
    xMaxValue: 3,
    yMaxValue: 3,
    isGameboardActive: false,
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
  }),
  getters: {
    getGameBoardItems: (state) => state.gameBoardItems,
    isGameBoardActive: (state) => state.isGameboardActive,
    getXMinValue: (state) => state.xMinValue,
    getYMinValue: (state) => state.yMinValue,
    getXMaxValue: (state) => state.xMaxValue,
    getYMaxValue: (state) => state.yMaxValue,
  },
  actions: {
    isGameValueEmpty(gameItem) {
      return gameItem.value === "";
    },
    isGameValueCross(gameItem) {
      return gameItem.value === "X";
    },
    isGameValueCircle(gameItem) {
      return gameItem.value === "O";
    },
    resetValues() {
      this.gameBoardItems.forEach((item) => {
        item.value = "";
        item.hover = false;
      });
    },
    addMarkOnGameBoard(markValue, gameItem) {
      this.gameBoardItems.forEach((item) => {
        if (item.boxNumber === gameItem.boxNumber) {
          item.value = markValue;
          item.hover = !item.hover;
        }
      });
    },
    getCurrentGameBoardItem(item) {
      return this.gameBoardItems.find(
        (gameBoardItem) => gameBoardItem.boxNumber === item.boxNumber
      );
    },
    getFreeGameBoardSlot() {
      return this.gameBoardItems.find((item) => item.value == "");
    },
  },
});
