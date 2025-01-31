import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [DatePipe]
})
export class AppComponent {
    title = 'mentoring-first-project';
    readonly today: Date = new Date();
    readonly datePipe = inject(DatePipe)
    
    get formattedDate(): string {
        return this.datePipe.transform(this.today, 'medium') || '';
    }
}
