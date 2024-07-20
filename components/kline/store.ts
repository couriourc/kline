import {defineStore} from "pinia";
import {ref} from "vue";

export const useKLineStore = defineStore("kline-store", () => {
    const period = ref("hour");
    const timezone = ref("Asia/Shanghai");
    const mainIndicators = ref(['MA']);
    const subIndicators = ref(["VOL"]);
    return {
        period,
        timezone,
        mainIndicators,
    };
});
