export type TVariant = [
  {
    type: string;
    value: string;
  }
];

export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: "computer" | "peripherals" | "wireless" | "ergonomic";
  variants: TVariant;
  inventory: TInventory;
};
