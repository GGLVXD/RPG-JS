import { GameSide, RpgCommonGame, RpgCommonPlayer } from "@rpgjs/common";
import { ComputedSignal, computed, signal } from "canvasengine";

export class GameEngineClient extends RpgCommonGame {
  playerId = signal("");
  session = signal("");
  objects = signal<any[]>([]);
  player: ComputedSignal<RpgCommonPlayer | null> = computed(() => this.objects().find(object => object.id == this.playerId()))

  animationX: any;
  animationY: any;

  initialize() {
    super.initialize(GameSide.Client);
  }

  async updateObject(obj) {
    const { playerId: id, params, localEvent, paramsChanged, isShape } = obj;
    const findObject = this.objects().find((o: any) => o.id == id);
    if (!findObject) {
      const value = {
        id,
        ...params,
        x: signal(params.position?.x ?? params.x),
        y: signal(params.position?.y ?? params.y),
        direction: signal(params.direction),
      }
      this.objects.mutate((objs) =>
        objs.push(value)
      );
      // await this.physicScene.addObject(value, {
      //   x: value.x(),
      //   y: value.y(),
      //   width: 32,
      //   height: 32,
      // });
    } else {
      if (paramsChanged.position?.x) {
        // TODO
      }
      if (paramsChanged.position?.y) {
       // TODO
      }
      if (paramsChanged.direction !== undefined) {
        findObject.direction.set(paramsChanged.direction);
      }
    }
  }
}
