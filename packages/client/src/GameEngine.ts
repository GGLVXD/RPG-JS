import { GameSide, RpgCommonGame, RpgCommonPlayer } from "@rpgjs/common";
import { ComputedSignal, computed, signal } from "canvasengine";
import { load, sync, users } from "@signe/sync";

class GameObject {
  position = {
    x: signal(0),
    y: signal(0),
  };
  @sync() direction = signal(0);
  @sync() graphics = signal([]);
}

class Scene {
  @sync(GameObject) users = signal({});
}

export class GameEngineClient extends RpgCommonGame {
  scene = new Scene();
  playerId = signal("");
  session = signal("");
  player: ComputedSignal<RpgCommonPlayer | null> = computed(
    () => this.objects()[this.playerId()]
  );
  animationX: any;
  animationY: any;
  lastObjects = {
    users: {},
  };

  initialize() {
    super.initialize(GameSide.Client);
  }

  sync(obj, allData) {
    if (!allData) return;

    const _allData = structuredClone(allData)

    for (const key in this.lastObjects.users) {
      if (!(key in allData.users)) {
        _allData.users[key] = "$delete";
      }
    }

    load(this.scene, _allData, true);

    this.lastObjects = allData;
  }

  get objects() {
    return this.scene.users;
  }

  getScene() {
    return this.scene;
  }
}
