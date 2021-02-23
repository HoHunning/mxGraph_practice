import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../styleLibrary";
import { GraphEditorService } from "../services/graph-editor.service";

export class FormStrategy extends ICreateComponentStrategy {

    constructor(geometry?) {
        super(geometry);
    }

    createFormBox(graphEditorService: GraphEditorService, formComponent, parent: mxCell) {
        const style = StyleLibrary[0]["form"]["formBox"];
        const formVertexGeomety = new mxGeometry(this.basex, this.basey, 300, 300);

        let formCell = graphEditorService.insertVertex("", formVertexGeomety, parent, style);
        formCell["componentPart"] = "box";
        formCell["isPrimary"] = true;
        formCell["componentID"] = formComponent.id;
        formCell["type"] = formComponent.type;
        return formCell;
    }

    createComponent(graphEditorService: GraphEditorService, formComponent, parent: mxCell): mxCell {
        let formBoxCell = this.createFormBox(graphEditorService, formComponent, parent);
        let subComponentXOffset = 15;
        let subComponentYOffset = 40;
        let maxWidth = 200;
        for (let subUIComponent of formComponent["componentList"]) {
            console.log(subUIComponent);
            let vertex = graphEditorService.createComponent(subUIComponent, formBoxCell);
            vertex["geometry"].x = subComponentXOffset;
            vertex["geometry"].y = subComponentYOffset;
            if (vertex["geometry"].width > maxWidth)
                maxWidth = vertex["geometry"].width;
            subComponentYOffset = subComponentYOffset + vertex["geometry"].height + 10;
        }

        // resize parent vertex
        let newmxGeometry = new mxGeometry(this.basex, this.basey, maxWidth + 50, subComponentYOffset);
        formBoxCell.setGeometry(newmxGeometry);
        graphEditorService.editor.graph.refresh()

        return formBoxCell;
    }
}
