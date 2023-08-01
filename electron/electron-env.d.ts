/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬ dist
     * │ ├─┬ electron
     * │ │ ├─┬ main
     * │ │ │ └── index.js
     * │ │ └─┬ preload
     * │ │   └── index.js
     * │ ├── index.html
     * │ ├── ...other-static-files-from-public
     * │
     * ```
     */
    DIST: string
    /** /dist/ or /public/ */
    PUBLIC: string
  }
}


declare module 'easydl/utils' {
  export function clean(path: string): void; // Replace 'void' with the return type of the function if applicable
}