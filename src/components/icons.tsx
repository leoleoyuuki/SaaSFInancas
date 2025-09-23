import type { ComponentType } from "react";
import {
  ShoppingCart,
  Bolt,
  Ticket,
  Plane,
  UtensilsCrossed,
  ShoppingBag,
  ReceiptText,
  Landmark,
  MoreHorizontal,
  CircleDollarSign,
  type LucideProps,
} from "lucide-react";
import type { Category } from "@/lib/types";

export const CategoryIcons: Record<Category, ComponentType<LucideProps>> = {
  Groceries: ShoppingCart,
  Utilities: Bolt,
  Entertainment: Ticket,
  Travel: Plane,
  Food: UtensilsCrossed,
  Shopping: ShoppingBag,
  Bills: ReceiptText,
  Income: Landmark,
  Others: MoreHorizontal,
};

export const getCategoryIcon = (category: string | undefined) => {
  return category && category in CategoryIcons ? CategoryIcons[category as Category] : MoreHorizontal;
};
