const Product = require('../models/product');
let newProduct = new Product({
    name: "M150",
    img: "M150",
    description: "Power",
    Catag: "Drink"
  });

test("name should not have special charactor",() =>{
    expect(newProduct.name).not.toMatch(/!@#$%^&*(),.?":{}|<>/);
});

// test('img should not have special charactor', () => {
//   expect(newProduct.img).not.toMatch(/!@#$%^&*(),.?":{}|<>/);
// });


test('description should not have special charactor ', () => {
  expect(newProduct.description).not.toMatch(/!@#$%^&*(),.?":{}|<>/);
});

test('Catag should not have special charactor hello', () => {
  expect(newProduct.Catag).not.toMatch(/!@#$%^&*(),.?":{}|<>/);
});

