import {mergeConfigs} from '@unocss/core';
import {presetAttributify, presetUno} from "unocss";

import {presetScrollbar} from 'unocss-preset-scrollbar';
import presetChinese from "unocss-preset-chinese";

export default mergeConfigs([{
    presets: [
        presetUno(),
        presetAttributify(),
        presetChinese({
            chineseType: "simplified", // 指定文本为简体中文
        }),
        presetScrollbar()
    ],
    // your overrides
    shortcuts: {
        'flex-center': 'flex items-center justify-center'
    }
}]);
