import { PayPalButton } from "react-paypal-button-v2";
import { Component } from "react"

export default class Example extends Component {
  render() {
    return (
      <PayPalButton
        options={{
          clientId: "AZQ5tBhfxUkg4CUffrj_ttphs0BdX8zhf2O6KXo6NeKR1HhjhUhcQsswTP9v4rNNbXTZdoCSC5deDn5Q",
          vault: true
        }}
        createSubscription={(data, actions) => {
          console.log('@W@@@@@@@@@@@@@@@@@', data);
          return actions.subscription.create({
            plan_id: 'P-3XJ24668YY5203131L7K3JGQ'
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