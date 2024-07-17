import {defineComponent} from "vue";

export default defineComponent({
    setup(props: any, {slots}) {
        console.log(props)
        return () => <>
            {slots.default?.()}
        </>;
    }
});
