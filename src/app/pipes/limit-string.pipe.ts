import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "CustomLimitString",
    standalone: true,
    pure: true
})
export class CustomLimitString implements PipeTransform{
    transform(text: string): string {
        if (text.length > 20) {
            return text.substring(0, 20) + "...";
        }
        return text;
    }
}