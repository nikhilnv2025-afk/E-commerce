import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js"

const Paypalbutton = ({ amount, onSuccess, onError, shippingAddress }) => {
    // normalize amount to a 2-decimal string that PayPal accepts
    const numericAmount = (() => {
        const n = typeof amount === "number" ? amount : parseFloat(amount)
        if (Number.isFinite(n)) return n.toFixed(2)
        return "0.00"
    })()

    const safeAddress = {
        address_line_1: shippingAddress?.address || "",
        admin_area_2: shippingAddress?.city || "",
        postal_code: shippingAddress?.postalCode || "",
        country_code: shippingAddress?.country || "",
    }

    const payerName = `${shippingAddress?.firstName || ""} ${shippingAddress?.Lastname || ""}`.trim()

    return (
        <PayPalScriptProvider
            options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: "USD" }}
        >
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        application_context: {
                            shipping_preference: "SET_PROVIDED_ADDRESS",
                        },
                        purchase_units: [
                            {
                                amount: { value: numericAmount, currency_code: "USD" },
                                shipping: {
                                    address: safeAddress,
                                    name: { full_name: payerName },
                                },
                            },
                        ],
                    })
                }}
                onApprove={(data, actions) => {
                    return actions.order
                        .capture()
                        .then((details) => {
                            try {
                                onSuccess && onSuccess(details)
                            } catch (err) {
                                console.error("onSuccess handler threw:", err)
                            }
                        })
                        .catch((err) => {
                            onError && onError(err)
                        })
                }}
                onError={(err) => {
                    onError && onError(err)
                }}
            />
        </PayPalScriptProvider>
    )
}

export default Paypalbutton

