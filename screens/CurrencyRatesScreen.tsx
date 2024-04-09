import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';

const CurrencyRatesScreen = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  // 国旗emoji和货币代码的映射
  const flags = {
    USD: '🇺🇸',
    EUR: '🇪🇺',
    GBP: '🇬🇧',
    JPY: '🇯🇵',
    CAD: '🇨🇦',
    AUD: '🇦🇺',
    CHF: '🇨🇭',
    CNY: '🇨🇳',
  };

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://openexchangerates.org/api/latest.json?app_id=e3f44355048b4244bffcd041ca9f5ccb');
        const data = await response.json();
        if (data && data.rates) {
          const filteredRates = Object.entries(data.rates)
            .filter(([currency]) => flags[currency])
            .map(([currency, rate]) => ({ currency, rate, flag: flags[currency] }));
          setRates(filteredRates);
        } else {
          console.error('Invalid or missing data');
        }
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
      <FlatList
        data={rates}
        keyExtractor={item => item.currency}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.flag} {item.currency}</Text>
            <Text style={styles.itemText}>{item.rate}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 20,
  },
});

export default CurrencyRatesScreen;
