/*:
 * @target MZ
 * @plugindesc Adds a jump action when pressing PageUp, with terrain checks and sound effect.
 * @author Dane Reid
 *
 * @help
 * Press PageUp to jump forward in the direction the player is facing.
 * - Checks terrain tags in front of the player.
 * - Plays SE "Jump1".
 * - Example: tag a tile with Terrain Tag 1 to block jumps.
 */

(() => {
  // Alias update method for checking inputs
  const _Game_Player_update = Game_Player.prototype.update;
  Game_Player.prototype.update = function (sceneActive) {
    _Game_Player_update.call(this, sceneActive);
    this.updateJumpAction();
  };

  Game_Player.prototype.updateJumpAction = function () {
    if (Input.isTriggered("pageup")) {
      // only triggers once per keypress
      this.performJumpCheck();
    }
  };

  Game_Player.prototype.performJumpCheck = function () {
    const x = this.x;
    const y = this.y;
    const dir = this.direction();

    const faceDown = dir === 2;
    const faceLeft = dir === 4;
    const faceRight = dir === 6;
    const faceUp = dir === 8;

    const playJumpSound = () => {
      AudioManager.playSe({ name: "Jump1", volume: 90, pitch: 100, pan: 0 });
    };

    // ↓ Facing down
    if (faceDown) {
      if ($gameMap.terrainTag(x, y + 1) === 1) {
        this.jump(0, 0);
      } else if ($gameMap.terrainTag(x, y + 2) === 1) {
        this.jump(0, 1);
      } else {
        this.jump(0, 2);
      }
      playJumpSound();
    }

    // ← Facing left
    if (faceLeft) {
      if ($gameMap.terrainTag(x - 1, y) === 1) {
        this.jump(0, 0);
      } else if ($gameMap.terrainTag(x - 2, y) === 1) {
        this.jump(-1, 0);
      } else {
        this.jump(-2, 0);
      }
      playJumpSound();
    }

    // → Facing right
    if (faceRight) {
      if ($gameMap.terrainTag(x + 1, y) === 1) {
        this.jump(0, 0);
      } else if ($gameMap.terrainTag(x + 2, y) === 1) {
        this.jump(1, 0);
      } else {
        this.jump(2, 0);
      }
      playJumpSound();
    }

    // ↑ Facing up
    if (faceUp) {
      if ($gameMap.terrainTag(x, y - 1) === 1) {
        this.jump(0, 0);
      } else if ($gameMap.terrainTag(x, y - 2) === 1) {
        this.jump(0, -1);
      } else {
        this.jump(0, -2);
      }
      playJumpSound();
    }
  };
})();
