<script setup lang="ts">
import {ref} from 'vue';
import {useKlineChartMemo} from "~/components/kline/core";
import {useLocalePath} from "#i18n";

const localePath = useLocalePath();

const collapsed = ref(true);

const chartMemo = useKlineChartMemo();
const menuOptions = [
  {
    label: '绘图',
    iconName: 'carbon:4k-filled',
    key: '/',
    href: localePath('/', 'zh')
  },
  {
    label: '数据表',
    iconName: 'carbon:table-split',
    key: '/dataset',
    href: localePath('/dataset', 'zh')
  },
  {
    label: 'Flow',
    iconName: 'carbon:decision-node',
    key: '/flow',
    href: localePath('/flow', 'zh'),
  },
] as const;
//<Icon icon="" />
</script>
<template>
  <d-layout class="bg-black/5 ">
<!--    <d-header class="h-48px p-2px box-border">-->
<!--      <div class="size-full px-12px  rounded-12px flex items-center bg-white">-->
<!--&lt;!&ndash;        <d-avatar class="cursor-pointer flex items-center mt-4px" name=""></d-avatar>&ndash;&gt;-->
<!--      </div>-->
<!--    </d-header>-->
    <d-layout>
      <d-aside class="w-fit flex-shrink-0 bg-white rounded-12px">
        <d-menu :collapsed="true" mode="vertical" :default-select-keys="['item1']" class="w-156px h-full">
          <d-menu-item v-for="item in menuOptions" class="flex justify-center items-center" :key="item.key">
            <template #icon>
              <ui-icon class="flex items-center  justify-center h-full " :icon="item.iconName"></ui-icon>
            </template>
            <a :href="item.href" class="flex items-center gap-12px">
              {{ item.label }}
            </a>
          </d-menu-item>
        </d-menu>
      </d-aside>
      <d-content class="h-full w-full pl-6px  box-border">
        <RouterView></RouterView>
      </d-content>
    </d-layout>
  </d-layout>
  <ClientOnly>
    <!--    <n-layout has-sider class="bg-black/5">-->
    <!--      <n-layout-sider-->
    <!--          bordered-->
    <!--          collapse-mode="width"-->
    <!--          :collapsed-width="64"-->
    <!--          :width="240"-->
    <!--          :collapsed="collapsed"-->
    <!--          show-trigger-->
    <!--          @collapse="collapsed = true"-->
    <!--          @expand="collapsed = false"-->
    <!--          class="mr6px"-->
    <!--      >-->
    <!--        <ui-menu-->
    <!--            :collapsed="collapsed"-->
    <!--            :menu-options="menuOptions"-->
    <!--        >-->
    <!--          <template #render-icon="option">-->
    <!--            <RouterLink v-if="option.href" :to="option.href">-->
    <!--              <ui-icon @click="option.onClick?.(option)" :icon="option.iconName"></ui-icon>-->
    <!--            </RouterLink>-->
    <!--          </template>-->
    <!--          <template #render-label="option">-->
    <!--            <RouterLink v-if="option.href" :to="option.href"> asd{{ option.label ?? '未命名' }}</RouterLink>-->
    <!--          </template>-->
    <!--        </ui-menu>-->
    <!--      </n-layout-sider>-->
    <!--      <div class="h-screen w-full">-->
    <!--      </div>-->
    <!--    </n-layout>-->
  </ClientOnly>

</template>
