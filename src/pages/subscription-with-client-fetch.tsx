import { API, graphqlOperation } from "aws-amplify"
import { GraphQLResult } from "@aws-amplify/api"
import { graphql } from "gatsby"
import React, { 
  ReactElement, 
  useEffect, 
  useState 
} from "react"
import { useTranslation } from "react-i18next"
import { ListTodosQuery, OnCreateTodoSubscription } from "../API"
import CollapsibleGroupItem, {
  CollapsibleGroupItemProps
} from "../components/collapsibleGroupItem"
import { listTodos } from "../graphql/queries"
import { onCreateTodo } from "../graphql/subscriptions"
import { CreateTodoSubscriptionEvent } from "../types/amplify-types"

function SubscriptionTest(): ReactElement {
  const [
    collpsibleGroupItems, 
    setItems
  ] = useState<CollapsibleGroupItemProps[]>([]);
  
  useEffect(() => {
    const client = API.graphql(
      graphqlOperation(listTodos)
    )
    if ("then" in client) {
      client.then((response) => {
        if (response?.data && "listTodos" in response.data) {
          const result = response as GraphQLResult<ListTodosQuery>
          const initialItems: CollapsibleGroupItemProps[] =
            result.data?.listTodos?.items?.map((item) => ({
              id: item?.id ?? "",
              name: item?.name ?? "",
              description: item?.description ?? "",
            })) ?? []
          setItems(prev => [...initialItems, ...prev])
        }
      })
    }
  }, [])

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
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
        Subscription with client fetch
      </h2>
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
