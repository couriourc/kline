<script setup lang="ts">
import {ref} from 'vue';
import {useKlineChartMemo} from "~/components/kline/core";
import {useLocalePath} from "#i18n";
import {getSupportedOverlays} from "~/external/KLineChart/src";
import {OVERLAYS_DESCRIPTIONS} from "~/components/kline/extensitons/overlays";
import type {MenuOption} from "~/components/ui/types";
import {group, mapValues} from "radash";

const localePath = useLocalePath();

const collapsed = ref(true);

const chartMemo = useKlineChartMemo();
//console.log(getSupportedOverlays());
const overlays = getSupportedOverlays();
const suppoertedOverlaysWithDescription = overlays.map((key) => {
  return OVERLAYS_DESCRIPTIONS[key] ?? {
    name: key
  };
});

const GROUP_ID = 'drawing_tools';
const menuOptions: MenuOption[] = [
  {
    label: '绘图',
    icon: 'carbon:4k-filled',
    key: '/',
    href: localePath('/', 'zh'),
    children: suppoertedOverlaysWithDescription.map((item, index) => {
      return {
        label: item.name,
        icon: 'carbon:4k-filled',
        value: item.name,
        key: overlays[index],
        onClick() {
          return chartMemo.chart.createOverlay({
            name: overlays[index],
            groupId: GROUP_ID,
            onDrawEnd(options) {
              return true;
            }
          });
        }
      };
    }),
  },
  {
    label: '清空',
    icon: 'carbon:trash-can',
    key: '/clear',
    onClick() {
      chartMemo.chart.removeOverlay({groupId: GROUP_ID});
    }
  },
];

const actions = mapValues(group(menuOptions.reduce((acc, curr) => {
  if (curr.children) return [...acc, curr, ...curr.children];
  return [...acc, curr];
}, []), (item) => item.key), (value, key) => value[0]);

function handleSelect(option: typeof menuOptions[number], ...args) {
//  option.onClick?.(option);
  console.log(actions[option.key]?.onClick?.());
//  return chartMemo.chart.createOverlay({
//    name: option.key,
//    groupId: GROUP_ID,
//  });
}

//console.log(getSupportedOverlays());
//console.log();

//<Icon icon="" />
</script>
<template>
  <NuxtLoadingIndicator/>
  <d-layout class="bg-black/5 ">
    <d-layout>
      <d-aside
          class=" w-fit flex-shrink-0 bg-white rounded-12px max-h-screen overflow-y-auto overflow-x-hidden scrollbar-none">
        <d-menu :collapsed="false"
                mode="vertical"
                :default-select-keys="['item1']" class="w-156px h-full"
                @select="handleSelect"
                :indent-size="0"
        >
          <ui-menu-items :options="menuOptions"></ui-menu-items>
        </d-menu>
      </d-aside>
      <d-content class="h-full w-full pl-6px  box-border">
        <RouterView></RouterView>
      </d-content>
    </d-layout>
  </d-layout>
</template>
