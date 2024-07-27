import {defineComponent} from "vue";
import _ from "underscore";
import {Icon} from "@iconify/vue";
import {ClientOnly} from "#components";

export default defineComponent({
    props: ['icon'],
    setup(props, {attrs, slots}) {
        const IconNode = props.icon;
        return () => <ClientOnly>
            {
                (() => {
                    if (_.isString(props.icon)) {
                        if (props.icon.includes(':')) {
                            return <Icon  {...attrs} icon={props.icon}/>;
                        } else if ((props.icon as string).startsWith('i-')) {
                            return <u-icon  {...attrs} name={props.icon}></u-icon>;
                        } else {
                            return <d-icon {...attrs} name={props.icon} v-slots={slots}>
                            </d-icon>;
                        }
                    }
                })()
            }
        </ClientOnly>;
    }
});
