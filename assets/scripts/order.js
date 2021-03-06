// Fun Fun Function - Unit testing in JavaScript Part 1 - Why unit testing?
// https://www.youtube.com/watch?v=Eu35xM76kKY&list=PL0zVEGEvSaeF_zoW9o66wa_UCNE3a7BEr&index=1

const anOrder = {
  items: [
    { "name": 'Dragon Food', price: 8, quantity: 6 },
    { "name": 'Dragon Cage (small)', price: 800, quantity: 2 },
    { "name": "Shipping", price: 20, shipping: true }
  ]
};

let orderTotal = order => {
  let items = order.items.filter(x => !x.shipping);
  const sumOfItems = items.reduce((acc, cur) => acc + (cur.price * (cur.quantity || 1)), 0);
  const shippingItem = order.items.find(x => !!x.shipping);
  if (shippingItem) {
    const shipping = sumOfItems >= 1000 ? 0 : shippingItem.price * items.length;
    return sumOfItems + shipping;
  }
  return sumOfItems;
};

module.exports = { anOrder, orderTotal };

/* !! - https://brianflove.com/2014-09-02/whats-the-double-exclamation-mark-for-in-javascript/

So, why double exclamation marks?

In some cases you may want to cast a variable to be explicitly boolean. Why? Well, the number 
one reason is that most of time developers do not use type safe comparison operators.

The type safe comparison operators are:

    Strictly equal: ===
    Strictly unequal: !==

When using the type safe comparison operators you are both checking that the values are equal 
(or unequal) and that their type is the same. Without the type safe comparison operators you 
are allowing the JavaScript engine the freedom to coerce your variables to true or false based 
on the truthy/falsey logic.
*/

/* function test() {
  var name = 'Brian';

  //alert 'string'
  console.log(typeof name);

  //cast to boolean
  var bool = !!name;

  //alert 'boolean'
  console.log(typeof bool);
  return bool;
}
console.log(test()); */