export {};

declare global {
  interface HTMLHtmlElement {
    lenis?: {
      scrollTo: (value: number) => void;
      scroll: { current: number };
      on: (event: string, callback: () => void) => void;
      off: (event: string, callback: () => void) => void;
    };
  }
}
