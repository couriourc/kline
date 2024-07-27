<script setup lang="ts">
import {useKlineChartStore} from "~/stores";
import ContextMenu from "@imengyu/vue3-context-menu";
import type {Overlay} from "klinecharts";
import executeCommand from "~/components/kline/commands";

const klineStore = useKlineChartStore();

function onContextMenu(e: MouseEvent, overlay: Overlay) {
  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    items: [
      {
        label: "移除",
        onClick: () => {
          executeCommand("removeOverlay", overlay);
          klineStore.removeOverlays([overlay]);
        }
      },
    ]
  });
}
</script>
<template>
  <u-container class="w-full px-0">
    <div class="pb-12px px-12px flex gap-12px flex-col">
      <div class="mr-12px pt-10px cursor-pointer">标记列表</div>
      <d-search icon-position="left" placeholder="请输入"/>
    </div>
    <u-divider/>

    <ul class="flex-col gap-2px p-6px box-border">
      <li v-for="overlay in klineStore.overlays"
          :key="overlay.id"
          @contextmenu.prevent="onContextMenu($event,overlay)"
          class="cursor-pointer rounded-2px border-gray-300 px-4 py-2 bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out"
      >
        <d-input v-model="overlay.extendData.text"/>
      </li>
      <li v-if="!klineStore.overlays.length" class="flex flex-center">
        <u-button @click="executeCommand('createOverlay','textInput')" size="sm">添加文本标记</u-button>
      </li>
    </ul>

  </u-container>
</template>
