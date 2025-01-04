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
  private canvasEl: HTMLElement;
  private selector: HTMLElement;
  private currentSceneName = signal("");
  private currentSceneData = signal({});
  private scenes = {};

  width = signal(800);
  height = signal(600);

  public guiEl: HTMLDivElement;

  constructor(private context: Context) {
    this.options = inject(context, ConfigToken)
  }

  /** @internal */
  init(scenes: Scenes): Promise<void> {
    // this.scenes = {
    //   map: SceneMap,
    //   ...scenes,
    // };
    return this.onDOMLoaded();
  }

  /** @internal */
  async onDOMLoaded(): Promise<void> {
    this.selector = document.body.querySelector(this.options?.selector ?? "#rpg") as HTMLElement;

    await bootstrapCanvas(this.selector , Canvas);

    // await h(
    //   Canvas,
    //   {
    //     canvasEl: this.canvasEl,
    //     selector: this.options.selector,
    //     width: this.width,
    //     height: this.height
    //   },
    //   cond(
    //     computed(() => this.currentSceneName()),
    //     () => {
    //       const name = this.currentSceneName();
    //       const sceneFn = this.scenes[name];
    //       if (!sceneFn) {
    //         throw new Error(`Scene ${name} not found`);
    //       }
    //       return sceneFn(this.currentSceneData);
    //     }
    //   )
    // );
  }

  loadScene(sceneName: string, data: any) {
    console.log(sceneName, data)
    this.currentSceneData.set(data);
    this.currentSceneName.set(sceneName);
  }
}
