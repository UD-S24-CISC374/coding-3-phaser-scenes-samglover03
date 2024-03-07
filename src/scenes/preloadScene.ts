import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("dune", "assets/dune.jpg");
        this.load.spritesheet("character", "assets/character.png", {
            frameWidth: 383.5,
            frameHeight: 500,
        });
    }   

    create() {
        this.scene.start("MainScene");
    }
}
