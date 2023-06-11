class Food {
    // 定義一個屬性表示食物對應的元素
    element: HTMLElement;

    constructor() {
        // ! 表示不會是空值
        // 獲取頁面中的 food 元素，並將其賦值給 element
        this.element = document.getElementById("food")!;
    }

    // get food x/y axis
    get X() {
        return this.element.offsetLeft;
    }
    get Y() {
        return this.element.offsetTop;
    }
    // 修改食物位置
    change() {
        // 食物隨機位置
        // x/y: 0-290，必須是十的倍數，因為蛇移動也是 10px 一格
        let left = Math.round(Math.random() * 29) * 10;
        let top = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + "px";
        this.element.style.top = top + "px";
    }
}

export default Food;
