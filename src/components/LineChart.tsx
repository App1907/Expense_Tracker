import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const CustomLineChart = ({ data }: { data: number[] }) => {
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [{ data }],
        }}
        width={350}
        height={220}
        yAxisSuffix=" $"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
});

export default CustomLineChart;