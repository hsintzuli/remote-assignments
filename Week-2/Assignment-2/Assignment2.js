function avg(data) {
  const size = data.size;
  let sum = 0;
  for (product of data.products) {
    sum += product.price;
  }
  const avg = sum / size;
  return avg
}

console.log(
  avg({
    size: 3,
    products: [
      {
        name: 'Product 1',
        price: 100,
      },
      {
        name: 'Product 2',
        price: 700,
      },
      {
        name: 'Product 3',
        price: 250,
      },
    ],
  })
); // should print the average price of all products