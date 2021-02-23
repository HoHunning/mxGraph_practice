import { Injectable } from '@angular/core';
import { Configuration } from '../config/GraphConfiguration';
import { ButtonStrategy } from '../strategy/ButtonStrategy';
import { FormStrategy } from '../strategy/FormStrategy';
import { ICreateComponentStrategy } from '../strategy/ICreateComponentStrategy';
import { InputTextStrategy } from '../strategy/InputTextStrategy';
import { TableStrategy } from '../strategy/TableStrategy';

@Injectable({
  providedIn: 'root'
})
export class GraphEditorService {
  editor: mxEditor;
  createComponentStrategy: ICreateComponentStrategy;

  constructor() {
    setTimeout(() => {
      let element = document.getElementById('graph-container');
      this.initializeEditor(element, "assets/keyhandler.xml");
    }, 100)
  }

  insertVertex(value: string, geometry: mxGeometry, parent, style: {}) {
    let styleDescription = this.convertJsonObjectToStyleDescription(style);
    return this.editor.graph.insertVertex(parent, 0, value, geometry.x, geometry.y, geometry.width, geometry.height, styleDescription, "");
  }

  insertEdge(parent, sourceCell, targetCell) {
    return this.editor.graph.insertEdge(parent, '', '', sourceCell, targetCell);
  }

  createComponent(uiComponent, parent?) {
    if(uiComponent['type'] == 'button') {
      this.setStrategy(new ButtonStrategy());
    }
    else if(uiComponent['type'] == 'table') {
      this.setStrategy(new TableStrategy());
    }
    else if(uiComponent['type'] == 'inputText') {
      this.setStrategy(new InputTextStrategy());
    }
    else if(uiComponent['type'] == 'form') {
      this.setStrategy(new FormStrategy());
    }
    if(parent == undefined)
      parent = this.editor.graph.defaultParent;
    return this.createComponentStrategy.createComponent(this, uiComponent, parent);
  }

  setStrategy(strategy: ICreateComponentStrategy) {
    this.createComponentStrategy = strategy;
  }

  getDefaultParent() {
    return this.editor.graph.getDefaultParent();
  }

  initializeEditor(element: HTMLElement, configurePath: string): void {
    this.editor = new mxEditor();
    this.editor.setGraphContainer(element);
    this.editor.graph.setConnectable(true);

    let config = mxUtils.load(configurePath).getDocumentElement();
    this.editor.configure(config);
    Configuration.configureEditorKeyBinding(this.editor);
    Configuration.configureGraphListener(this.editor);
  }

  convertJsonObjectToStyleDescription(styleObj: any): String {
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
