//<template>
//  <Icon :name="name"></Icon>
//</template>
//<script lang="ts" setup>
//defineProps<{
//  name: string
//}>();

import {defineComponent} from "vue";
import _ from "underscore";
import {Icon} from "@iconify/vue";
import {NIcon} from "naive-ui";
//</script>
export default defineComponent({
    props: ['icon'],
    setup(props, {attrs}) {
        if (_.isString(props.icon))
            return () => <div  {...attrs}><Icon icon={props.icon} {...attrs}/></div>;
        const IconNode = props.icon;
        return () => <NIcon {...attrs}>
            <IconNode></IconNode>
        </NIcon>;
    }
});
