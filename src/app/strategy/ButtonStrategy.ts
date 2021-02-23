import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../styleLibrary";
import { GraphEditorService } from "../services/graph-editor.service";

export class ButtonStrategy extends ICreateComponentStrategy {

  constructor(geometry?) {
    super(geometry);
  }

  createButtonVertex(graphEditorService: GraphEditorService, buttonComponent, parent:mxCell) {
    const style = StyleLibrary[0]["button"];
    const width = 15 * buttonComponent.text.length;
    const height = 40;
    const buttonGeometry = new mxGeometry(this.basex, this.basey, width, height);

    let buttonCell = graphEditorService.insertVertex(buttonComponent.text, buttonGeometry, parent, style);
    buttonCell["componentPart"] = "box";
    buttonCell["isPrimary"] = true;
    buttonCell["componentID"] = buttonComponent.id;
    buttonCell["type"] = buttonComponent.type;
    return buttonCell;
  }

  createComponent(graphEditorService: GraphEditorService, buttonComponent, parent:mxCell): mxCell{
    let buttonVertex = this.createButtonVertex(graphEditorService, buttonComponent, parent);
    return buttonVertex;
  }
}
