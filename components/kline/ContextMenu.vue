<script lang="ts" setup>

import {ref, unref,} from "vue";
import {type MenuOption} from "../ui/types/index";
import {useElementSize, useMouse, useWindowScroll} from "#imports";

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
  console.log("Context");
}

const defaultExpandedKeys = ['fish', 'braise'];


const menuOptions: MenuOption[] = [];
defineProps<{
  menus: MenuOption[]
}>();

const people = [
  {id: 1, label: 'Wade Cooper'},
  {id: 2, label: 'Arlene Mccoy'},
  {id: 3, label: 'Devon Webb'},
  {id: 4, label: 'Tom Cook'},
  {id: 5, label: 'Tanya Fox'},
  {id: 6, label: 'Hellen Schmidt'},
  {id: 7, label: 'Caroline Schultz'},
  {id: 8, label: 'Mason Heaney'},
  {id: 9, label: 'Claudie Smitham'},
  {id: 10, label: 'Emil Schaefer'}
];
const selected = ref([people[3]]);


const ui = {
  wrapper: 'flex flex-col flex-1 min-h-0 divide-y divide-gray-200 dark:divide-gray-700 bg-gray-50 dark:bg-gray-800',
  container: 'relative flex-1 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700 scroll-py-2',
  input: {
    base: 'w-full placeholder-gray-400 pl-38px dark:placeholder-gray-500 bg-transparent border-0 text-gray-900 dark:text-white focus:ring-0 focus:outline-none'
  },
  group: {
    label: 'px-2 my-2 text-xs font-semibold text-gray-500 dark:text-gray-400',
    command: {
      base: 'flex justify-between select-none cursor-default items-center rounded-md px-2 py-2 gap-2 relative',
      active: 'bg-gray-200 dark:bg-gray-700/50 text-gray-900 dark:text-white',
      container: 'flex items-center gap-3 min-w-0',
      icon: {
        base: 'flex-shrink-0 ',
        active: 'text-gray-900 dark:text-white',
        inactive: 'text-gray-400 dark:text-gray-500'
      },
    }
  }
};
</script>
<template>
  <UContextMenu v-model="isOpen"
                :virtual-element="virtualElement"
                :popper="{strategy: 'fixed',gpuAcceleration:true}"
                z-10000 h-120px
  >
    <UCommandPalette
        v-model="selected"
        placeholder="Try Draw Some"
        nullable
        :autoselect="false"
        :groups="[{ key: 'people', commands: people }]"
        :ui="ui"
        :fuse="{ resultLimit: 6, fuseOptions: { threshold: 0.1 } }"
        :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"
    />
  </UContextMenu>

  <slot :onContextMenu="onContextMenu"></slot>
</template>
