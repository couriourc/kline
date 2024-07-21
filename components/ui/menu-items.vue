<template>
  <template v-for="option in options" :key="option.key">
    <d-sub-menu v-if="option.children?.length" :key="option.key" :title="option.label">

      <template #icon>
        <ui-icon class="flex justify-center items-center" :icon="option.icon"></ui-icon>
      </template>
      <menu-items :options="option.children"/>
    </d-sub-menu>
    <d-menu-item class="flex justify-center items-center
    [&_.devui-menu-icon]:flex
    [&_.devui-menu-icon]:items-center
    [&_.devui-menu-icon]:justify-center
" :key="option.key"
                 v-else>
      <template #icon>
        <ui-icon class="flex justify-center items-center" :icon="option.icon"/>
      </template>
      <span class="truncate inline-block w-4em">{{ option.label }}</span>
    </d-menu-item>
  </template>
</template>

<script setup lang="ts">
import type {MenuOption} from "./types";

defineProps<{
  options?: MenuOption[]
}>();

</script>


<!--<d-sub-menu v-if="item.children?.length">-->
<!--<template #icon>-->
<!--  <ui-icon class="flex items-center  justify-center h-full " :icon="item.icon"/>-->
<!--</template>-->
<!--<d-menu-item v-for="child in item.children" :key="child.key">-->
<!--  <template #icon>-->
<!--    <ui-icon class="flex items-center  justify-center h-full "-->
<!--             :icon="child.icon"></ui-icon>-->
<!--  </template>-->
<!--  <span>{{ child.label }}</span>-->
<!--</d-menu-item>-->
<!--</d-sub-menu>-->
<!--<d-menu-item v-else-->
<!--             :title="item.label"-->
<!--             class="flex justify-center items-center"-->
<!--&gt;-->
<!--<template #icon>-->
<!--  <ui-icon class="flex items-center  justify-center h-full "-->
<!--           :icon="item.icon"></ui-icon>-->
<!--</template>-->
<!--<a v-if="item.href" :href="item.href" class="flex items-center gap-12px">-->
<!--  {{ item.label }}-->
<!--</a>-->
<!--<span v-else>{{ item.label }}</span>-->
<!--</d-menu-item>-->

