import { Utils } from "@rpgjs/common";
import { signal, bootstrapCanvas } from "canvasengine";
import Canvas from './scenes/canvas.ce'
import { Context, inject } from "@signe/di";
import { ConfigToken } from "./inject";
import { RpgClientEntryPointOptions } from "./clientEntryPoint";

const { elementToPositionAbsolute } = Utils;

export enum TransitionMode {
  None,
  Fading,
}

export type Scenes = {
  [key: string]: (...props) => any;
};

export class RpgRenderer {
  private options!: RpgClientEntryPointOptions
  private selector: HTMLElement;
  currentSceneName = signal("");
  currentSceneData = signal(null);

  width = signal(800);
  height = signal(600);

  constructor(private context: Context) {
    this.options = inject(context, ConfigToken)
  }

  /** @internal */
  init(scenes: Scenes): Promise<void> {
    return this.onDOMLoaded();
  }

  /** @internal */
  async onDOMLoaded(): Promise<void> {
    this.selector = document.body.querySelector(this.options?.selector ?? "#rpg") as HTMLElement;
    await bootstrapCanvas(this.selector , Canvas);
  }

  loadScene(sceneName: string, data: any) {
    this.currentSceneData.set(data);
    this.currentSceneName.set(sceneName);
  }
}
