export type Variant = [
  {
    type: "color" | "storage";
    value: string | number;
  }
];

export type Inventory = {
  quantity: number;
  inStock: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: "computer" | "peripherals" | "wireless" | "ergonomic";
  variants: Variant;
  inventory: Inventory;
};
