import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const CurrencyRatesScreen = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://api.exchangeratesapi.io/latest?access_key=3bbec42ae795c34bcd6630fd5165f482');
        const data = await response.json();
        console.log(data);
        setRates(data.rates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching currency rates:', error);
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Currency Rates</Text>
      {/* 在这里根据你的需要渲染汇率信息 */}
      {Object.entries(rates).map(([currency, rate]) => (
        <Text key={currency} style={styles.rate}>
          {currency}: {rate}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  rate: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default CurrencyRatesScreen;
