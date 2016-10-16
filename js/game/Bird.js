jaws.Bird = function Bird() {
    this.anim, this.sprite = null;
    this.dead = false;
    this.jumpTimer = 500;
    this.jumpElapsed = 0;
    this.YSpeed = 0;
};

jaws.Bird.prototype.init = function () {
    this.sprite = new jaws.Sprite({x:150, y:300, rotate: -45, anchor: "center"});
    this.anim = new jaws.Animation({sprite_sheet: "img/animation.png", frame_size: [40,40], frame_duration: 100});
    this.sprite.anim_default = this.anim.slice(0,5);
    this.sprite.setImage( this.sprite.anim_default.next() );
    this.mySound = new buzz.sound("sound/jump.wav");
};

jaws.Bird.prototype.update = function () {
    this.sprite.setImage( this.sprite.anim_default.next() );
    this.YSpeed += 0.4;
    this.jumpElapsed += jaws.game_loop.tick_duration;
    this.sprite.rotateTo(Math.atan2(this.YSpeed, 7) * (180 / Math.PI));
    this.sprite.y += this.YSpeed;
    if (this.jumpElapsed > this.jumpTimer) {
        this.jumpElapsed = 0;
    }
    if (jaws.pressedWithoutRepeat("space")){
        this.YSpeed = -Number(5);
        this.mySound.play();
    }
    if (this.sprite.y > 500) {
        this.dead = true;
    }
};

jaws.Bird.prototype.draw = function () {
    this.sprite.draw();
};

jaws.Bird.prototype.rect = function () {
    return this.sprite.rect();
};