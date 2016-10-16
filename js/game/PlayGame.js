function GameLevelOneState() {
    var background = new jaws.Background();
    var bird = new jaws.Bird();
    var hud = new jaws.Hud();
    var score = 0;
    var scoreText = null;
    var pillar = null;
    var pillarsTimer = 2000;
    var PillarsTimerElapsed = 0;
    var fired = true;

    this.setup = function () {
        jaws.canvas.width = 360;
        jaws.canvas.height = 600;
        this.reset();
        scoreText = new jaws.Text({
            text: " " + score,
            x: jaws.canvas.width / 2 - 20,
            y: 100,
            color: "yellow",
            fontSize: "80",
            fontFace: "Arial",
            shadowColor: "rgba(63,107,169, 0.5)",
            shadowOffsetY: 5
        });
    };

    this.reset = function () {
        bird.dead = false;
        bird.YSpeed = 0;
        background.crash.stop();
        background.init();
        bird.init();
        pillar = new jaws.SpriteList();
        pillar.push(new jaws.Pillars());
        score = 0;
        PillarsTimerElapsed = 0;
    };

    this.pillarCreator = function () {
        pillarsTimer = function () {
            var temp = Math.ceil((Math.random() * (200 - 15) + 15));
            return 100 * temp;
        };
        PillarsTimerElapsed += jaws.game_loop.tick_duration;
        if (PillarsTimerElapsed > pillarsTimer()) {
            var tmp = new jaws.Pillars();
            tmp.init();
            pillar.push(tmp);
            PillarsTimerElapsed = 0;
        }
    };

    this.update = function () {
        this.pillarCreator();
        if (!bird.dead) {
            for (var i = pillar.length - 1; i > -1; i--) {
                if (pillar.at(i).sprite.x < -50) {
                    pillar.remove(pillar.at(i));
                }
                else {
                    pillar.at(i).update();
                    if (!pillar.at(i).scored && bird.sprite.x > pillar.at(i).sprite.x + 50) {
                        pillar.at(i).scored = true;
                        score++;
                    }
                    if ((bird.rect().collideRect(pillar.at(i).TopPillar) || bird.rect().collideRect(pillar.at(i).BottomPillar)) && jaws.collideOneWithOne(bird.sprite, pillar.at(i).sprite)) {
                        bird.dead = true;
                        background.crash.play();
                    }
                }
            }
            bird.update();
            background.update();
            hud.update();
        }
        scoreText.text = " " + score;
    };

    this.draw = function () {
        jaws.context.clearRect(0, 0, jaws.width, jaws.height);
        background.draw();
        for (var i = 0; i < pillar.length; i++) {
            pillar.at(i).draw();
        }
        bird.draw();
        scoreText.draw();
        hud.draw();
        if (bird.dead) {
            jaws.switchGameState(GameOverState, {fps: 30, width: 360, height: 600});
        }
    };

    this.pausedGame = function () {
        var timer = null;
        if (!fired) {
            hud.pausedGame();
        }
        if (fired) {
            jaws.game_loop.pause();
            timer = setTimeout(function () {
                jaws.game_loop.unpause();
            }, 3000);
            return fired = false;
        }
    };
}

function MenuState() {
    var index = 0;
    var items = ["Start", "Settings"];

    this.setup = function () {
        index = 0;
        jaws.on_keydown(["down", "s"], function () {
            index++;
            if (index >= items.length) {
                index = items.length - 1
            }
        });
        jaws.on_keydown(["up", "w"], function () {
            index--;
            if (index < 0) {
                index = 0
            }
        });
        jaws.on_keydown(["enter", "space", "left_mouse_button"], function () {
            if (items[index] == "Start") {
                jaws.switchGameState(GameLevelOneState, {fps: 60, width: 360, height: 600})
            }else if(items[index] == "Settings"){
                jaws.switchGameState(SettingsState, {fps: 60, width: 360, height: 600})
            }
        });
    }

    this.draw = function () {
        jaws.context.clearRect(0, 0, jaws.width, jaws.height);
        jaws.context.fillStyle = "gray";
        jaws.context.fillRect(0, 0, jaws.width, jaws.height);
        for (var i = 0; items[i]; i++) {
            jaws.context.font = "50px Arial";
            jaws.context.textAlign = 'center';
            jaws.context.lineWidth = 10;
            jaws.context.fillStyle = (i == index) ? "Red" : "Black";
            jaws.context.strokeStyle = "rgba(200,200,200,0.0)";
            jaws.context.fillText(items[i], jaws.width / 2, 200 + i * 60);
        }
    }
}

function GameOverState() {
    var gameover = null;

    this.setup = function () {
        gameover = new jaws.Sprite({image: "img/gameover.png", y: jaws.height / 2 - 110});
    }

    this.update = function () {
        if (jaws.pressedWithoutRepeat("r")) {
            fired = true;
            GameLevelOneState.reset;
            jaws.switchGameState(GameLevelOneState, {fps: 60, width: 360, height: 600});
        }
    }

    this.draw = function () {
        gameover.draw();
    }
}

function SettingsState() {
    var index = 0;
    var items = ["PlayGame", "Menu"];

    this.setup = function(){
        index = 0;
        jaws.on_keydown(["down", "s"], function () {
            index++;
            if (index >= items.length) {
                index = items.length - 1
            }
        });
        jaws.on_keydown(["up", "w"], function () {
            index--;
            if (index < 0) {
                index = 0
            }
        });
        jaws.on_keydown(["enter", "space", "left_mouse_button"], function () {
            if (items[index] == "PlayGame") {
                jaws.switchGameState(GameLevelOneState, {fps: 60, width: 360, height: 600})
            }else if(items[index] == "Menu"){
                jaws.switchGameState(MenuState, {fps: 60, width: 360, height: 600})
            }
        });
    }

    this.draw = function(){
        jaws.context.clearRect(0, 0, jaws.width, jaws.height);
        jaws.context.fillStyle = "gray";
        jaws.context.fillRect(0, 0, jaws.width, jaws.height);
        for (var i = 0; items[i]; i++) {
            jaws.context.font = "50px Arial";
            jaws.context.textAlign = 'center';
            jaws.context.lineWidth = 10;
            jaws.context.fillStyle = (i == index) ? "Red" : "Black";
            jaws.context.strokeStyle = "rgba(200,200,200,0.0)";
            jaws.context.fillText(items[i], jaws.width / 2, 200 + i * 60);
        }
    }
}

jaws.onload = function () {
    jaws.assets.add("img/pause-btn.png", "img/pillar.png", "img/gameover.png", "img/animation.png", "sound/jump.wav", "sound/sonicboom.wav", "img/LAYER1.png", "img/LAYER2.png", "img/LAYER3.png", "img/LAYER4.png");
    jaws.start(MenuState, {fps: 30, width: 360, height: 600});
}