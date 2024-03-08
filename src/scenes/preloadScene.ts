import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("dune", "assets/dune.jpg");
        this.load.image("worm", "assets/worm.jpeg");
        this.load.image("pyramid", "assets/pyramid.webp");
        this.load.image("final", "assets/hill.jpeg");
        this.load.image("spice", "assets/spice.png");
        this.load.spritesheet("character", "assets/character.png", {
            frameWidth: 383.5,
            frameHeight: 500,
        });
    }

    create() {
        this.scene.start("MainScene");
    }
}
