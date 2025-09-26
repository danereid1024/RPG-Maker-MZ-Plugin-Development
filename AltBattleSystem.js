//=============================================================================
// RPG Maker MZ - Alternative Battle System
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Alternative battle system. Similar to Final Fantasy Mystic Quest
 * @author Dane Reid
 *
 * @help AltBattleSystem.js
 *
 * This plugin changes the layout of sprites during battle.
 * It places the battlers and enemy battlers vertically to each other.
 *
 * It does not provide plugin commands. Test
 */
(() => {
  Sprite_Actor.prototype.setActorHome = function (index) {
    this.setHome(400 + index * 32, 420 + index * 48);
  };
  Sprite_Actor.prototype.moveToStartPosition = function () {
    this.startMove(0, 50, 0);
  };

  Sprite_Actor.prototype.stepForward = function () {
    this.startMove(0, -10, 12);
  };

  Sprite_Actor.prototype.stepBack = function () {
    this.startMove(0, 10, 12);
  };

  Sprite_Actor.prototype.retreat = function () {
    this.startMove(0, 300, 30);
  };

  Sprite_Actor.prototype.onMoveEnd = function () {
    Sprite_Battler.prototype.onMoveEnd.call(this);
    if (!BattleManager.isBattleEnd()) {
      this.refreshMotion();
    }
  };

  Window_BattleStatus.prototype.drawItemImage = function (index) {
    const actor = this.actor(index);
    const rect = this.faceRect(index);
  };

  Scene_Battle.prototype.partyCommandWindowRect = function () {
    const ww = Graphics.boxWidth;
    const wh = 70;
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    const wy = Graphics.boxHeight - wh;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Battle.prototype.actorCommandWindowRect = function () {
    const ww = Graphics.boxWidth;
    const wh = 112;
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    const wy = Graphics.boxHeight - wh;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Battle.prototype.statusWindowRect = function () {
    const ww = Graphics.boxWidth;
    const wh = 100;
    const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth;
    const wy = Graphics.boxHeight - wh - 110;
    return new Rectangle(wx, wy, ww, wh);
  };

  Window_PartyCommand.prototype.maxCols = function () {
    return 2;
  };
  Window_ActorCommand.prototype.maxCols = function () {
    return 2;
  };

  Window_BattleStatus.prototype.itemWidth = function () {
    return Graphics.boxWidth / 2;
  };

  Window_BattleStatus.prototype.placeBasicGauges = function (actor, x, y) {
    this.placeGauge(actor, "hp", x, y);
    this.placeGauge(actor, "mp", x + 200, y);
  };
  Sprite_Gauge.prototype.bitmapWidth = function () {
    return 178;
  };

  Scene_Battle.prototype.updateStatusWindowPosition = function () {
    const statusWindow = this._statusWindow;
    const targetY = this.statusWindowY();
    if (statusWindow.y < targetY) {
      statusWindow.y = Math.min(statusWindow.y + 7, targetY);
    }
    if (statusWindow.y > targetY) {
      statusWindow.y = Math.max(statusWindow.y - 7, targetY);
    }
  };
  Scene_Battle.prototype.statusWindowY = function () {
    if (this.isAnyInputWindowActive()) {
      return this.statusWindowRect().y;
    } else {
      return this._partyCommandWindow.height + 450;
    }
  };
})();
