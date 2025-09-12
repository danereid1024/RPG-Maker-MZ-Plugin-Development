(() => {
  const _Game_Player_update = Game_Player.prototype.update;
  Game_Player.prototype.update = function (sceneActive) {
    _Game_Player_update.call(this, sceneActive);
    this.updateBombAction();
  };

  Game_Player.prototype.updateBombAction = function () {
    if (Input.isTriggered("pagedown")) {
      this.performBombCheck();
    }
  };

  Game_Player.prototype.performBombCheck = function () {
    const x = this.x;
    const y = this.y;
    const faceDown = 2;
    const faceLeft = 4;
    const faceRight = 6;
    const faceUp = 8;
    let playerX;
    let playerY;

    // Convert map coords → screen coords
    const screenX =
      $gameMap.adjustX(x) * $gameMap.tileWidth() + $gameMap.tileWidth() / 2;
    const screenY =
      $gameMap.adjustY(y) * $gameMap.tileHeight() + $gameMap.tileHeight() / 2;

    const placeBomb = () => {
      if (faceDown) {
        $gameScreen.showPicture(
          1,
          "bomb",
          100,
          screenX,
          screenY,
          100,
          100,
          255,
          0
        );
        //creating a varible for the areas so if anything matches the variable coordinates then it will explode
        playerX = $gamePlayer.x;
        playerY = $gamePlayer.y;
      }
    };
    placeBomb();
  };
})();
