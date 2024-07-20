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
import {ClientOnly} from "#components";
//</script>
export default defineComponent({
    props: ['icon'],
    setup(props, {attrs, slots}) {
        const IconNode = props.icon;
        return () => <ClientOnly>
            {
                (() => {
                    if (_.isString(props.icon)) {
                        if (props.icon.includes(':')) {
                            return <div><Icon {...attrs} icon={props.icon} {...attrs}/></div>;
                        } else {
                            return <d-icon {...attrs} name={props.icon} v-slots={slots}>
                            </d-icon>;
                        }
                    }

                    return <NIcon {...attrs}>
                        <IconNode></IconNode>
                    </NIcon>;

                })()
            }
        </ClientOnly>;
    }
});
