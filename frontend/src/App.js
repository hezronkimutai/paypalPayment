import { PayPalButton } from "react-paypal-button-v2";
import { Component } from "react"
const { REACT_APP_CLIENT_ID, REACT_APP_PLAN_ID } = process.env

export default class Example extends Component {
  render() {
    return (
      <PayPalButton
        options={{
          clientId: REACT_APP_CLIENT_ID,
          vault: true
        }}
        createSubscription={(data, actions) => {
          console.log('@W@@@@@@@@@@@@@@@@@', data);
          return actions.subscription.create({
            plan_id: REACT_APP_PLAN_ID
          });
        }}
        onApprove={(data, actions) => {
          // Capture the funds from the transaction
          return actions.subscription.get().then(function (details) {
            console.log('@W@@@@@@@@@@@@@@@@@', details);

            // Show a success message to your buyer
            alert("Subscription completed");

            // OPTIONAL: Call your server to save the subscription
            return fetch("/paypal-subscription-complete", {
              method: "post",
              body: JSON.stringify({
                orderID: data.orderID,
                subscriptionID: data.subscriptionID
              })
            });
          });
        }}
      />
    );
  }
}