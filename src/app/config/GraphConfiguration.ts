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
            if(selectedCell.type == "button")
                alert('click')
        })

        editor.graph.addListener(mxEvent.RESIZE_CELLS, (sender, event) => {
            let selectedCell = sender.selectionModel.cells[0];
            if(selectedCell.type == "button")
                alert('resize')
        })
    }
}