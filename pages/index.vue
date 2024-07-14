<script setup lang="ts">

import type {KLineChartsRootRef} from "~/components/kline/type";
import VueSplitter from '@rmp135/vue-splitter';
import type {MenuOption} from 'naive-ui';
import {NButton, NCard, NIcon, NLayout, NLayoutSider, NMenu} from "naive-ui";
import {BookmarkOutline, CaretDownOutline} from '@vicons/ionicons5';

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

const menuOptions: MenuOption[] = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199'
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    disabled: true
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator'
          },
          {
            label: '羊男',
            key: 'sheep-man'
          }
        ]
      },
      {
        label: '饮品',
        key: 'beverage',
        children: [
          {
            label: '威士忌',
            key: 'whisky',
            href: 'https://baike.baidu.com/item/%E5%A8%81%E5%A3%AB%E5%BF%8C%E9%85%92/2959816?fromtitle=%E5%A8%81%E5%A3%AB%E5%BF%8C&fromid=573&fr=aladdin'
          }
        ]
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
];
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

function renderMenuIcon(option: MenuOption) {
  // 渲染图标占位符以保持缩进
  if (option.key === 'sheep-man') return true;
  // 返回 falsy 值，不再渲染图标及占位符
  if (option.key === 'food') return null;
  return h(NIcon, null, {default: () => h(BookmarkOutline)});
}

function expandIcon() {
  return h(NIcon, null, {default: () => h(CaretDownOutline)});
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
          <KlineContextMenu>
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
