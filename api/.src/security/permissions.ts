import { shield, rule, allow } from 'graphql-shield'
import { Rule } from 'graphql-shield/dist/rules'

// TODO
const rules: { [rule: string]: Rule } = {}

export const permissions = shield(
    {
        Mutation: {
            '*': allow,
        },
    },
    { fallbackRule: allow }
)
