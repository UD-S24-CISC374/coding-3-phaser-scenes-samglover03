import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super({ key: "MainScene" });
    }

    create() {
        this.add.image(650, 350, "dune").setScale(1.5, 1.5);

        this.cursors = this.input.keyboard?.createCursorKeys();

        this.player = this.physics.add
            .sprite(650, 450, "character")
            .setScale(0.25, 0.25);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("character", {
                start: 8,
                end: 11,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "character", frame: 1 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right", 
            frames: this.anims.generateFrameNumbers("character", {
                start: 4, 
                end: 7,
            }),
            frameRate: 10,
            repeat: -1,
        })

        const message = `Phaser v${Phaser.VERSION}`;
        this.add
            .text(this.cameras.main.width - 15, 15, message, {
                color: "#000000",
                fontSize: "24px",
            })
            .setOrigin(1, 0);
    }

    update() {
        if (this.cursors?.left.isDown) {
            this.player?.setVelocityX(-160);
            this.player?.anims.play("left", true);
        }
        else if (this.cursors?.right.isDown) {
            this.player?.setVelocityX(160);
            this.player?.anims.play("right", true);
        } else {
            this.player?.setVelocityX(0);
            this.player?.anims.play("turn");
        }

        if(this.player && this.player.x > 1200){
            this.scene.switch('WormScene');
        }
    }
}
