jaws.Background = function Background() {
    this.background = null, this.crash = new buzz.sound("sound/sonicboom.wav");
};

jaws.Background.prototype.init = function () {
    this.background = new jaws.Parallax({repeat_x: true});
    this.background.addLayer({image: "img/LAYER1.png", damping: 40});
    this.background.addLayer({image: "img/LAYER2.png", damping: 20});
    this.background.addLayer({image: "img/LAYER3.png", damping: 10});
    this.background.addLayer({image: "img/LAYER4.png", damping: 5});
};

jaws.Background.prototype.update = function () {
    this.background.camera_x += 2;
};

jaws.Background.prototype.draw = function () {
   this.background.draw();
};