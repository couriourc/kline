import type {Figure} from "klinecharts";
import * as fabric from "fabric";

export default {
    name: 'Fabric',
    draw(ctx, attrs, styles) {
        const core = new fabric.Canvas(ctx.canvas);
        core.add(new fabric.Text("asd"));
        return;
    },
} as Figure;
