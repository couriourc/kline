<script lang="ts" setup>

import {NMenu} from "naive-ui";
import {ref, unref} from "vue";
import {type MenuOption} from "../ui/types/index";

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


</script>
<template>
  <UContextMenu v-model="isOpen"
                :virtual-element="virtualElement"
                :popper="{strategy: 'fixed',gpuAcceleration:true}"
                z-10000 h-120px
  >
    <n-menu
        class="h-200px overflow-y-auto"

        :options="menus"
        :render-icon="()=>''"
        accordion
    />
  </UContextMenu>

  <slot :onContextMenu="onContextMenu"></slot>
</template>
