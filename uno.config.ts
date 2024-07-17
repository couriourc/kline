import {mergeConfigs} from '@unocss/core';
import config from './.nuxt/uno.config.mjs';

export default mergeConfigs([config, {
    // your overrides
    shortcuts: {
        'flex-center': 'flex items-center justify-center'
    }
}]);
