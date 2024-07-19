<template>
  <n-menu
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :render-icon="_.isString(slots['render-icon'])? '':slots['render-icon']"
      :render-label="slots['render-label']"
      :expand-icon="slots['expand-icon']"
  />
</template>
<script setup lang="ts">
import {NMenu} from "naive-ui";
import type {VNode} from 'vue';
import {type MenuOption} from "./types/index";
import _ from "underscore";

defineProps<{
  collapsed: boolean;
  menuOptions: MenuOption[]
}>();
const slots = defineSlots<{
  'render-icon': (option: MenuOption) => VNode,
  'render-label': (option: MenuOption) => VNode,
  'expand-icon': (option: MenuOption) => VNode,
}>();

//console.log()
</script>
