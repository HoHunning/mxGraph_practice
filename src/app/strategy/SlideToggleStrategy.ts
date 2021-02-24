import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../styleLibrary";
import { GraphEditorService } from "../services/graph-editor.service";

export class SlideToggleStrategy extends ICreateComponentStrategy {

  constructor(geometry?) {
    super(geometry);
  }

  createBarVertex(graphEditorService: GraphEditorService, slideToggleComponent, parent:mxCell) {
    let style = StyleLibrary[0]["slideToggle"]["bar_1"];
    if(slideToggleComponent.on == "True")
        style = StyleLibrary[0]["slideToggle"]["bar_2"];
    const width = 50;
    const height = 20;
    const barGeometry = new mxGeometry(this.basex, this.basey, width, height);

    let barCell = graphEditorService.insertVertex("", barGeometry, parent, style);
    barCell["componentPart"] = "bar";
    barCell["isPrimary"] = true;
    barCell["componentID"] = slideToggleComponent.id;
    barCell["type"] = slideToggleComponent.type;
    if(slideToggleComponent.on == "True")
      barCell["on"] = true;
    else
      barCell["on"] = false;
      return barCell;
  }
  createIconVertex(graphEditorService: GraphEditorService, slideToggleComponent, parent:mxCell) {
    const width = 20;
    const height = 20; 
    let style = StyleLibrary[0]["slideToggle"]["icon_1"];
    let barGeometry = new mxGeometry(0, this.basey, width, height);
    if(slideToggleComponent.on == "True"){
        style = StyleLibrary[0]["slideToggle"]["icon_2"];
        barGeometry['x'] = parent.geometry.width - width;
    }

    let iconCell = graphEditorService.insertVertex("", barGeometry, parent, style);
    iconCell["componentPart"] = "icon";
    iconCell["isPrimary"] = false;
    iconCell["componentID"] = slideToggleComponent.id;
    iconCell["type"] = slideToggleComponent.type;

    return iconCell;
  }

  createComponent(graphEditorService: GraphEditorService, slideToggleComponent, parent:mxCell): mxCell{
    let slideToggleVertex = this.createBarVertex(graphEditorService, slideToggleComponent, parent);
    this.createIconVertex(graphEditorService, slideToggleComponent, slideToggleVertex);
    return slideToggleVertex;
  }
}
