import React from 'react';
import { Query } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';

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
                    <div>
                        {
                            data.todos.map(todo => (
                                <div>{todo.task}</div>

                            ))
                            
                        }
                    </div>
                );
            }}

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
