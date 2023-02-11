import React, { useEffect } from "react";
import { useRef } from "react";

const Checkout = () => {
  const paypal = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "cool table units",
                amount: {
                  currency_code: "USD",
                  value: 545.98,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture;
          console.log(`${order}`);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <React.Fragment>
      <div ref={paypal}></div>

      {/* <div className="mt-10 flex justify-center items-center">
       //   const [checkout, setCheckOut] = useState(false);
        {checkout ? (
          <Checkout />
        ) : (
          <button
            onClick={() => setCheckOut(true)}
            className=" bg-slate-500 rounded-md px-5 py-3 hover:bg-slate-600"
          >
            checkout
          </button>
        )}
      </div> */}
    </React.Fragment>
  );
};

export default Checkout;
