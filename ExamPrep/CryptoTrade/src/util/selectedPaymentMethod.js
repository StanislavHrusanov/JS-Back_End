exports.findPaymentMethod = (cryptoData) => {
    const selectedPaymentMethod = {
        "wallet": false,
        "credit": false,
        "debit": false,
        "paypal": false
    }

    if (cryptoData.paymentMethod == 'crypto-wallet') {
        selectedPaymentMethod.wallet = true;
    } else if (cryptoData.paymentMethod == 'credit-card') {
        selectedPaymentMethod.credit = true;
    } else if (cryptoData.paymentMethod == 'debit-card') {
        selectedPaymentMethod.debit = true;
    } else if (cryptoData.paymentMethod == 'paypal') {
        selectedPaymentMethod.paypal = true;
    }

    return selectedPaymentMethod
}
