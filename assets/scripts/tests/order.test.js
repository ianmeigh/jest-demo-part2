const { anOrder, orderTotal } = require("../order");

describe("Test order object", () => {
  test("Each order item (that is not a shipping item) should contain 'name' key", () => {
    anOrder.items.filter(element => !element.shipping).forEach(element => {
      expect("name" in element).toBe(true);
    });
  });
  test("Each order item (that is not a shipping item) should contain 'name' key", () => {
    anOrder.items.filter(element => !element.shipping).forEach(element => {
      expect("name" in element).toBe(true);
    });
  });
  test("Each order item (that is not a shipping item) should contain 'quantity' key", () => {
    anOrder.items.filter(element => !element.shipping).forEach(element => {
      expect("quantity" in element).toBe(true);
    });
  });
  test("Each order item Array should contain a single shipping object", () => {
    expect(!!anOrder.items.find(x => !!x.shipping)).toBe(true);
  });
});

describe("Test Order Total Function", () => {
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
  test("orderTotal calculates the correct sum with quantity where quantity and shipping is provided, Example 1", () => {
    const sampleOrder = {
      items: [
        { "name": 'Item 1', price: 1, quantity: 3 },
        { "name": 'Item 2', price: 2, quantity: 2 },
        { "name": 'Item 3', price: 3, quantity: 1 },
        { "name": "Shipping", price: 10, shipping: true }
      ]
    };
    expect(orderTotal(sampleOrder)).toEqual(20);
  });
  test("orderTotal calculates the correct sum with quantity where quantity and shipping is provided, Example 2", () => {
    const sampleOrder = {
      items: [
        { "name": 'Item 1', price: 1, quantity: 3 },
        { "name": 'Item 2', price: 2, quantity: 2 },
        { "name": 'Item 3', price: 3, quantity: 1 },
        { "name": "Shipping", price: 20, shipping: true }
      ]
    };
    expect(orderTotal(sampleOrder)).toEqual(30);
  });
});