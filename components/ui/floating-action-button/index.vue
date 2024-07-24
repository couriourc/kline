<template>
  <div class="draggable-float-wrap fixed z-9999 "
       ref="floatContainerRef"

  >
    <div class="draggable-float-slot  "
         v-if="slots.default"
         ref="floatTooltipRef"
         :style="floatingStyles"
         v-show="isShow"
    >
      <slot></slot>
    </div>
    <div
        :style="{ left: (pos.x) + 'px', top: (pos.y) + 'px' }"
        ref="floatControllerRef"
        @click="isShow = !isShow"
        class="drop-shadow border-1 rounded-full bg-white fixed draggable-float-item flex flex-col flex-center size-50px">
      <slot name="reference"></slot>
    </div>
  </div>
</template>
<script setup lang="ts" name="DraggableFloat">
import {computed, onMounted, reactive, ref, type VNode} from 'vue';

import {useElementBounding} from '@vueuse/core';
import {noop} from "underscore";
import {getPadding} from "./utils";


import {autoUpdate, useFloating} from '@floating-ui/vue';
import {autoPlacement, offset} from '@floating-ui/dom';

const reference = ref(null);

interface Props {
  padding?: string; // 安全距离
  isOverflowClient: boolean; // 是否可以溢出窗口
  bottom: number;
  isSticky: boolean; // 是否可以溢出窗口
  imgUrl: string;
  btnText: string;
  isFn: boolean;
  fn: Function;
  getPortal: Function;
}

const slots = defineSlots<{
  default: () => VNode;
  reference?: () => VNode;
}>();
const props = withDefaults(defineProps<Props>(), {
  padding: '30,5,50,10',
  isOverflowClient: false,
  isSticky: true,
  bottom: 100,
  getPortal: noop
});

const paddingArr = computed(() => {
  return getPadding(props.padding);
});
const floatContainerRef = ref<HTMLDivElement>();
const floatControllerRef = ref<HTMLDivElement>();
const floatTooltipRef = ref<HTMLDivElement>();
const viewportElRef = computed(() => props.getPortal?.() ?? floatContainerRef.value?.parentElement as HTMLDivElement);
const bounding = useElementBounding(viewportElRef);
const pos = reactive({x: 0, y: 0, width: 0, height: 0,});
const handleEmit = defineEmits(['handleOk', 'handleMove', 'handleEnd']);
const isShow = ref<boolean>(false);
const {floatingStyles, update,} = useFloating(floatControllerRef, floatTooltipRef, {
  placement: 'top',
  middleware: [autoPlacement(), offset(10)],
  whileElementsMounted: autoUpdate,
});

interface Bounding {
  x: number;
  y: number;
  width: number;
  height: number;
  padding: Partial<{
    left: number;
    right: number;
    top: number;
    bottom: number;
  }>;
}

function getInit() {
  setTimeout(() => {
    pos.x = bounding.x.value - paddingArr.value.right - 100 + bounding.width.value;
    pos.y = bounding.y.value + bounding.height.value - paddingArr.value.bottom - 250;
  });
}

function touchPc() {
  floatControllerRef.value.style.cursor = 'pointer';
  let firstTime: number = 0;
  let lastTime: number = 0;
  let X: number = 0;
  let Y: number = 0;
  floatControllerRef.value.onmousedown = function (e: any) {
    firstTime = Date.now();
    floatControllerRef.value.setAttribute('data-flag', 'false');
    floatControllerRef.value.style.transition = 'none';
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false; // 解决快速频繁拖动滞后问题
    }
    const floatContainerRefOffsetWidth = floatContainerRef.value.offsetWidth;
    const floatContainerRefOffsetHeight = floatContainerRef.value.offsetHeight;
    document.onmousemove = function (e) {
      //实时移动: 元素位置 = 鼠标位置-鼠标相对元素位置
      X = e.clientX - floatControllerRef.value.offsetWidth / 2;
      Y = e.clientY - floatControllerRef.value.offsetHeight / 2;
      const clientWidth = bounding.width;
      const clientHeight = bounding.height;
      // 拖动是否可以溢出窗口
      if (!props.isOverflowClient) {
        X = Math.min(Math.max(X, bounding.x.value + floatContainerRefOffsetWidth + paddingArr.value.left), clientWidth.value - floatContainerRef.value.offsetWidth - paddingArr.value.right);
        Y = Math.min(Math.max(Y, bounding.y.value + floatContainerRefOffsetHeight + paddingArr.value.top), clientHeight.value - floatContainerRef.value.offsetHeight - paddingArr.value.bottom);
      }

      pos.x = X;
      pos.y = Y;
      handleEmit('handleMove', pos);
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
      lastTime = Date.now();
      // 处理点击与拖动冲突问题
      if (lastTime - firstTime < 200) {
        return floatControllerRef.value.setAttribute('data-flag', 'true');
      }
      const clientWidth = bounding.width;
      // 吸边效果
      if (props.isSticky) {
        if (X > clientWidth.value / 2) {
          // 放下坐标靠近右侧
          pos.x = clientWidth.value - floatControllerRef.value.offsetWidth;
        } else {
          // 放下坐标靠近左侧
          pos.x = bounding.x.value + floatControllerRef.value.offsetWidth;
        }
      }

      floatControllerRef.value.style.transition = 'all 0.3s';
      handleEmit('handleEnd', pos);
    };
  };
}


