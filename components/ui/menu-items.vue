<script setup lang="ts">


defineProps<{
  links?: [][];

}>();

const emits = defineEmits<{
  (ev: 'select-aside', link: any): void;
}>();

//<Icon icon="" />
const verticalNavigationUI = {
  wrapper: 'relative',
  base: 'group relative flex items-center gap-1.5 justify-center w-full focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-1 focus-visible:before:ring-primary-500 dark:focus-visible:before:ring-primary-400 before:absolute before:inset-px before:rounded-md disabled:cursor-not-allowed disabled:opacity-75',
  ring: 'focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
  padding: 'px-2.5 py-1.5',
  width: 'w-full',
  rounded: 'rounded-md',
  font: 'font-medium',
  size: 'text-sm',
  label: 'truncate relative hidden!',
  icon: {
    base: 'items-center justify-center w-full flex-shrink-0 w-full h-5 flex relative',
    active: ' text-gray-700  dark:text-gray-200',
    inactive: ' text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200',
  },
  avatar: {
    base: 'flex-shrink-0 mx-auto w-full! my-auto flex h-full items-center justify-center',
    size: '2xs',
  },
  divider: {
    wrapper: {
      base: 'p-2',
    },
  },
};
</script>
<template>
  <UVerticalNavigation :links="links" :ui="verticalNavigationUI">
    <template #avatar="{ link }">
      <UAvatar v-if="link.avatar" v-bind="link.avatar" size="2xs" loading="lazy"/>
    </template>
    <template #icon="{ link }">
      <div class="w-5!  flex justify-center items-center h-full hover:text-gray-700!"
           v-bind="link"
           @click="emits('select-aside',link)"
      >
        <UDropdown
            v-if="link.children"
            :items="link.children"
            :popper="{ placement: 'right-start' }"
            mode="click"
        >
          <ui-icon :icon="link.icon" />
          <template #item="{item}">
            <div class="flex items-center gap-8px w-full"
                 @click="emits('select-aside',item)"
            >
              <ui-icon :icon="item.icon"></ui-icon>
              <span>{{ item.label }}</span>
            </div>
          </template>
        </UDropdown>
        <ui-icon v-else-if="link.icon" :icon="link.icon" class="text-base"/>
      </div>
    </template>
  </UVerticalNavigation>
</template>
