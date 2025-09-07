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
 * It does not provide plugin commands.
 */
(() => {
  Sprite_Actor.prototype.setActorHome = function (index) {
    this.setHome(400 + index * 32, 480 + index * 48);
  };
  Sprite_Actor.prototype.moveToStartPosition = function () {
    this.startMove(0, 50, 0);
  };

  Window_BattleStatus.prototype.drawItemImage = function (index) {
    const actor = this.actor(index);
    const rect = this.faceRect(index);
  };

  Scene_Battle.prototype.partyCommandWindowRect = function () {
    const ww = Graphics.boxWidth;
    const wh = this.windowAreaHeight();
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    const wy = Graphics.boxHeight - wh;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Battle.prototype.actorCommandWindowRect = function () {
    const ww = Graphics.boxWidth;
    const wh = this.windowAreaHeight();
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    const wy = Graphics.boxHeight - wh;
    return new Rectangle(wx, wy, ww, wh);
  };
})();
