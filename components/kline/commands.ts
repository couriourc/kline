import _ from "underscore";
import {useKlineChartMemo} from "~/components/kline/core";
import type {OverlayCreate} from "klinecharts";
import {useKlineChartStore} from "~/stores/klineStore";

const chartsMemo = useKlineChartMemo();
const defaultOverlayExtendData = {
    label: '未命名'
};

type CreateOverlay = typeof chartsMemo.chart.createOverlay;
type RemoveOverlay = typeof chartsMemo.chart.removeOverlay;
type GetOverlayById = typeof chartsMemo.chart.getOverlayById;

const createOverlay: CreateOverlay = (overlayCreator, paneId) => {
    let wrapperOverlayCreator: OverlayCreate[];
    const kLineChartStore = useKlineChartStore();

    const wrapperOverlayFunction = (nameOrOption: string | OverlayCreate) => {
        const option: OverlayCreate = {} as OverlayCreate;
        if (_.isString(nameOrOption)) {
            option.name = nameOrOption;
        } else {
            Object.assign(option, nameOrOption);
        }

        ([
            "onDrawStart",
            "onDrawing",
            "onDrawEnd",
            "onClick",
            "onDoubleClick",
            "onRightClick",
            "onPressedMoveStart",
            "onPressedMoving",
            "onPressedMoveEnd",
            "onMouseEnter",
            "onMouseLeave",
            "onRemoved",
            "onSelected",
            "onDeselected",
        ] as const).forEach((fnName) => {
            const fn = option[fnName];
            switch (fnName) {
                case "onRightClick":
                    option[fnName] = (...args) => {
                        const event = args[0];
                        event.preventDefault();
                        fn?.(...args);
                        return true;
                    };
                    break;
                case "onRemoved":
                    option[fnName] = (...args) => {
                        const overlay = args[0].overlay;
                        kLineChartStore.removeOverlays([overlay]);
                        fn?.(...args);
                        return true;
                    };
                    break;
                default:
                    option[fnName] = (...args) => {
                        return fn?.(...args);
                    };
            }
        });

        option.extendData = {
            ...defaultOverlayExtendData,
            text: 'string'
        };
        return option as OverlayCreate;
    };
    if (!_.isArray(overlayCreator)) {
        wrapperOverlayCreator = [overlayCreator].map(wrapperOverlayFunction);
    } else {
        wrapperOverlayCreator = overlayCreator.map(wrapperOverlayFunction);
    }

    const overlayIds: string[] = chartsMemo.chart.createOverlay(wrapperOverlayCreator, paneId) as string[];

    // 同步状态
    kLineChartStore.addOverlays(overlayIds.map((overlayId) => {
        return chartsMemo.chart.getOverlayById(overlayId);
    }));

    return overlayIds;
};


const removeOverlay: RemoveOverlay = (overlayRemover) => {
    chartsMemo.chart.removeOverlay(overlayRemover);
};


const resize = () => chartsMemo.chart.resize();
const getOverlayById: GetOverlayById = (...args) => chartsMemo.chart.getOverlayById(...args);
const commands = {
    createOverlay,
    removeOverlay,
    resize,
    getOverlayById,

};
export default function executeCommand<T extends keyof typeof commands>(
    type: T,
    ...args: Parameters<(typeof commands)[T]>
) {
    if (commands[type]) {
        /*@ts-ignore*/
        return commands[type](...(args as unknown as any[]));
    }
}


//export ;
