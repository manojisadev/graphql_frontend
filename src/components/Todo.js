import React from 'react';
import { Query } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import CreateTodo from './CreateTodo';

import gql from 'graphql-tag';

const GET_TODOS = gql`
{
  
  todos {
    id
    task
  }
}
`;

const Todo = () => (
    <Query query={GET_TODOS}>
        {
            ({loading, error, data}) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;

              return (
                <Paper style={{ margin:"5em"}}>
                  <Grid container direction="column" justify="center" alignItems="center" spacing={2} style={{padding:"1em"}}>
                    {
                      data.todos.map(todo => (
                        <Grid item key={todo.id}>  
                          <Card style={{height: "5em", width: "5em", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffe57f", boxShadow: '0px 0px 0px 0px '}} >
                            <CardContent>
                              {todo.task}
                            </CardContent>
                          </Card>
                        </Grid>

                      ))     

                    }
                    <AddIcon color="primary"  fontSize="large" onClick/>
                    <CreateTodo />
                  </Grid>
                </Paper>
              );
            }
          }

      </Query>
 );

// function Todo() {
//   const {loading, error, data} = useQuery(GET_TODOS)

//   if (loading) return 'Loading..';
//   if (error) return `Error ${error.message}`;

//   return (
//     <div>
//       {
//         data.todos.map(todo => (
//           todo.task
//       ))}
//     </div>
//   );
// }

export default Todo;
