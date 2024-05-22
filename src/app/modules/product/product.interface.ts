export type TVariant = [
  {
    type: "color" | "storage";
    value: any;
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
