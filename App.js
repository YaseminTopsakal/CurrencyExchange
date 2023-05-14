import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const API_KEY = 'f01e5775700adee0eec1416b';

export default function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [conversionResult, setConversionResult] = useState(null);

  const convertCurrency = async () => {
    if (
      amount.trim() !== '' &&
      fromCurrency.trim() != '' &&
      toCurrency.trim() !== ''
    ) {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
      );

      const data = await response.json();

      console.log(data);
      if (data.result == 'success') {
        setConversionResult(data.conversion_result);
      } else {
        setConversionResult('Error: API Connection Error' );
      }
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Currency Exchange </Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="From Currency (e.g., USD)"
        value={fromCurrency}
        onChangeText={setFromCurrency}
        autoCapitalize="characters"
      />
      <TextInput
        style={styles.input}
        placeholder="To Currency (e.g., TRY)"
        value={toCurrency}
        onChangeText={setToCurrency}
        autoCapitalize="characters"
      />
      <TouchableOpacity onPress={convertCurrency} style={styles.button}>
        <Text>Convert</Text>
      </TouchableOpacity>
      <Text style={styles.result}>
      {typeof conversionResult=='number'
      ?
      `${amount} ${fromCurrency} = ${conversionResult} ${toCurrency}`
      :
      conversionResult
      }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    paddingHorizontal: 20,
    backgroundColor:'#8aad87'
  },
  title:{
    marginBottom:30,
    fontSize:20
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginBottom: 10,
    backgroundColor:"white"
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  result:{
     backgroundColor:"white",
    marginTop:30,
    borderRadius: 5,
    padding: 10,


  }
});

