const orderTotal = require("../order");

describe("Test Order Total", () => {
  test("orderTotal calculates the correct order total", () => {
    const sampleOrder = {
      items: [
        { "name": 'Item 1', price: 1 }
      ]
    };
    expect(orderTotal(sampleOrder)).toEqual(1);
  });
  test("orderTotal calculates the correct order total", () => {
    const sampleOrder = {
      items: [
        { "name": 'Item 1', price: 1 },
        { "name": 'Item 2', price: 2 },
        { "name": 'Item 3', price: 3 },
      ]
    };
    expect(orderTotal(sampleOrder)).toEqual(6);
  });
  test("orderTotal calculates the correct order total where quantity is provided", () => {
    const sampleOrder = {
      items: [
        { "name": 'Item 1', price: 1, quantity: 3 },
        { "name": 'Item 2', price: 2, quantity: 2 },
        { "name": 'Item 3', price: 3, quantity: 1 },
      ]
    };
    expect(orderTotal(sampleOrder)).toEqual(10);
  });
});