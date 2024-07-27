<script lang="ts" setup>

import {ref, unref,} from "vue";
import {useElementSize, useMouse, useWindowScroll} from "#imports";
import {defineShortcuts} from "#ui/composables/defineShortcuts";
import executeCommand from "~/components/kline/commands";
import type {Overlay} from "klinecharts";


defineShortcuts({
  shift_a: {
    usingInput: true,
    handler: () => {
      onContextMenu();
    }
  }
});


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

const actions = [
  {
    id: 1, label: '添加文本', shortcuts: ['⌘', 'F'],
    filter() {
      return true;
    }
  },
  {id: 1, label: '添加到自选组', shortcuts: ['⌘', 'A']},
];
const commandPlateRef = ref();
const selected = ref([actions[0]]);
const ui = {
  wrapper: 'flex flex-col flex-1 min-h-0 divide-y divide-gray-200 dark:divide-gray-700 bg-gray-50 dark:bg-gray-800',
  container: 'relative flex-1 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700 scroll-py-2',
  input: {
    base: 'w-full placeholder-gray-400 pl-38px dark:placeholder-gray-500 bg-transparent border-0 text-gray-900 dark:text-white focus:ring-0 focus:outline-none'
  },
  group: {
    label: 'px-2 my-2 text-xs font-semibold text-gray-500 dark:text-gray-400',
    command: {
      base: 'flex select-none cursor-default items-center rounded-md px-2 py-2 gap-2 relative',
      active: 'bg-gray-200 dark:bg-gray-700/50 text-gray-900 dark:text-white',
      container: 'flex items-center gap-3 min-w-0',
      suffix: 'hidden',
      prefix: 'hidden',
      shortcuts: 'hidden md:inline-flex flex-shrink-0 gap-0.5',

      icon: {
        base: 'flex-shrink-0 ',
        active: 'text-gray-900 dark:text-white',
        inactive: 'text-gray-400 dark:text-gray-500'
      },
      selectedIcon: {
        base: 'h-5 w-5 text-gray-900 dark:text-white hidden flex-shrink-0',
      }
    }
  }
};
const closeButton = {
  icon: 'i-heroicons-x-mark-20-solid',
  color: 'gray',
  padded: false,
  onClick: () => isOpen.value = false,
};
const commandGroups = [{
  key: 'actions', commands: actions,
  search(query, commands) {
    console.log(query);
    if (!query) return commands;
    return commands?.filter(command => command?.filter?.(query, command) ?? !!command.label.search(query));
  }
}];

function handleAddOverlay() {
  const overlayIds = executeCommand('createOverlay', 'textInput');
  console.log(`[🪪]overlayIds-->`, overlayIds);

  overlayIds.forEach(overlayId => {
    const overlay = executeCommand('getOverlayById', overlayId as string) as Overlay;
    overlay.extendData.text = commandPlateRef.value.query;
  });
}
</script>
<template>
  <UContextMenu v-model="isOpen"
                :virtual-element="virtualElement"
                :popper="{strategy: 'fixed',gpuAcceleration:true}"
                z-10000 h-120px
  >
    <UCommandPalette
        ref="commandPlateRef"
        v-model="selected"
        icon="i-heroicons-command-line"
        placeholder="输入命令"
        nullable
        :autoselect="false"
        :groups="commandGroups"
        :ui="ui"
        :fuse="{ resultLimit: 6, fuseOptions: { threshold: 0.1 } }"
        :close-button="closeButton"
        autoclear
        selectedIcon=""
    >
      <template #people-active="row">
        {{ row.command.label }}
      </template>
      <template #people-inactive="row">
        {{ row.command.label }}
      </template>
      <template #empty-state>
        <div class="py-4px px-6px ">
          <div class="cursor-pointer py-6px px-4px  rounded-lg  hover:bg-gray-200" @click="handleAddOverlay">添加文本
          </div>
        </div>
      </template>
    </UCommandPalette>
  </UContextMenu>

  <slot :onContextMenu="onContextMenu"></slot>
</template>
