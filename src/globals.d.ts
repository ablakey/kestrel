declare module "*.png" {
  const value: string;
  export = value;
}

declare module "*.mp3" {
  const value: Record<string, string>;
  export = value;
}
