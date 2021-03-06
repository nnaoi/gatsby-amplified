import { API, graphqlOperation } from "aws-amplify"
import { graphql } from "gatsby"
import React, { 
  ReactElement, 
  useEffect, 
  useState 
} from "react"
import { useTranslation } from "react-i18next"
import { CreateTodoMutationVariables, OnCreateTodoSubscription } from "../API"
import CollapsibleGroupItem, {
  CollapsibleGroupItemProps
} from "../components/collapsibleGroupItem"
import { createTodo } from "../graphql/mutations"
import { onCreateTodo } from "../graphql/subscriptions"
import { CreateTodoSubscriptionEvent } from "../types/amplify-types"

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
  const [input, setInput] = useState("");

  const add = () => {
    const vars: CreateTodoMutationVariables = {
      input: {
        name: input,
        description: input,
      }
    }
    const client = API.graphql(graphqlOperation(
      createTodo, vars))
    if ("then" in client) {
      client.then(response => {
        console.log(response);
        const netlifyBuildHooksUrl = process.env.GATSBY_DOMAIN;
        if (netlifyBuildHooksUrl) {
          return fetch(`${netlifyBuildHooksUrl}/.netlify/functions/build-hook`, {
            method: 'POST',
          })
        }

        return Promise.reject("Build hooks url not found.")
      })
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(e => console.error(e));
    }
  }

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
      <form className="m-4 flex">
          <input 
            className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="button"
            className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!input}
            onClick={add}
          >
            Add
          </button>
        </form>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
        Subscription with gatsby-source-graphql
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
