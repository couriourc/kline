<script lang="ts" setup>

import {type MenuOption, NIcon, NMenu} from "naive-ui";
import type {Component} from "vue";

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

const menuOptions: MenuOption[] = [];
defineProps<{
  menus: MenuOption[]
}>();


</script>
<template>
  <UContextMenu v-model="isOpen" :virtual-element="virtualElement">
    <n-menu
        :options="menus"
        :default-expanded-keys="defaultExpandedKeys"
        accordion
    />
  </UContextMenu>

  <slot :onContextMenu="onContextMenu"></slot>
</template>
