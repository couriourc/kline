import type {Chart} from "klinecharts";

export type KLineChartsRootRef = { chart?: KLineChart, onChartLoad(fn: (chart: KLineChart) => any): void; }
export type KLineFigureTypes = string & ("arc" | "circle" | "line" | "polygon" | "rect" | "text" | "rectText");

interface IKLineFigureAttrsMap {
    arc: {
        // 圆心x轴坐标值
        x: number
        // 圆心y轴坐标值
        y: number
        // 半径
        r: number
        // 开始角度
        startAngle: number
        // 结束角度
        endAngle: number
    };
    circle: {
        // 圆心x轴坐标值
        x: number
        // 圆心y轴坐标值
        y: number
        // 半径
        r: number
    },
    line: {
        // 坐标集合
        coordinates: Array<{
            x: number
            y: number
        }>

    },
    polygon: {
        // 坐标集合
        coordinates: Array<{
            x: number
            y: number
        }>
    },
    rect: {
        // 起始点x轴坐标值
        x: number
        // 起始点y轴坐标值
        y: number
        // 宽度
        width: number
        // 高度
        height: number
    },
    text: {

        // 起始点x轴坐标值
        x: number
        // 起始点y轴坐标值
        y: number
        // 文字内容
        text: any
        // 指定宽
        width?: number
        // 指定高
        height?: number
        // 对齐方式
        align?: CanvasTextAlign
        // 基准
        baseline?: CanvasTextBaseline
    }

}

export type KLineFigureAttrsMap = IKLineFigureAttrsMap & {
    [name: string]: {
        // 校验事件是否在图形上，返回一个boolean值
        checkEventOn: (
            // 事件的坐标
            coordinate: {
                x: number
                y: number
            },
            // 图形的属性
            attrs: any,
            // 图形的样式
            styles: any
        ) => boolean;
        // 绘制
        draw: (
            // 画布上下文
            ctx: CanvasRenderingContext2D,
            // 图形的属性
            attrs: any,
            // 图形的样式
        ) => void
    }
}

interface IKLineFigureStylesMap {
    arc: {
        // 样式，可选项`solid`，`dashed`
        style?: 'solid' | 'dashed'
        // 尺寸
        size?: number
        // 颜色
        color?: string
        // 虚线参数
        dashedValue?: number[]
    };
    circle: {
        // 样式，可选项`fill`，`stroke`，`stroke_fill`
        style?: 'fill' | 'stroke' | 'stroke_fill'
        // 颜色
        color?: string
        // 边框样式
        borderStyle?: 'solid' | 'dashed'
        // 边框颜色
        borderColor?: string
        // 边框尺寸
        borderSize?: number
        // 边框虚线参数
        borderDashedValue?: number[]
    },
    line: {
        // 样式，可选项`solid`，`dashed`
        style?: 'solid' | 'dashed'
        // 尺寸
        size?: number
        // 颜色
        color?: string
        // 虚线参数
        dashedValue?: number[]
    },
    polygon: {
        // 样式，可选项`fill`，`stroke`，`stroke_fill`
        style?: 'fill' | 'stroke' | 'stroke_fill'
        // 颜色
        color?: string
        // 边框样式
        borderStyle?: 'solid' | 'dashed'
        // 边框颜色
        borderColor?: string
        // 边框尺寸
        borderSize?: number
        // 边框虚线参数
        borderDashedValue?: number[]
    },
    rect: {
        // 样式，可选项`fill`，`stroke`，`stroke_fill`
        style?: 'fill' | 'stroke' | 'stroke_fill'
        // 颜色
        color?: string
        // 边框样式
        borderStyle?: 'solid' | 'dashed',
        // 边框颜色
        borderColor?: string
        // 边框尺寸
        borderSize?: number
        // 边框虚线参数
        borderDashedValue?: number[]
        // 边框圆角值
        borderRadius?: number
    },
    text: {
        // 样式，可选项`fill`，`stroke`，`stroke_fill`
        style?: 'fill' | 'stroke' | 'stroke_fill'
        // 颜色
        color?: string
        // 尺寸
        size?: number
        // 字体
        family?: string
        // 粗细
        weight?: string | number
        // 左内边距
        paddingLeft?: number
        // 右内边距
        paddingRight?: number
        // 上内边距
        paddingTop?: number
        // 下内边距
        paddingBottom?: number
        // 边框样式
        borderStyle?: 'solid' | 'dashed'
        // 边框颜色
        borderColor?: string
        // 边框尺寸
        borderSize?: number
        // 边框虚线参数
        borderDashedValue?: number[]
        // 边框圆角值
        borderRadius?: number
        // 背景色
        backgroundColor?: string | CanvasGradient
    }
}

export type KLineFigureStylesMap = IKLineFigureStylesMap & Record<string, any>;


export type FigureConstructor<T extends KLineFigureTypes> =
    {
        attrs?: KLineFigureAttrsMap[T],
        styles?: KLineFigureStylesMap[T],
    }
export type FigureConstructorType = keyof KLineFigureStylesMap;

export type KLineChart = Chart & {
    use(fn: (chart: KLineChart) => any): any;
}
