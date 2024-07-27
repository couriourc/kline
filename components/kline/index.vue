<script lang="ts" setup>
import type {MenuOption} from 'naive-ui';
import type {KLineChart} from "~/components/kline/type";
import {ref} from "vue";

defineProps<{
  menuOptions: MenuOption[]
}>();
const chartRef = ref<KLineChart | null>(null);
</script>
<template>
  <lazy-kline-context-menu >
    <template #default="{onContextMenu}">
      <div @contextmenu.prevent.stop="onContextMenu"
           ref="chartContainerRef"
           v-bind="$attrs"
           class="w-full box-border h-screen active:shadow-lg duration-100ms overflow-hidden bg-white rounded-12px">
        <KlineChartsRoot ref="chartRef">
          <KlineChartsIndicator name="BOLL" :args="{isStack:false}"/>
          <KlineChartsIndicator name="VOL" :args="{isStack:true}"/>
          <KlineChartsDataProvider/>
        </KlineChartsRoot>
        <!--        <ui-floating-action-button>-->
        <!--          <ul class="p-12px bg-white flex flex-col items-center gap-12px shadow-lg rounded-6px mb-12px">-->
        <!--            <li class="" v-for="i in 4">{{ i }}</li>-->
        <!--          </ul>-->
        <!--          <template #reference>-->
        <!--            <div>-->
        <!--              <ui-icon icon="carbon:menu"></ui-icon>-->
        <!--            </div>-->
        <!--          </template>-->
        <!--        </ui-floating-action-button>-->
      </div>
    </template>
  </lazy-kline-context-menu>
</template>
