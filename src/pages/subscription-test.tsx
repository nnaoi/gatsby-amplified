import { API, graphqlOperation } from "aws-amplify"
import { graphql } from "gatsby"
import React, { 
  ReactElement, 
  useEffect, 
  useState 
} from "react"
import { useTranslation } from "react-i18next"
import { OnCreateTodoSubscription } from "../API"
import CollapsibleGroupItem, {
  CollapsibleGroupItemProps
} from "../components/collapsibleGroupItem"
import { onCreateTodo } from "../graphql/subscriptions"

export const query = graphql`
query list {
  gatsbyamplified {
    listTodos {
      items {
        id
        name
        description
      }
    }
  }
}`

interface Props { }

type CreateTodoSubscriptionEvent = {
   value: { 
     data: OnCreateTodoSubscription 
    } 
  };

function SubscriptionTest({ data }: any): ReactElement {
  const initialItems: CollapsibleGroupItemProps[] = 
    data.gatsbyamplified.listTodos.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
    }));
  const [
    collpsibleGroupItems, 
    setItems
  ] = useState<CollapsibleGroupItemProps[]>(initialItems);
  
  useEffect(() => {
    const client = API.graphql(
      graphqlOperation(onCreateTodo)
    )
    if ("subscribe" in client) {
      client.subscribe({
        next: ({ value: { data }}: CreateTodoSubscriptionEvent) => {
          if (data.onCreateTodo) {
            const todo: CollapsibleGroupItemProps = {
              id: data.onCreateTodo.id,
              name: data.onCreateTodo.name ?? "",
              description: data.onCreateTodo.description ?? "",
            }
            setItems(prev => [...prev, todo])
          }
        }
      })
    }
  }, [])

  return (
    <div style={{ fontFamily: 'Roboto' }}>
      <div className="flex py-20 h-screen md:-mx-4">
        <div className="w-full my-4">
          {collpsibleGroupItems.map((item: any) => (
            <CollapsibleGroupItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubscriptionTest
