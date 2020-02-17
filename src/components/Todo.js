import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import CreateTodo from './CreateTodo';
import { useApolloClient } from "@apollo/react-hooks";
import DeleteIcon from '@material-ui/icons/Delete';


import gql from 'graphql-tag';

const GET_TODOS = gql`
{
  
  todos {
    id
    task
  }
}
`;

const DELETE_TODO = gql`
  mutation deleteTodo($taskId: ID!){
    deleteTodo(input: {taskId: $taskId}){
      success
      errors
    }
  }
`;

const IS_SHOW_CREATE = gql `
{
  isShowCreateTodo @client  
}
`;

function Todo() {
  const client = useApolloClient();

  const {loading, error, data} = useQuery(GET_TODOS)

  const {loading: showCreateLoader, error: showCreateError, data: showCreateData} = useQuery(IS_SHOW_CREATE)

  const [deleteTodo] = useMutation(DELETE_TODO
    // , {
    // update(cache, {data: {deletedTodo}}){
    //   const {todos} = cache.readQuery({query: GET_TODOS});
    //   cache.writeQuery({
    //     query: GET_TODOS,
    //     data: { todos: todos.}
    //   })
    // }
    // }
  )

  if (loading) return 'Loading..';
  if (error) return `Error ${error.message}`;

  return (
    <Paper style={{ margin:"5em"}}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={2} style={{padding:"1em"}}>
        {
          data.todos.map(todo => (
            <Grid item key={todo.id}>  
              <Card style={{height: "5em", width: "10em", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffe57f", boxShadow: '0px 0px 0px 0px '}} >
                <CardContent>
                  {todo.task}
                </CardContent>
                <DeleteIcon onClick={
                  (e) => {
                    e.preventDefault();
                    deleteTodo({variables: {taskId: todo.id}, refetchQueries: [{query: GET_TODOS}]})
                  }
                } />
              </Card>
            </Grid>

          ))     

        }
        <AddIcon color="primary"  fontSize="large" onClick={
          (e) => {
            e.preventDefault();
            client.writeData({ data: { isShowCreateTodo: !showCreateData.isShowCreateTodo } })
          }
        } />
        {  !showCreateError && showCreateData.isShowCreateTodo && < CreateTodo />}
      </Grid>
    </Paper>
  );
}

export default Todo;
