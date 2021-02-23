import { UIComponent } from "./UIComponent.model";

export class CompositeComponent extends UIComponent {
    componentList: UIComponent[];
}