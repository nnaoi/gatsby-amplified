import { graphql } from "gatsby"
import React, { ReactElement, useState } from "react"
import { useTranslation } from "react-i18next"
import CollapsibleGroupItem from "../components/collapsibleGroupItem"

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
  return (
    <div style={{ fontFamily: 'Roboto' }}>
      <div className="flex py-20 h-screen md:-mx-4">
        <div className="w-full my-4">
          {data.gatsbyamplified.listTodos.items.map((item: any) => (
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
