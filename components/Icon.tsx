import {NIcon} from "naive-ui";
import type {VNode} from "vue";
import {defineComponent} from "vue";

export const Icon = defineComponent({
    setup(props, {slots}) {
        return () => <NIcon>
            {slots.default?.()}
        </NIcon>;
    }
});

export const RenderIcon = (Icon: () => VNode, props: Partial<any>) => {
    console.log(props)
    return <NIcon {...props}>
        <Icon></Icon>
    </NIcon>;
};
