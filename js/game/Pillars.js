jaws.Pillars = function () {
    this.sprite = null;
    this.spriteStartPositionX = 400;
    this.TopPillar = null;
    this.BottomPillar = null;
    this.scored = false;
    this.PillarSpeed = 2;
    this.PillarWidth = 55;
    this.TopPillarHeight = 308;
    this.BottomPillarHeight = 340;
    this.BottomPillarStartFromTop = 460;
    this.PillarTraversalY = 200;
    this.init();
};

jaws.Pillars.prototype.init = function (img) {
    var Img = img ? img : "img/pillar.png";
    this.sprite = new jaws.Sprite({ image: Img, x: this.spriteStartPositionX, y: -Number(Math.floor(Math.random() * this.PillarTraversalY))});
    this.TopPillar = new jaws.Rect(this.sprite.x, this.sprite.y, this.PillarWidth, this.TopPillarHeight);
    this.BottomPillar = new jaws.Rect(this.sprite.x, (this.sprite.y + this.BottomPillarStartFromTop), this.PillarWidth, this.BottomPillarHeight);
};

jaws.Pillars.prototype.update = function () {
    this.sprite.x -= this.PillarSpeed;
    this.TopPillar.x -= this.PillarSpeed;
    this.BottomPillar.x -= this.PillarSpeed;
};

jaws.Pillars.prototype.draw = function () {
    this.sprite.draw();
};