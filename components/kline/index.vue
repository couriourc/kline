<script lang="ts" setup>
import type {MenuOption} from 'naive-ui';

defineProps<{
  menuOptions: MenuOption[]
}>();
</script>
<template>
  <KlineContextMenu :menus="menuOptions">
    <template #default="{onContextMenu}">
      <div @contextmenu.prevent="onContextMenu"
           ref="chartContainerRef"
           v-bind="$attrs"
           class="w-full box-border h-screen active:shadow-lg duration-100ms overflow-hidden bg-white rounded-12px">
        <KlineChartsRoot ref="chartRef">
          <KlineChartsIndicator name="BOLL"
                                :args="{isStack:false}"
          />
          <KlineChartsIndicator
              name="VOL"
              :args="{isStack:true}"
          />
          <KlineChartsDataProvider/>
        </KlineChartsRoot>
      </div>
    </template>
  </KlineContextMenu>
</template>
