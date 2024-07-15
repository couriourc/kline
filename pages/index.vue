<script setup lang="ts">

import type {KLineChartsRootRef} from "~/components/kline/type";
import VueSplitter from '@rmp135/vue-splitter';
import type {MenuOption} from 'naive-ui';
import {NButton, NCard, NIcon, NLayout, NLayoutSider, NMenu} from "naive-ui";
import {BookmarkOutline, CaretDownOutline} from '@vicons/ionicons5';
import overlays, {OVERLAYS_DESCRIPTIONS} from "~/components/kline/extensitons/overlays";
import {RenderIcon} from "~/components/Icon";

const chartRef = ref<KLineChartsRootRef>();

const percent = ref(85);

function resize() {
  console.log(unref(chartRef)?.chart?.resize());
}

const limitedPercent = computed({
  get() {
    return percent.value;
  },
  set(val) {
    percent.value = Math.max(70, Math.min(90, val));
  }
});

const menuOptions: MenuOption[] = overlays.map((overlay) => {
  return {
    label: OVERLAYS_DESCRIPTIONS[overlay.name as keyof typeof OVERLAYS_DESCRIPTIONS].name,
    key: overlay.name,
    onClick() {
      chartRef.value?.chart?.createOverlay(overlay.name);
    }
  };
});
const collapsed = ref(true);

function renderMenuLabel(option: MenuOption) {
  if ('href' in option) {
    return h(
        'a',
        {href: option.href, target: '_blank'},
        option.label as string
    );
  }
  return option.label as string;
}

function renderMenuIcon(option: Partial<MenuOption>) {
  return RenderIcon(() => h(BookmarkOutline), option);
}

function expandIcon(item: MenuOption) {
  return h(NIcon, null, {
    default: () => h(CaretDownOutline, null)
  });
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
        <n-menu
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            :render-label="renderMenuLabel"
            :render-icon="renderMenuIcon"
            :expand-icon="expandIcon"
        />
      </n-layout-sider>

      <VueSplitter class="bg-transparent" @splitter-click="resize" v-model:percent="limitedPercent"
                   initial-percent="80">
        <template #left-pane>
          <KlineContextMenu :menus="menuOptions">
            <template #default="{onContextMenu}">
              <div @contextmenu.prevent="onContextMenu"
                   ref="chartContainerRef"
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
        <template #right-pane>
          <div class="h-full flex flex-col gap-12px w-full pr-12px  rounded-12px active:shadow-lg duration-100ms">
            <div class="h-48px w-full  active:shadow-lg duration-100ms bg-#FFF rounded-12px">
            </div>
            <n-card class="h-full w-full rounded-12px">
              <n-button>asdasd</n-button>
            </n-card>
          </div>
        </template>
      </VueSplitter>
    </n-layout>
  </ClientOnly>

</template>

<style scoped>

</style>
