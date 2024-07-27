<script setup lang="ts">

import {ref} from "vue";
import executeCommand from "~/components/kline/commands";

function resize() {
  executeCommand("resize");
}

const router = useRouter();
const rightViewKey = ref<string | null>(null);

const links = [
  {
    icon: 'icon-beans',
    key: 'icon-beans',
    href: '/kline/outline-tree',
  },
  {
    key: 'outline-tree',
    icon: 'icon-database',
    href: '/kline/datasource',
  },
];

function handleSelectTab(link) {
  console.log(link);
  router.push(link.href);
}
</script>

<template>
  <ClientOnly>
    <d-splitter class="bg-transparent ![&_.splitter]:h-full ![&_.splitter]:bg-blue ![&_.splitter]:w-4px"
                orientation="horizontal"
                split-bar-size="3px"
    >
      <template #DSplitterPane>
        <d-splitter-pane
            @sizeChange="resize"
            resizable
        >
          <lazy-kline></lazy-kline>
        </d-splitter-pane>
        <d-splitter-pane :min-size="300"
                         max-size="400px"
                         :collapsed="false"
                         collapsible
                         @collapse="()=>rightViewKey=null"
        >
          <div
              class="min-w-300px bg-white h-full flex justify-end w-full overflow-hidden hover:shadow-lg rounded-l-8px active:shadow-lg duration-100ms">
            <div class="h-full w-full flex flex-col gap-2px">
              <keep-alive key="cached">
                <router-view/>
              </keep-alive>
            </div>
            <ul
                class="w-58px flex-col flex  items-center py-6px  active:shadow-lg h-full border-l-1 border-gray-200 gap-4px duration-100ms">
              <li v-ripple="{ duration: 300 }"
                  class="text-xl cursor-pointer size-36px w-full flex items-center justify-center active:bg-gray-200"
                  @click="handleSelectTab(item)"
                  v-for="item in links" :key="item.icon">
                <ui-icon :icon="item.icon"></ui-icon>
              </li>
            </ul>
          </div>
        </d-splitter-pane>
      </template>
    </d-splitter>
  </ClientOnly>
</template>
