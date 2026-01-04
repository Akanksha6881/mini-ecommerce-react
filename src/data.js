export const withStock = (products) =>
  products.map(p => ({
    ...p,
    stock: Math.floor(Math.random() * 5) + 1
  }));
