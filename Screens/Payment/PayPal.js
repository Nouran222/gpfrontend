import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Linking, Alert } from 'react-native';
import axios from 'axios';

const PayPal = ({ navigation, route }) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const { product } = route.params;

  const buyBook = async () => {
    const dataDetail = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [
        {
          amount: {
            currency: 'AUD',
            total: '26',
            details: {
              shipping: '6',
              subtotal: '20',
              shipping_discount: '0',
              insurance: '0',
              handling_fee: '0',
              tax: '0',
            },
          },
          description: 'This is the payment transaction description',
          payment_options: {
            allowed_payment_method: 'IMMEDIATE_PAY',
          },
          item_list: {
            items: [
              {
                name: 'Book',
                description: 'Chasing After The Wind',
                quantity: '1',
                price: '20',
                tax: '0',
                sku: 'product34',
                currency: 'AUD',
              },
            ],
          },
        },
      ],
      redirect_urls: {
        return_url: 'https://example.com/',
        cancel_url: 'https://example.com/',
      },
    };

    const tokenUrl = 'https://api.sandbox.paypal.com/v1/oauth2/token';

    const tokenData = {
      grant_type: 'client_credentials',
    };

    const auth = {
      username: 'AdO-NE8K2IY9chzjwYnXu-gzWuzwcu2a6jkozf6mtl1dLi-hkC2B7rZlzcbD5Sj_RfC3c5g-5n_NNh6p',
      password: 'EOtlR1WUDKZhH8RdLGLurIY3Ob0UOFC9xYHVvq3fetnUAQpn1ddRnwfYvbTvzfxerPlO72UR7TqqOENl',
    };

    const tokenOptions = {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Credentials': true,
      },
      data: Object.keys(tokenData)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(tokenData[key]))
        .join('&'),
      auth: auth,
      url: tokenUrl,
    };

    try {
      const tokenResponse = await axios(tokenOptions);
      console.log('Token response:', tokenResponse.data);

      const accessToken = tokenResponse.data.access_token;
      if (!accessToken) {
        throw new Error('Failed to obtain access token');
      }

      setAccessToken(accessToken);

      const paymentUrl = 'https://api.sandbox.paypal.com/v1/payments/payment';

      const paymentOptions = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const paymentResponse = await axios.post(paymentUrl, dataDetail, paymentOptions);
      console.log('Payment response:', paymentResponse.data);

      const { id, links } = paymentResponse.data;
      const approvalUrl = links.find((data) => data.rel === 'approval_url').href;

      console.log('Approval URL:', approvalUrl);
      setPaypalUrl(approvalUrl);
      return approvalUrl;
    } catch (error) {
      console.error('PayPal payment error:', error.response ? error.response.data : error.message);
      setError('An error occurred during the payment process');
      return null;
    }
  };

  const handlePayPalPayment = async () => {
    try {
      const approvalUrl = await buyBook();

      if (approvalUrl) {
        console.log('Opening PayPal URL:', approvalUrl);
        const supported = await Linking.canOpenURL(approvalUrl);
        if (supported) {
          await Linking.openURL(approvalUrl);
          setPaidFor(true);
        } else {
          Alert.alert("Can't handle URL: " + approvalUrl);
        }
      } else {
        setError('Failed to initiate PayPal payment');
      }
    } catch (error) {
      console.error('PayPal payment error:', error);
      setError('An error occurred during the payment process');
    }
  };

  if (paidFor) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Congrats, you just bought {product.name}!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>Uh oh, an error occurred! {error}</Text>}
      <Text style={styles.text}>
        {product.description} for ${product.price}
      </Text>
      <Button title="Pay with PayPal" onPress={handlePayPalPayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default PayPal;




