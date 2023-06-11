class Snake {
    // 表示蛇頭元素
    head: HTMLElement;
    // 蛇身體元素(包含蛇頭)
    bodies: HTMLCollection;
    // 蛇的容器
    element: HTMLElement;

    constructor() {
        // 後面補上!表示不為空，因為 html 已經有定義
        this.head = document.querySelector("#snake > div")!;
        this.bodies = document.getElementById("snake")!.getElementsByTagName("div");
        this.element = document.getElementById("snake")!;
    }

    // 取得蛇頭座標
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }

    // 設定蛇頭座標
    set X(value: number) {
        if (this.X === value) return;

        if (value < 0 || value > 290) {
            throw Error("撞牆");
        }

        // 當蛇往左或右方向時，不能反向走
        if (this.bodies.length > 1 && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // 如果發生掉頭，不應該調整方向，應維持相同方向
            if (value > this.X) {
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }

        this.moveBody();

        this.head.style.left = value + "px";
        this.checkHeadTouchBody();
    }

    set Y(value: number) {
        if (this.Y === value) return;

        if (value < 0 || value > 290) {
            throw Error("撞牆");
        }

        // 當蛇往上或下方向時，不能反向走
        if (this.bodies.length > 1 && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // 如果發生掉頭，不應該調整方向，應維持相同方向
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }

        this.moveBody();

        this.head.style.top = value + "px";
        this.checkHeadTouchBody();
    }

    //增加蛇的身體
    addBody() {
        // 向element 增加一個 div
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }

    // 增加身體移動方法
    moveBody() {
        // 將最後的位置等於前面一節的位置做變動

        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 獲取位置前一個的位置
            let bX = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let bY = (this.bodies[i - 1] as HTMLElement).offsetTop;
            console.log(bX, bY);
            // 將獲取前一個值，設定到目前body
            (this.bodies[i] as HTMLElement).style.left = bX + "px";
            (this.bodies[i] as HTMLElement).style.top = bY + "px";
        }
    }

    // 檢查蛇是否撞到自己
    checkHeadTouchBody() {
        // 獲取身體的座標，判斷是否發生重疊
        for (let i = 1; i < this.bodies.length; i++) {
            if (
                this.X === (this.bodies[i] as HTMLElement).offsetLeft &&
                this.Y === (this.bodies[i] as HTMLElement).offsetTop
            ) {
                throw new Error("撞到自己的身體!");
            }
        }
    }
}

export default Snake;
