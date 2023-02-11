import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Paypal = () => {
  return (
    <React.Fragment>
      <div className="mt-10 flex justify-center items-center">
        <PayPalScriptProvider
          options={{
            "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
          }}
        >
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: 679.0,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(function (details) {
                alert("Transctions completed" + details.payer.name.given_name);
              });
            }}
          />
        </PayPalScriptProvider>
      </div>
    </React.Fragment>
  );
};

export default Paypal;
