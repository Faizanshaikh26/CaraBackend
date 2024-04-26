require("dotenv");

const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.paymentGateway = async (req, res) => {
  const { products, userData } = req.body;

  try {
    const lineItems = products.map((product) => {
      const price = parseFloat(product.price.replace("$", ""));
      if (isNaN(price)) {
        throw new Error(`Invalid price: ${product.price}`);
      }

      return {
        price_data: {
          currency: "USD", //
          product_data: {
            name: product.name,
            // images: [product.img],
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/order",
      cancel_url: "http://localhost:5173/cart",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "FR", "DE"],
      },
    });

    res.json({ id: session.id });
    // console.log(userData);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Could not create checkout session" });
  }
};
