declare class mxEvent {
    static ADD: any;
    static REMOVE: any;
    static DOUBLE_CLICK: any;
    static CLICK: any;
    static CHANGE: any;
    static CONNECT: any;
    static RESIZE: any;
    static RESIZE_CELLS: any;
    static MOVE_CELLS: any;
    static TAP_AND_HOLD: any;
    addListener(element,eventName,funct);
    static consume(event);
    static isMouseEvent(event);
    static getClientX(event);
    static getClientY(event);
    static addGestureListeners()
} 