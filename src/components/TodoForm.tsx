import { FormEvent } from 'react';

interface TodoFormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

function TodoForm({ handleSubmit, inputValue, setInputValue }: TodoFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ajouter une tâche..."
      />
      <button type="submit">Ajouter</button>
    </form>
  )
}

export default TodoForm
