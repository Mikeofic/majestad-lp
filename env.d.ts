/// <reference types="vite/client" />

// Google Analytics gtag declaration
declare function gtag(command: string, targetId: string, config?: any): void;
declare function gtag(command: 'config', targetId: string, config?: any): void;
declare function gtag(command: 'event', eventName: string, eventParameters?: any): void;