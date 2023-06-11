class ScorePanel {
    // 紀錄分數與等級
    score: number = 0;
    level: number = 1;
    // 定義頁面需要賦值 element，構造函數中初始化
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    constructor() {
        this.scoreEle = document.getElementById("score")!;
        this.levelEle = document.getElementById("level")!;
    }
    // 加分方法
    addScore() {
        this.score++;
        this.scoreEle.innerHTML = this.score + "";
        // 判斷分數，提供升級條件，目前使用等比級數和來作為條件
        if (this.score > 2 ** (this.level - 1) * 10) {
            console.log(2 ** (this.level - 1) * 10);
            this.levelUp();
        }
    }

    // 等級提升
    levelUp() {
        if (this.level < 10) {
            this.level++;
            this.levelEle.innerHTML = this.level + "";
        }
    }
}

export default ScorePanel;
