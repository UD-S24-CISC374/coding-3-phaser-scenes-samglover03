import Phaser from "phaser";
import { CONFIG } from "../config";

export type Collidable =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Tilemaps.Tile;

export default class FinalScene extends Phaser.Scene {
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    private spice?: Phaser.Physics.Arcade.Group;

    private scoreText?: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "FinalScene" });
    }

    create() {
        this.add.image(650, 350, "final");

        this.cursors = this.input.keyboard?.createCursorKeys();

        const floor = this.physics.add.staticImage(650, 725, "floorTexture");
        floor.setScale(100, 0).refreshBody();

        this.player = this.physics.add
            .sprite(0, 800, "character")
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
        });

        const message = `Phaser v${Phaser.VERSION}`;
        this.add
            .text(this.cameras.main.width - 15, 15, message, {
                color: "#000000",
                fontSize: "24px",
            })
            .setOrigin(1, 0);

        this.scoreText = this.add.text(
            16,
            16,
            `Spice Collected: ${CONFIG.score}`,
            {
                fontSize: "32px",
                color: "#000",
            }
        );

        this.spice = this.physics.add.group({
            key: "spice",
            repeat: 4,
            setXY: { x: 50, y: 0, stepX: 300 },
            setScale: { x: 0.04, y: 0.04 },
        });

        this.spice.children.iterate((c) => {
            const child = c as Phaser.Physics.Arcade.Image;
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            return true;
        });

        this.physics.world.setBoundsCollision(true, true, true, true);
        this.physics.add.collider(this.spice, floor);

        this.physics.add.overlap(
            this.player,
            this.spice,
            this.handleCollectSpice,
            undefined,
            this
        );
    }

    private handleCollectSpice(player: Collidable, s: Collidable) {
        const spice = s as Phaser.Physics.Arcade.Image;
        spice.disableBody(true, true);

        CONFIG.score += 10;
        this.scoreText?.setText(`Spice Collected: ${CONFIG.score}`);

        if (this.spice?.countActive(true) === 0) {
            this.spice.children.iterate((c) => {
                const child = c as Phaser.Physics.Arcade.Image;
                child.enableBody(true, child.x, 0, true, true);
                return true;
            });
        }
    }

    update() {
        if (this.cursors?.left.isDown) {
            this.player?.setVelocityX(-160);
            this.player?.anims.play("left", true);
        } else if (this.cursors?.right.isDown) {
            this.player?.setVelocityX(160);
            this.player?.anims.play("right", true);
        } else {
            this.player?.setVelocityX(0);
            this.player?.anims.play("turn");
        }

        if (this.player && this.player.x > 1200) {
            this.add.text(475, 200, "GAME OVER", {
                fontSize: "70px",
                color: "#000",
                align: "center",
            });
            this.add.text(350, 300, "The Fremen thank you!", {
                fontSize: "50px",
                color: "#000",
                align: "center",
            });
        }
    }
}
