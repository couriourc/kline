import {mergeConfigs} from '@unocss/core';
import {presetAttributify, presetUno} from "unocss";

import {presetScrollbar} from 'unocss-preset-scrollbar';

export default mergeConfigs([ {
    presets: [presetUno(), presetAttributify(), presetScrollbar()],
    // your overrides
    shortcuts: {
        'flex-center': 'flex items-center justify-center'
    }
}]);
