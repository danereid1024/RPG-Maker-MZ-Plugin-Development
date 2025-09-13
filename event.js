/*:
 * @target MZ
 * @plugindesc Spawn a new Bomb event at the player’s position when pressing PageUp.
 * @author You
 */

(() => {
  const _Game_Player_update = Game_Player.prototype.update;
  Game_Player.prototype.update = function (sceneActive) {
    _Game_Player_update.call(this, sceneActive);
    if (Input.isTriggered("pageup")) {
      this.spawnBombEvent(this.x, this.y);
    }
  };

  Game_Player.prototype.spawnBombEvent = function (x, y) {
    const newId = $dataMap.events.length;

    // Minimal event structure with graphic + erase event command
    const newEventData = {
      id: newId,
      name: "Bomb",
      note: "",
      pages: [
        {
          conditions: {
            actorId: 1,
            actorValid: false,
            itemId: 1,
            itemValid: false,
            selfSwitchCh: "A",
            selfSwitchValid: false,
            switch1Id: 1,
            switch1Valid: false,
            switch2Id: 1,
            switch2Valid: false,
            variableId: 1,
            variableValid: false,
            variableValue: 0,
          },
          directionFix: false,
          image: {
            tileId: 0,
            characterName: "!Other1", // sprite sheet (put your bomb sprite here)
            characterIndex: 0, // which sprite on the sheet
            direction: 2,
            pattern: 0,
          },
          moveFrequency: 3,
          moveRoute: {
            list: [{ code: 0 }],
            repeat: true,
            skippable: false,
            wait: false,
          },
          moveSpeed: 3,
          priorityType: 1, // same as player
          stepAnime: false,
          through: false,
          trigger: 0, // action button
          walkAnime: true,
          list: [
            { code: 214, indent: 0, parameters: [] }, // Erase Event
            { code: 0, indent: 0, parameters: [] }, // End of list
          ],
        },
      ],
      x: x,
      y: y,
    };

    // Add to data and game map
    $dataMap.events[newId] = newEventData;
    const gameEvent = new Game_Event($gameMap._mapId, newId);
    $gameMap._events[newId] = gameEvent;

    // Add to spriteset so it appears immediately
    const scene = SceneManager._scene;
    if (scene && scene instanceof Scene_Map) {
      const sprite = new Sprite_Character(gameEvent);
      scene._spriteset._characterSprites.push(sprite);
      scene._spriteset._tilemap.addChild(sprite);
    }
  };
})();
