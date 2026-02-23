// Local product catalog (edit image paths + text anytime)
// IMPORTANT: keep image paths local (no online links).

export const PRODUCTS = [
  {
    id: "aura-hoodie",
    name: "Aura Knit Hoodie",
    price: 2499,
    tag: "New Drop",
    desc: "Ultra-soft knit with a structured hood, hidden pocket seam, and a clean oversized fall.",
    sizes: ["S", "M", "L", "XL"],
    color: "Midnight Ink",
    img: "assets/img/hoodie.webp",
    alt: "Aura Knit Hoodie in Midnight Ink"
  },
  {
    id: "neon-overshirt",
    name: "Neon Line Overshirt",
    price: 2199,
    tag: "Limited",
    desc: "A sharp overshirt built for layering—contrast piping, matte buttons, and a premium drape.",
    sizes: ["S", "M", "L", "XL"],
    color: "Graphite / Neon",
    img: "assets/img/two.webp",
    alt: "Neon Line Overshirt in Graphite"
  },
  {
    id: "city-cargo",
    name: "City Cargo Pants",
    price: 1999,
    tag: "Bestseller",
    desc: "Tapered cargos with a clean silhouette, deep pockets, and a comfy waistband that holds shape.",
    sizes: ["28", "30", "32", "34", "36"],
    color: "Stone Black",
    img: "assets/img/four.webp",
    alt: "City Cargo Pants in Stone Black"
  },
  {
    id: "halo-tee",
    name: "Halo Premium Tee",
    price: 999,
    tag: "Everyday",
    desc: "Heavyweight cotton tee with smooth hand-feel, sharp neck rib, and perfect sleeve length.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: "Cloud White",
    img: "assets/img/lines.webp",
    alt: "Halo Premium Tee in Cloud White"
  },
  {
    id: "ember-track",
    name: "Ember Track Set",
    price: 3499,
    tag: "Set",
    desc: "Two-piece track set with subtle sheen, minimal branding, and a sleek athletic cut.",
    sizes: ["S", "M", "L", "XL"],
    color: "Deep Plum",
    img: "assets/img/fleet1.avif",
    alt: "Ember Track Set in Deep Plum"
  },
  {
    id: "mirage-denim",
    name: "Mirage Denim Jacket",
    price: 2899,
    tag: "Icon",
    desc: "Modern denim with a structured shoulder, soft wash, and crisp seams that elevate any outfit.",
    sizes: ["S", "M", "L", "XL"],
    color: "Washed Indigo",
    img: "assets/img/jacket.webp",
    alt: "Mirage Denim Jacket in Washed Indigo"
  },
  {
    id: "nova-skirt",
    name: "Nova Pleated Skirt",
    price: 1799,
    tag: "Elegant",
    desc: "Flowy pleats with a sleek waistband—designed to move beautifully and feel effortless.",
    sizes: ["XS", "S", "M", "L"],
    color: "Obsidian",
    img: "assets/img/home 3.webp",
    alt: "Nova Pleated Skirt in Obsidian"
  },
  {
    id: "arc-sneaker",
    name: "Arc Street Sneakers",
    price: 2799,
    tag: "Street",
    desc: "Cushioned street sneakers with clean panels and a soft collar for all-day comfort.",
    sizes: ["6", "7", "8", "9", "10", "11"],
    color: "Off-White / Ink",
    img: "assets/img/acces.jpeg",
    alt: "Arc Street Sneakers in Off-White"
  },
  {
    id: "luxe-tote",
    name: "Luxe Utility Tote",
    price: 1499,
    tag: "Accessory",
    desc: "Spacious tote with reinforced handles, inner zip pocket, and a minimal luxe finish.",
    sizes: ["One Size"],
    color: "Charcoal",
    img: "assets/img/bag.webp",
    alt: "Luxe Utility Tote in Charcoal"
  },
  {
    id: "glow-cap",
    name: "Glow Stitch Cap",
    price: 699,
    tag: "Accessory",
    desc: "A clean cap with contrast stitch—shaped crown, soft brim, and an easy adjustable strap.",
    sizes: ["One Size"],
    color: "Ink / Glow",
    img: "assets/img/cap.jpeg",
    alt: "Glow Stitch Cap"
  },
  {
    id: "drift-cardigan",
    name: "Drift Soft Cardigan",
    price: 1899,
    tag: "Cozy",
    desc: "A soft cardigan with a luxe fall, slightly oversized sleeves, and a smooth minimal texture.",
    sizes: ["S", "M", "L", "XL"],
    color: "Warm Sand",
    img: "assets/img/jacket.webp",
    alt: "Drift Soft Cardigan in Warm Sand"
  },
  {
    id: "pulse-dress",
    name: "Pulse Satin Dress",
    price: 3299,
    tag: "Night",
    desc: "Satin finish with a clean neckline and subtle shine—made for evenings and standout moments.",
    sizes: ["XS", "S", "M", "L"],
    color: "Midnight",
    img: "assets/img/oversize.webp",
    alt: "Pulse Satin Dress in Midnight"
  }
];

export function findProduct(id){
  return PRODUCTS.find(p => p.id === id) || null;
}

