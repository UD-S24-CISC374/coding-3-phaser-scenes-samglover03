import Phaser from "phaser";

export default class WormScene extends Phaser.Scene {
    constructor() {
        super({ key: "WormScene" });
    }

    create() {
        this.add.image(600, 300, "worm").setScale(1.5, 1.5);
    }
}
