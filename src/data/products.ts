export interface Product {
  id: string;
  name: string;
  tagline: string;
  shape: "bottle" | "tube" | "spray" | "jar";
  accent: string;
}

// TODO(user): review made-up ingredient taglines — swap in anything the product team prefers.
export const products: Product[] = [
  {
    id: "shampoo",
    name: "Shampoo",
    tagline: "Sulfate and paraben free",
    shape: "bottle",
    accent: "#C9A961",
  },
  {
    id: "conditioner",
    name: "Conditioner",
    tagline: "Brazilian keratin straightening.",
    shape: "bottle",
    accent: "#8B6F47",
  },
  {
    id: "sea-salt",
    name: "Sea Salt Spray",
    tagline: "Atlantic salt, matte finish, leave in thickness treatment.",
    shape: "spray",
    accent: "#6B8E7F",
  },
  {
    id: "texture-powder",
    name: "Texture Powder",
    tagline: "Weightless hold + zero residue.",
    shape: "jar",
    accent: "#A84A3E",
  },
];
