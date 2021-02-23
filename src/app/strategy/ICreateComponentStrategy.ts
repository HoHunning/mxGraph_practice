export abstract class ICreateComponentStrategy {
  basex: number;
  basey: number;
  height:number;
  width: number;
  restoreMode:Boolean = false;

  constructor(geometry?) {
    if (geometry == undefined) {
      this.basex = 0;
      this.basey = 0;
    } else {
      this.basex = geometry.x;
      this.basey = geometry.y;
      this.width = geometry.width;
      this.height = geometry.height;
    }
  }
  abstract createComponent(graphEditorService, uiComponent, parent?:mxCell);
}
