import {defineComponent, type VNode} from "vue";
import {NIcon} from "naive-ui";

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
