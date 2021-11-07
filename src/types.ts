export type DamageEffect = {
  damage: number;
  // TODO: eg. add damage type
};

export type ValueOf<T> = T[keyof T];
