import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { useTodos } from './hooks/useTodos';
import { ListTodo } from 'lucide-react';

const queryClient = new QueryClient();

function TodoApp() {
  const { todos, addTodo, toggleTodo, deleteTodo, isLoading } = useTodos();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <ListTodo className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">My Todos</h1>
          </div>
          
          <TodoInput onAdd={addTodo} />
          
          <div className="space-y-2">
            {isLoading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : todos.length === 0 ? (
              <p className="text-center text-gray-500">No todos yet. Add one above!</p>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoApp />
    </QueryClientProvider>
  );
}

export default App;