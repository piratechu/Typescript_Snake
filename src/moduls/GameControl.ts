// 遊戲控制器，控制其他所有的類
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

class GameControl {
    // 定義三個屬性
    // 蛇
    snake: Snake;
    // 食物
    food: Food;
    // 記分板
    scorePanel: ScorePanel;
    // 紀錄方向
    direction: string = "";
    // 遊戲是否進行中
    isLive: boolean = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        // 初始化，開始遊戲
        this.init();
    }

    // 遊戲初始化方法，呼叫後遊戲開始
    init() {
        // 綁定鍵盤按下的事件
        document.addEventListener("keydown", this.keydownHandler.bind(this));
        // 呼叫Run方法，使蛇移動
        this.run();
    }
    // 建立一個鍵盤按下的響應函數
    keydownHandler(event: KeyboardEvent) {
        // console.log(event.key);
        // IE抓取到的資訊，會沒有 Arrow 的字眼
        // ArrowRight, ArrowLeft, ArrowDown, ArrowUp

        // 修改目前方向

        this.direction = event.key;
        console.log(this.direction);
    }

    // 移動控制蛇移動的方法
    run() {
        // 根據方向(this.direction) 來使蛇位置改變
        // 向上 : top減少
        // 向下 : top增加
        // 向左 : left減少
        // 向右 : left增加

        // 取得目前蛇的座標
        let sX = this.snake.X;
        let sY = this.snake.Y;

        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                // 向上移動，top減少
                sY -= 10;
                break;
            case "ArrowDown":
            case "Down":
                // 向下移動，top增加
                sY += 10;
                break;
            case "ArrowLeft":
            case "Left":
                // 向左移動，left減少
                sX -= 10;
                break;
            case "ArrowRight":
            case "Right":
                // 向右移動，left增加
                sX += 10;
                break;
        }
        // 檢查蛇是否吃到食物
        this.checkFood(sX, sY);

        // 將變動值設定回去
        try {
            this.snake.X = sX;
            this.snake.Y = sY;
        } catch (e: any) {
            // 捕獲 class snake 邊界判斷，抓到撞牆異常
            alert(e.message + "Game Over!!");

            // set isLive
            this.isLive = false;
        }

        // 開啟定時器，定期呼叫 run 去移動
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 10);
    }

    // 定義一個方法是否吃到食物
    checkFood(x: number, y: number): boolean {
        if (x === this.food.X && y === this.food.Y) {
            // 改變下一個食物位置
            this.food.change();
            // 增加分數
            this.scorePanel.addScore();
            // 身體加長
            this.snake.addBody();

            return true;
        }
        return false;
    }
}

export default GameControl;
