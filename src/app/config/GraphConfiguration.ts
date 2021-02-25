import { StyleLibrary } from "../styleLibrary";
import { GraphEditorService } from "../services/graph-editor.service";


export class Configuration {
    static configureEditorKeyBinding(editor: mxEditor): void {
        editor.addAction("mx-cut", (event) => {
            console.log("fire cut...")
            editor.execute("cut");
        })

        editor.addAction("mx-copy", (event) => {
            editor.execute("copy");
        })

        editor.addAction("mx-paste", (event) => {
            editor.execute("paste");
        })

        editor.addAction("mx-delete", (event) => {
            editor.execute("delete");
        })

        editor.addAction("mx-selectAll", (event) => {
            editor.execute("selectAll");
        })

        editor.addAction("mx-undo", (event) => {
            editor.execute("undo");
        })

        editor.addAction("mx-redo", (event) => {
            editor.execute("redo");
        })

        editor.addAction("mx-group", (event) => {
            editor.execute("group");
        })

        editor.addAction("mx-ungroup", (event) => {
            editor.execute("ungroup");
        })
    }

    static configureGraphListener(editor: mxEditor): void {
        editor.graph.addListener(mxEvent.CLICK, (sender, event) => {
            let selectedCell = sender.selectionModel.cells[0];
            console.log(selectedCell)
            if(selectedCell.type == "button")
            alert('click')
            else if(selectedCell.type == "slideToggle"){
                if(selectedCell.children == null)
                    selectedCell = selectedCell.parent;
                selectedCell.on = !selectedCell.on;
                if(selectedCell.on){
                    selectedCell.setStyle(this.convertJsonObjectToStyleDescription( StyleLibrary[0]["slideToggle"]["bar_2"]));
                    selectedCell.children[0].setStyle(this.convertJsonObjectToStyleDescription(StyleLibrary[0]["slideToggle"]["icon_2"]));
                    selectedCell.children[0].setGeometry(
                        new mxGeometry(
                            selectedCell.geometry.width - selectedCell.children[0].geometry.width,
                            selectedCell.children[0].geometry.y,
                            selectedCell.children[0].geometry.width,
                            selectedCell.children[0].geometry.height,
                    ));
                }
                else{
                    selectedCell.setStyle(this.convertJsonObjectToStyleDescription(StyleLibrary[0]["slideToggle"]["bar_1"]));
                    selectedCell.children[0].setStyle(this.convertJsonObjectToStyleDescription(StyleLibrary[0]["slideToggle"]["icon_1"]));
                    selectedCell.children[0].setGeometry(
                        new mxGeometry(
                            0,
                            selectedCell.children[0].geometry.y,
                            selectedCell.children[0].geometry.width,
                            selectedCell.children[0].geometry.height,
                    ));
                    
                }
                editor.graph.refresh(selectedCell.children[0]);
                editor.graph.refresh(selectedCell);
            }
        })
        

        editor.graph.addListener(mxEvent.RESIZE_CELLS, (sender, event) => {
            let selectedCell = sender.selectionModel.cells[0];
            if(selectedCell.type == "button")
                alert('resize')
            else if(selectedCell.type == "slideToggle"){
                if(selectedCell.children != null){
                    selectedCell.children[0].setGeometry(new mxGeometry(
                        selectedCell.children[0].on ? selectedCell.width - selectedCell.children[0].width : 0,
                        0,
                        selectedCell.geometry.height,
                        selectedCell.geometry.height,
                        ));
                    editor.graph.refresh(selectedCell.children[0]);
                }
            }
        })
    }
    static convertJsonObjectToStyleDescription(styleObj: any): String {
        let styleDescription = "";
        let styleKeys = Object.keys(styleObj);
        for (let index = 0; index < styleKeys.length; index++) {
          let key = styleKeys[index];
          if (styleObj[key] == undefined)
            continue
          if (index == styleKeys.length - 1)
            styleDescription = styleDescription + `${key}=${styleObj[key]};`
          else
            styleDescription = styleDescription + `${key}=${styleObj[key]};`
        }
        return styleDescription;
      }
}