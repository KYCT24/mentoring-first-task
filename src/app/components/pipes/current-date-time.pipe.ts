import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "CurrentDateTimePipe",
    standalone: true,
    pure: true
})
export class CurrentDateTimePipe extends DatePipe implements PipeTransform {
    override transform(value: any): any {
        return super.transform(value, 'dd.MM.yyyy HH:mm:ss');
    }
}