function touch() {
  let firstTime: number = 0;
  let lastTime: number = 0;
  let X: number = 0;
  let Y: number = 0;

  const clientWidth = bounding.width;
  const clientHeight = bounding.height;

  let floatContainerRefOffsetWidth = 0;
  let floatContainerRefOffsetHeight = 0;
  floatControllerRef.value.addEventListener('touchstart', () => {
    floatContainerRefOffsetWidth = floatContainerRef.value.offsetWidth;
    floatContainerRefOffsetHeight = floatContainerRef.value.offsetHeight;
    firstTime = Date.now();
    floatControllerRef.value.setAttribute('data-flag', 'false');
    floatControllerRef.value.style.transition = 'none';
  });
  floatControllerRef.value.addEventListener('touchmove', e => {
    update();

    // 阻止默认动作
    e.preventDefault();
    if (e.targetTouches.length === 1) {
      const touch = e.targetTouches[0];

      //实时移动: 元素位置 = 鼠标位置-鼠标相对元素位置
      X = touch.clientX - floatControllerRef.value.offsetWidth / 2;
      Y = touch.clientY - floatControllerRef.value.offsetHeight / 2;

      // 拖动是否可以溢出窗口

      if (!props.isOverflowClient) {
        X = Math.min(Math.max(X, bounding.x.value + floatContainerRefOffsetWidth + paddingArr.value.left), clientWidth.value - floatContainerRefOffsetWidth - paddingArr.value.right);
        Y = Math.min(Math.max(Y, bounding.y.value + floatContainerRefOffsetHeight + paddingArr.value.top), clientHeight.value - floatContainerRefOffsetHeight - paddingArr.value.bottom);
      }


      pos.x = X;
      pos.y = Y;

      handleEmit('handleMove', {
        left: X,
        top: Y,
      });
    }
  });
  floatControllerRef.value.addEventListener('touchend', () => {

    lastTime = Date.now();
    // 处理点击与拖动冲突问题
    if (lastTime - firstTime < 200) {
      return floatControllerRef.value.setAttribute('data-flag', 'true');
    }

    // 吸边效果
    if (props.isSticky) {
      if (X > clientWidth.value / 2) {
        // 放下坐标靠近右侧
        X = clientWidth.value - floatControllerRef.value.offsetWidth;
        pos.x = X;
      } else {
        // 放下坐标靠近左侧
        pos.x = paddingArr.value.right + floatControllerRef.value.offsetWidth;
      }
    }

    floatControllerRef.value.style.transition = 'all 0.3s';

    handleEmit('handleEnd', {
      left: X,
      top: Y,
    });
  });
}

//
function handleDefaultValue() {
//  const clientWidth = bounding.width;
//  const clientHeight = bounding.height;
//  pos.x = clientWidth.value - floatControllerRef.value.offsetWidth - paddingArr.value[1];
//  pos.y = clientHeight.value - floatControllerRef.value.offsetHeight - props.bottom;
}

useRafFn(() => {
  update();

});
//
//function handleEmit(key, val) {
//  emit(key, val);
//}
//
onMounted(() => {
  nextTick(() => {
    getInit();
    touchPc();
    touch();
    handleDefaultValue();
  });
});
</script>
