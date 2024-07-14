<script lang="ts" setup>

import {type MenuOption, NIcon, NMenu} from "naive-ui";
import type {Component} from "vue";
import {BagOutline as BagOutlineIcon, FishOutline as FishIcon, PawOutline as PawIcon} from "@vicons/ionicons5";

const virtualElement = ref({getBoundingClientRect: () => ({})});
const chartContainerRef = ref<HTMLElement>();
const {width, height} = useElementSize(chartContainerRef);
const isOpen = ref(false);
const {x, y} = useMouse();
const {y: windowY} = useWindowScroll();

function onContextMenu() {
  const top = unref(y) - unref(windowY);
  const left = unref(x);

  virtualElement.value.getBoundingClientRect = () => ({
    width: 0,
    height: 0,
    top,
    left
  });

  isOpen.value = true;
}

const defaultExpandedKeys = ['fish', 'braise'];

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, {default: () => h(icon)});
};

const menuOptions: MenuOption[] = [
  {
    label: '鱼',
    key: 'fish',
    icon: renderIcon(FishIcon),
    children: [
      {
        label: '红烧',
        key: 'braise',
        children: [
          {
            label: '加辣',
            key: 'spicy'
          }
        ]
      },
      {
        label: '清蒸',
        key: 'steamed',
        children: [
          {
            label: '不要葱',
            key: 'no-green-onion'
          }
        ]
      }
    ]
  },
  {
    label: '熊掌',
    key: 'bear-paw',
    icon: renderIcon(PawIcon),
    children: [
      {
        label: '保护野生动物',
        key: 'protect-wild-animals'
      }
    ]
  },
  {
    label: '两个都要',
    key: 'both',
    icon: renderIcon(BagOutlineIcon),
    children: [
      {
        label: '鱼和熊掌不可兼得',
        key: 'can-not'
      }
    ]
  }
];


</script>
<template>
  <UContextMenu v-model="isOpen" :virtual-element="virtualElement">
    <n-menu
        :options="menuOptions"
        :default-expanded-keys="defaultExpandedKeys"
        accordion
    />
  </UContextMenu>

  <slot :onContextMenu="onContextMenu"></slot>
</template>
