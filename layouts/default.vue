<script setup lang="ts">
import {ref} from 'vue';
import type {MenuOption} from '~/components/ui/types/index.js';
import {useKlineChartMemo} from "~/components/kline/core";

import {NLayout, NLayoutSider} from "naive-ui";

const collapsed = ref(true);

const chartMemo = useKlineChartMemo();
/*@ts-ignore*/
const menuOptions: MenuOption[] = [
  {
    label: '绘图',
    icon: 'carbon:4k-filled',
    key: '/zh',
    onClick() {
      navigateTo('/zh');
    },
  },
  {
    label: '数据表',
    icon: 'carbon:table-split',
    key: '/zh/dataset',
    onClick() {
      navigateTo('/zh/dataset');
    }
  }];

function handleSelectMenuItem(option: MenuOption) {
  option.onClick?.(option);
}
</script>
<template>
  <ClientOnly>

    <n-layout has-sider class="bg-black/5">

      <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
          class="mr6px"
      >
        <ui-menu
            :collapsed="collapsed"
            :menu-options="menuOptions"
        >
          <template #render-icon="option">
            <ui-icon @click="handleSelectMenuItem(option)" :icon="option.icon"></ui-icon>
          </template>
          <template #render-label="option">
            <span @click="handleSelectMenuItem(option)"> {{ option.label ?? '未命名' }}</span>
          </template>
        </ui-menu>
      </n-layout-sider>
      <div class="h-screen w-full">
        <RouterView></RouterView>
      </div>
    </n-layout>
  </ClientOnly>

</template>
