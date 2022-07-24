import { Engine } from "./Engine";

declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.svg" {
  const value: any;
  export = value;
}

declare module "*.mp3" {
  const value: any;
  export = value;
}

declare global {
  // eslint-disable-next-line no-var
  var engine: Engine;
}
