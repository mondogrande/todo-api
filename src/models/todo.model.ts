import { pool } from '../database/pool';
import { Todo, TodoRow } from '../types/todo.types';

/**
 * Convert database row (snake_case) to Todo object (camelCase)
 */
function rowToTodo(row: TodoRow): Todo {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    completed: row.completed,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * TodoModel - Data access layer for todos
 */
export class TodoModel {
  /**
   * Get all todos from the database
   * @returns Promise<Todo[]>
   */
  static async getAllTodos(): Promise<Todo[]> {
    const query = `
      SELECT id, title, description, completed, created_at, updated_at
      FROM todos
      ORDER BY created_at DESC
    `;

    const result = await pool.query<TodoRow>(query);
    return result.rows.map(rowToTodo);
  }
}
