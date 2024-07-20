<script setup lang="ts">
import {ref} from 'vue';
import type {MenuOption} from '~/components/ui/types/index.js';
import {useKlineChartMemo} from "~/components/kline/core";
import {NLayout, NLayoutSider} from "naive-ui";
import {useLocalePath} from "#i18n";

const localePath = useLocalePath();

const collapsed = ref(true);

const chartMemo = useKlineChartMemo();
/*@ts-ignore*/
const menuOptions: MenuOption[] = [
  {
    label: '绘图',
    iconName: 'carbon:4k-filled',
    key: '/',
    href: localePath('/', 'zh')
  },
  {
    label: '数据表',
    iconName: 'carbon:table-split',
    key: '/dataset',
    href: localePath('/dataset', 'zh')
  },
  {
    label: 'Flow',
    iconName: 'carbon:decision-node',
    key: '/flow',
    href: localePath('/flow', 'zh'),
  },
];
//<Icon icon="" />
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
            <RouterLink v-if="option.href" :to="option.href">
              <ui-icon @click="option.onClick?.(option)" :icon="option.iconName"></ui-icon>
            </RouterLink>
          </template>
          <template #render-label="option">
            <RouterLink v-if="option.href" :to="option.href"> asd{{ option.label ?? '未命名' }}</RouterLink>
          </template>
        </ui-menu>
      </n-layout-sider>
      <div class="h-screen w-full">
        <RouterView></RouterView>
      </div>
    </n-layout>
  </ClientOnly>

</template>
