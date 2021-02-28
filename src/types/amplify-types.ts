import { OnCreateTodoSubscription } from "../API"

export type CreateTodoSubscriptionEvent = {
  value: {
    data: OnCreateTodoSubscription
  }
}
