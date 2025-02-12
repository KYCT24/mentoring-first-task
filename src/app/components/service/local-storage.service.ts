import { Injectable } from "@angular/core";

@Injectable ({
    providedIn: "root",
})
export class LocalStorageService {
    constructor() {}
    
    public getDataLocalStorage<T>(key: string): T | null{ 
        const data: string | null = localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }
    
    public saveDataLocalStorage<T>(key: string, data: T): void {
        localStorage.setItem(key, JSON.stringify(data));
    }
    
    public removeDataLocalStorage<T>(key: string): void {
        localStorage.removeItem(key);
    }
}