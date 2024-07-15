import {NIcon} from "naive-ui";
import type {VNode} from "vue";

export const Icon = defineComponent({
    setup(props, {slots}) {
        return () => <NIcon>
            {slots.default?.()}
        </NIcon>;
    }
});

export const RenderIcon = (Icon: () => VNode, props: Partial<any>) => {
    return <NIcon {...props}>
        <Icon></Icon>
    </NIcon>;
};
