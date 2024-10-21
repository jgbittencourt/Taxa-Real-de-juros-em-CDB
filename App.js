import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  
  const [inputCDB, setInputCDB] = useState('');

  const [selectedTax, setSelectedTax] = useState(null);
  const [realCDI, setRealCDI] = useState('');

  
  const handleTaxSelection = (taxValue) => {
    setSelectedTax(taxValue);
  };


  const taxOptions = [
    { id: '1', label: 'Até 180 dias - 22,5%', value: '22.5' },
    { id: '2', label: 'De 181 dias a 360 dias - 20%', value: '20' },
    { id: '3', label: 'De 361 a 720 dias - 17,5%', value: '17.5' },
    { id: '4', label: 'Acima de 720 dias - 15%', value: '15' },
  ];

  
  const calcularRentabilidadeReal = () => {
    const cdi = parseFloat(inputCDB);
    const impostoRenda = parseFloat(selectedTax);

    if (!cdi || !impostoRenda) {
      Alert.alert('Erro', 'Por favor, insira o valor do CDI e selecione o imposto de renda.');
      return;
    }

    
    const rentabilidadeReal = cdi * (1 - impostoRenda / 100);
    setRealCDI(rentabilidadeReal.toFixed(2)); // Arredonda o valor
  };

  return (
    <View style={styles.container}>


      <Text style={styles.Titulo1}>Taxa Real de juros em CDB </Text>

      <Text style={styles.label}>Entre com taxa do CDB (%)</Text>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder={'Digite...'}
          placeholderTextColor="#000"
          selectionColor={'#fff'}
          value={inputCDB} // Vinculando o estado com o TextInput
          onChangeText={setInputCDB} // Atualizando o estado com o valor digitado
        />
      </View>

      <View>
        <Text style={styles.renda}>Imposto de Renda:</Text>
        {/* Opções de imposto de renda */}
        {taxOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.radioButtonContainer}
            onPress={() => handleTaxSelection(option.value)}
          >
            <View style={styles.radioButton}>
              {selectedTax === option.value && <View style={styles.radioButtonSelected} />}
            </View>
            <Text style={styles.radioButtonLabel}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Mostra a taxa selecionada */}
      <Text>


        Imposto de Renda Selecionado: {selectedTax ? `${selectedTax}%` : 'Nenhum'}
      </Text>
      
        <View style={styles.buttonContainer}>
      <Button
        title="Calcular Rentabilidade Real"
        color="#000"
        onPress={calcularRentabilidadeReal}
        style={styles.buttonContainer}>
        </Button>
        
        </View>
        <View>
        <Text style={styles.resultado}>
        Rentabilidade Real:{realCDI ? `${realCDI}%`:'(Calcule para ver o resultado)'}</Text>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00BFFF',
    alignItems: 'center',
  },
  Titulo1: {
    color: '#000',
    fontSize: 30,
    marginTop: 100,
    marginBottom: 100,
  },
  label: {
    color: '#000',
    fontSize: 20,
  },
  containerInput: {
    position: 'relative',
  },
  input: {
    color: '#000',
    width: 110,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#fff',
  },
  renda: {
    color: '#000',
    fontSize: 20,
    marginTop: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  radioButtonLabel: {
    color: '#fff',
    fontSize: 18,
  },
  selectedOptionText: {
    color: '#000',
    marginTop: 20,
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor:'#fff',
    width:'60%',
    marginTop: 70,
    height:40,
    borderRadius:5,
  },
  resultado: {
      fontSize: 20,
      color: '#ff0000',
      marginTop: 28,
  },
  parenteses: {
    fontSize: 12,
    color: '#fff',
},
});
