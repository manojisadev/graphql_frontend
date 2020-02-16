import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import React from 'react';

const CREATE_TODO = gql `
    mutation createTodo($task: String!){
        createTodo(input: {task: $task}){
            todo {
                id
                task
            }
            errors
        }
    }
`;

const GET_TODOS = gql`
{
  
  todos {
    id
    task
  }
}
`;

const CreateTodo = () => {
    let task;
    const [createTodo] = useMutation(CREATE_TODO, {
        update(cache, {data: {createTodo}}) {
            const {todos} = cache.readQuery({query: GET_TODOS});
            cache.writeQuery({
                query: GET_TODOS,
                data: { todos: todos.concat([createTodo.todo])}
            });
        }
    });
    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                createTodo({variables: {task: task.value}})
            }}>
                <input ref={node => {
                    task = node;
                }} 
                />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateTodo;