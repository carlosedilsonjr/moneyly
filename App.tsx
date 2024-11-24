import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { openDatabaseSync } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { expenseTable } from './db/schema';
import migrations from './drizzle/migrations';

const expo = openDatabaseSync('moneyly_db.db');

const db = drizzle(expo);

export default function App() {
  const { success, error } = useMigrations(db, migrations);
  const [expenses, setExpenses] = useState<(typeof expenseTable.$inferSelect)[]>([]);

  useEffect(() => {
    if (!success) return;

    const addExpense = async () => {
      await db.delete(expenseTable);

      await db.insert(expenseTable).values([
        {
          category: 'Teste',
          paymentMethod: 'Dinheiro',
          value: 1000,
        },
      ]);

      const expenses = await db.select().from(expenseTable);
      setExpenses(expenses);
    };

    addExpense();
  }, [success]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View style={styles.container}>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  function handleAddExpense() {
    db.insert(expenseTable)
      .values({
        category: 'Alimentação',
        paymentMethod: 'Dinheiro',
        value: 400,
        description: 'Almoço',
      })
      .finally(async () => {
        const expenses = await db.select().from(expenseTable);
        setExpenses(expenses);
      });
  }

  return (
    <View style={styles.container}>
      {expenses.map((expense) => (
        <Text key={expense.id}>
          {expense.description || 'N/A'} -- {expense.category} -- {expense.value}
        </Text>
      ))}

      <Button title="Adicionar" color={'hsl(22, 100%, 50%)'} onPress={handleAddExpense} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
