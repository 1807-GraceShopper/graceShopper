making order
- add item to cart
- create order from cart
  - read prices from database to create orderItem
  - not from req.body (do not trust req.body)

purchase order
- client reads order price
- sends to stripe
- stripe gives back token
- client sends token + orderId to server
- server verifies with stripe that token $$$ === order $$$
- change order to 'paid'
