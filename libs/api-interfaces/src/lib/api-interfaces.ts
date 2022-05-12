export interface Message {
  message: string
}

export interface Entity {
  uid: string
}

export interface TodoItem extends Entity {
  task: string
  order: number
  completed: TodoItemCompleted
}

export interface TodoItemCompleted {
  timestamp: Date
}
