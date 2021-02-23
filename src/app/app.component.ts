import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GraphEditorService } from './services/graph-editor.service';
import { testButton } from '../test_data/example.button';
import { testTable } from '../test_data/example.table';
import { testForm } from 'src/test_data/example.form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('graphContainer') graphContainer: ElementRef;

  constructor(
    private graphEditorService: GraphEditorService
  ) {

  }

  showER() {
    console.log(this.graphEditorService.editor.graph);
    console.log(this.graphEditorService.editor.graph.model);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      let value = "Click Me";
      let geometry = new mxGeometry(50, 50, 200, 200);
      let parent = this.graphEditorService.getDefaultParent();

      // example1
      // let source = this.graphEditorService.insertVertex(value, geometry, parent, {});
      // let target = this.graphEditorService.insertVertex(value, geometry, parent, {});
      // this.graphEditorService.insertEdge(parent, source, target);

      // example2
      // this.graphEditorService.createComponent(testButton)

      // example3
      // this.graphEditorService.createComponent(testTable);

      // example4
      this.graphEditorService.createComponent(testForm);
    }, 200)
  }
}
