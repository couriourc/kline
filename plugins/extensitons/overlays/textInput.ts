/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type {OverlayTemplate, TextAttrs} from 'klinecharts';

const textInput: OverlayTemplate = {
    name: 'textInput',
    totalStep: 1,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: (args) => {
//        const lines: LineAttrs[] = [];
        console.log(args.overlay.text);
        const texts: TextAttrs[] = [{
            ...args.coordinates[0],
            text: args.overlay.text || 'Input Text',
            baseline: 'bottom'
        }];

        return [
            {
                type: 'text',
                ignoreEvent: true,
                attrs: texts
            }
        ];
    }
};

export default textInput;
