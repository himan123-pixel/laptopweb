import {
  FLAT_SHIPPING,
  FREE_SHIPPING_THRESHOLD,
  TAX_RATE,
  type Product,
} from "../data/products";

export interface CartLine {
  key: string;
  productId: string;
  finish: string;
  qty: number;
}

export interface CartLineView extends CartLine {
  product: Product;
  lineTotal: number;
}

export interface Totals {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  freeShipping: boolean;
  remaining: number;
}

export function computeTotals(subtotal: number): Totals {
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = subtotal === 0 || freeShipping ? 0 : FLAT_SHIPPING;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  return {
    subtotal,
    shipping,
    tax,
    total: subtotal + shipping + tax,
    freeShipping,
    remaining: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
  };
}
