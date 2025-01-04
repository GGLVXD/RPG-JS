import { TiledMap as Map } from "@rpgjs/tiled";
import { Signal, h, loop, Viewport, Container } from "canvasengine";
import { TiledMap } from "@canvasengine/presets";
import { CharacterComponent } from "../components/Character";
import { GameEngineClient } from "../GameEngine";
import { RpgRenderer } from "../Renderer";
import { inject } from "../inject";

export function SceneMap(props: Signal<Map>) {
  const { height, tileheight, width, tilewidth } = props();
  const renderer = inject(RpgRenderer);
  const game = inject(GameEngineClient);

  return h(
    Viewport,
    { 
      clamp: {
        direction: "all",  
      },
      screenWidth: renderer.width,
      screenHeight: renderer.height,
      worldWidth: width * tilewidth,
      worldHeight: height * tileheight
    },
    h(TiledMap, {
      map: props,
      objectLayer: (layer) => {
        return loop(game.objects, (object, index) => { 
          const directive = {
            viewportFollow: object.id === game.playerId(),
          }
          return h(CharacterComponent, {
            ...object,
            ...directive
          })
        })
      },
    })
  );
} 
