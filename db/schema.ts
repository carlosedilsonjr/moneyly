import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const expenseTable = sqliteTable('expense_table', {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int(), // TODO: Add user table
  date: int()
    .notNull()
    .$defaultFn(() => new Date().getTime()),
  category: text().notNull(),
  description: text(),
  value: int().notNull(),
  paymentMethod: text().notNull(),
});
