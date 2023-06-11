import "./style/index.less";

import GameControl from "./moduls/GameControl";

new GameControl();

// 測試代碼 food
// const food = new Food();
// console.log(food.X, food.Y);
// let count = 1;
// const timer = setInterval(() => {
//     food.change();
//     console.log(food.X, food.Y);
//     count++;
//     if (count > 10) {
//         clearInterval(timer);
//     }
// }, 1000);

// score panel 測試
// let s = new ScorePanel();
// let count = 1;
// const timer = setInterval(() => {
//     s.addScore();
//     count++;
//     if (count > 1000) {
//         clearInterval(timer);
//     }
// }, 100);
