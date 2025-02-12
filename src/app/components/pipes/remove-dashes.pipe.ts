import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "CustomRemoveDashes",
    standalone: true,
    pure: true
})
export class CustomRemoveDashes implements PipeTransform{
    transform(text: string): string {
        return text.replace(/-/g, "");
    }
}