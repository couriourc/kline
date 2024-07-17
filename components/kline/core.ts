import {type Chart, dispose, FormatDateType, init, utils} from "klinecharts";
import type {Ref} from "vue";
import {useKLineStore} from "~/components/kline/store";
import type {KLineChart, KLineChartsRootRef} from "~/components/kline/type";


function formatDate(dateTimeFormat: Intl.DateTimeFormat, timestamp: number, format: string, type: FormatDateType) {
    const kLineStore = useKLineStore();
    switch (kLineStore.period) {
        case 'minute': {
            if (type === FormatDateType.XAxis) {
                return utils.formatDate(dateTimeFormat, timestamp, 'HH:mm');
            }
            return utils.formatDate(dateTimeFormat, timestamp, 'YYYY-MM-DD HH:mm');
        }
        case 'hour': {
            if (type === FormatDateType.XAxis) {
                return utils.formatDate(dateTimeFormat, timestamp, 'MM-DD HH:mm');
            }
            return utils.formatDate(dateTimeFormat, timestamp, 'YYYY-MM-DD HH:mm');
        }
        case 'day':
        case 'week':
            return utils.formatDate(dateTimeFormat, timestamp, 'YYYY-MM-DD');
        case 'month': {
            if (type === FormatDateType.XAxis) {
                return utils.formatDate(dateTimeFormat, timestamp, 'YYYY-MM');
            }
            return utils.formatDate(dateTimeFormat, timestamp, 'YYYY-MM-DD');
        }
        case 'year': {
            if (type === FormatDateType.XAxis) {
                return utils.formatDate(dateTimeFormat, timestamp, 'YYYY');
            }
            return utils.formatDate(dateTimeFormat, timestamp, 'YYYY-MM-DD');
        }
    }
    return utils.formatDate(dateTimeFormat, timestamp, 'YYYY-MM-DD HH:mm');
}

export function useKlineChart(chartDomRef: Ref<HTMLElement | undefined>, onLoaded?: (chart: KLineChart) => any) {
    let chart: Ref<Chart | undefined> = ref<Chart>();
    const width = useWindowSize();
    // 初始化
    onMounted(async () => {
        chart.value = init(chartDomRef?.value!, {
            customApi: {
                formatDate: formatDate
            }
        })! as KLineChart;
        (chart.value as KLineChart).use = (fn) => {
            fn?.(chart.value as KLineChart);
        };
        onLoaded?.(chart.value as KLineChart);
    });

    // 屏幕尺寸变化
    const cleanup = watch([width.width], () => {
        chart.value?.resize();
    });
    // 销毁图表
    onUnmounted(() => {
        if (!chart.value) return;
        dispose(chartDomRef.value!);
        cleanup();
        chart.value = undefined;
    });
    return {
        chart
    };
}

export function injectKlineChart() {
    const injector = inject<KLineChartsRootRef>("klinechart");
    if (!injector) console.error("it should wrap with klinechart-root");
    return injector!;
}
