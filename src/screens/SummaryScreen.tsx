import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CustomLineChart from '../components/LineChart';

const SummaryScreen = () => {
  const expenses = useSelector((state: RootState) => state.expenses.list);
  const income = useSelector((state: RootState) => state.income.list);

  const totalExpenses = expenses.reduce((total, item) => total + item.amount, 0);
  const totalIncome = income.reduce((total, item) => total + item.amount, 0);

  const expenseTrend = expenses.map((item) => item.amount);
  const incomeTrend = income.map((item) => item.amount);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Summary</Text>
      <View style={styles.summary}>
        <Text>Total Income: ${totalIncome.toFixed(2)}</Text>
        <Text>Total Expenses: ${totalExpenses.toFixed(2)}</Text>
        <Text>Net Balance: ${(totalIncome - totalExpenses).toFixed(2)}</Text>
      </View>
      <View>
        <Text style={styles.chartHeader}>Expense and Income Trends</Text>
        <CustomLineChart data={expenseTrend.length > 0 ? expenseTrend : [0]} />
        <CustomLineChart data={incomeTrend.length > 0 ? incomeTrend : [0]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  summary: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#4CC9FE',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  chartHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default SummaryScreen;




// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import CustomLineChart from '../components/LineChart';

// const SummaryScreen = () => {
//   const expenses = useSelector((state: RootState) => state.expenses.list);
//   const income = useSelector((state: RootState) => state.income.list);

//   const totalExpenses = expenses.reduce((total, item) => total + item.amount, 0);
//   const totalIncome = income.reduce((total, item) => total + item.amount, 0);

//   const expenseTrend = expenses.map((item) => item.amount);
//   const incomeTrend = income.map((item) => item.amount);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Summary</Text>
//       <View style={styles.summary}>
//         <Text>Total Income: ${totalIncome.toFixed(2)}</Text>
//         <Text>Total Expenses: ${totalExpenses.toFixed(2)}</Text>
//         <Text>Net Balance: ${(totalIncome - totalExpenses).toFixed(2)}</Text>
//       </View>
//       <View>
//         <Text style={styles.chartHeader}>Expense and Income Trends</Text>
//         <CustomLineChart data={expenseTrend.length > 0 ? expenseTrend : [0]} />
//         <CustomLineChart data={incomeTrend.length > 0 ? incomeTrend : [0]} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   summary: {
//     marginBottom: 16,
//     padding: 16,
//     backgroundColor: '#f8f8f8',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   chartHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
// });

// export default SummaryScreen;