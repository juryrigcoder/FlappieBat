jaws.Hud = function Hud() {
    this.sprite = new jaws.Sprite({ image: "img/pause-btn.png" }), this.paused = false;
};

jaws.Hud.prototype.draw = function () {
    this.sprite.draw();
};

jaws.Hud.prototype.update = function () {

};

jaws.Hud.prototype.pausedGame = function () {
    function hitTest(target){
        if(jaws.pressedWithoutRepeat("left_mouse_button") && (jaws.mouse_x <= (target.x + target.width)  && jaws.mouse_x >= target.x && jaws.mouse_y >= target.y && jaws.mouse_y <= (target.y + target.height))){
            if(!this.paused){
                jaws.game_loop.pause();
                return this.paused = true;
            }
            if(this.paused){
                jaws.game_loop.unpause();
                return this.paused = false;
            }
        }
    }
    hitTest(this.sprite);
};