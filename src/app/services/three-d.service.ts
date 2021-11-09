import { Injectable } from '@angular/core';
import {Se3DWidget} from "@sdk3d/3d-widget/dist/types/components/3d-widget/3d-widget";
import {RectangleSelectMode} from "@sdk3d/3d-widget/dist/types/services/interaction/selection.type";
import {MagnetizationMode} from "@sdk3d/3d-widget/dist/types/services/interaction/drag-and-drop.manager";
import {EnvService} from "../../environments/env.service";
import {ISkeletonNode} from "@sdk3d/3d-widget/dist/types/interfaces/skeleton-node";


@Injectable({
  providedIn: 'root'
})
export class ThreeDService {

  constructor(private readonly envService: EnvService) { }

  init(editor3D: Se3DWidget | null): void {
    console.warn('In init..........')
    if(!editor3D){
      console.error('In init, no 3D')
      return;
    }

    this.reset(editor3D);

    editor3D.config = {
      modelsDatabaseKey: this.envService.modelsDatabaseKey,
      modelsResourcesEndpoint: this.envService.modelsResourcesEndpoint.url ?? '',
      referencePointsEndpoint: this.envService.referencePointsEndpoint.url ?? '',
      baseHeaders: {
        Authorization:
          this.envService.referencePointsEndpoint.token ??
          this.envService.modelsResourcesEndpoint.token ?? ''
      }
    };

    if (editor3D.viewManager) {
      editor3D.viewManager.setDepthDarkener(true, 0.08);
      editor3D.viewManager.controls.enableRotate = false;
      editor3D.viewManager.controls.mouseButtons.LEFT = 2; // Pan with left click
      editor3D.viewManager.controls.mouseButtons.RIGHT = 0; // Rotate with right click
    }

    if (editor3D.interactionManager) {
      editor3D.interactionManager.selectionManager.enabled = false;
      editor3D.interactionManager.selectionManager.options.rectangleSelectMode =
        RectangleSelectMode.CONTAIN;
      editor3D.interactionManager.dragAndDropManager.enabled = true;
      editor3D.interactionManager.dragAndDropManager.setMagnetizationMode(
        MagnetizationMode.DELEGATED
      );
      /*editor3D.interactionManager.dragAndDropManager.setOnDragStartCallback(
        this.dragAndDropService.dragStart3d.bind(this.dragAndDropService)
      );
      editor3D.interactionManager.selectionManager.setOnSelectionCallback(
        this.selectionService.extendSelection.bind(this.selectionService)
      );*/
    }
    console.warn('Init 3D : DONE..........')
  }

  update3DViewer(
    skeleton: ISkeletonNode,
    editor3D: Se3DWidget | null
  ): Promise<unknown> {
    console.warn('update3DViewer....', skeleton)
    if (editor3D) {
      // At the beginning, likeUpdate must be false. The camera is somewhere in the world. If likeUpdate = true, the camera stays in this state
      // Solution : if likeUpdate = true at initialization, then call focusOnAll
      return editor3D
        .loadScene({ skeleton }, false, false)
        .then(() => {
          editor3D.viewManager.focusOnAll(false)})
        .catch(error => {
          error = error || {};
          error.context = 'Loading the assembly into the 3D view';
          return Promise.reject(error);
        });
    } else {
      console.error('DEAD .................... RIP..........')
    }

    return Promise.resolve();
  }

  private reset(editor3D: Se3DWidget): void {
    if(editor3D) {
      editor3D.clearScene();
    }
  }
}
