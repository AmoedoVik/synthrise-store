import Stripe from 'stripe';

// This creates a new Stripe object using the Stripe API secret key
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// This is the main handler function for the checkout process
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // This sets up the parameters for the Stripe checkout session
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1KtGswL4zlB7NgI0VnSbKXVc' },
          { shipping_rate: 'shr_1KtGrsL4zlB7NgI0j8zGKaOy' },
          { shipping_rate: 'shr_1KtGuwL4zlB7NgI0Jjec8399' },
        ],
        line_items: req.body.map((item) => {
          // This replaces the Sanity image URL with a CDN URL for the product image
          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-png', '.png');

          // This sets up the line item object for the Stripe checkout session
          return {
            price_data: { 
              currency: 'usd',
              product_data: { 
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled:true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }

      // This creates a new Stripe checkout session using the parameters
      const session = await stripe.checkout.sessions.create(params);

      // This sends the checkout session as a response to the client
      res.status(200).json(session);
    } catch (err) {
      // This sends an error message as a response to the client if there is an error
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    // This sends a "Method Not Allowed" error as a response to the client if the HTTP method is not POST
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
