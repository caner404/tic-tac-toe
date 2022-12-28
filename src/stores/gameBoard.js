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
    getCurrentTile(item) {
      return this.gameBoardItems.find(
        (gameBoardItem) => gameBoardItem.boxNumber === item.boxNumber
      );
    },
    findFreeGameTile() {
      return this.gameBoardItems.find((item) => item.value == "");
    },
    findSpecificTile(xValue, yValue) {
      return this.gameBoardItems.find(
        (gameItem) => gameItem.xValue === xValue && gameItem.yValue === yValue
      );
    },
    compareTile(gameTile) {
      let samePair = 0;

      samePair = this.checkTileForWin(gameTile, "horizontal");
      if (samePair != 3) samePair = this.checkTileForWin(gameTile, "vertical");
      if (samePair != 3) samePair = this.checkTileForWin(gameTile, "");
      return samePair === 3 ? true : false;
    },
    checkTileForWin(currentTile, direction) {
      let samePair = 0;
      const currentXValue = currentTile.xValue;
      const currentYValue = currentTile.yValue;
      const currentValue = currentTile.value;

      if (direction === "horizontal") {
        for (let yValue = 0; yValue < this.yMaxValue; yValue++) {
          if (this.compareTiles(currentValue, currentXValue, yValue))
            samePair++;
        }
      } else if (direction === "vertical") {
        for (let xValue = 0; xValue < this.xMaxValue; xValue++) {
          if (this.compareTiles(currentValue, xValue, currentYValue))
            samePair++;
        }
      } else {
        for (
          let xValue = 0, yValue = 0;
          xValue <= this.xMaxValue && yValue < this.yMaxValue;
          xValue++, yValue++
        ) {
          if (this.compareTiles(currentValue, xValue, yValue)) samePair++;
        }

        if (samePair != 3) {
          samePair = 0;
          for (
            let xValue = 0, yValue = 2;
            xValue <= this.xMaxValue && yValue >= this.yMinValue;
            xValue++, yValue--
          ) {
            if (this.compareTiles(currentValue, xValue, yValue)) samePair++;
          }
        }
      }
      return samePair;
    },
    compareTiles(currentValue, xValue, yValue) {
      let compareTile = this.findSpecificTile(xValue, yValue);
      if (compareTile == null) return false;
      return compareTile.value === currentValue ? true : false;
    },
  },
});
