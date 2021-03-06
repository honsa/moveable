import {
    previewTemplate, CODE_TYPE, DEFAULT_PROPS_TEMPLATE, codeIndent, ANGULAR_PROPS_TEMPLATE
} from "storybook-addon-preview";
import { camelize, IObject } from "@daybrush/utils";

export const BASIC_ANGULAR_HTML_TEMPLATE = (markup: any, {
    ableName,
    props,
    frame,
    events,
}: {
    ableName: string,
    props: any[],
    frame: any,
    events: IObject<any>,
}) => previewTemplate`
${markup}
<ngx-moveable
    [target]="target"
${ANGULAR_PROPS_TEMPLATE(props, { wrap: "'" })}
${Object.keys(events).map(name => `    (${name})="${camelize(`on ${name}`)}($event)"`).join("\n")}
    ></ngx-moveable>
`;
export const BASIC_ANGULAR_COMPONENT_TEMPLATE = ({
    frame,
    events,
}: {
    events: any,
    frame: any,
}) => previewTemplate`
import { Component } from "@angular/core";

@Component({
    selector: 'app-root',
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    frame = {
${DEFAULT_PROPS_TEMPLATE(Object.keys(frame), { indent: 8 })}
    };
${Object.keys(events).map(name => `    ${codeIndent(events[name](CODE_TYPE.METHOD, "angular"), { indent: 4 })}`).join("\n")}
}
`;
