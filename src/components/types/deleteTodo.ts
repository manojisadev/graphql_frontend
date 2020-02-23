/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteTodo
// ====================================================

export interface deleteTodo_deleteTodo {
  __typename: "DeleteTodoPayload";
  success: boolean;
  errors: string[];
}

export interface deleteTodo {
  deleteTodo: deleteTodo_deleteTodo | null;
}

export interface deleteTodoVariables {
  taskId: string;
}
