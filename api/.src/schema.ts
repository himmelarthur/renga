import { nexusPrismaPlugin } from 'nexus-prisma'
import { makeSchema } from '@nexus/schema'
import * as Queries from './types/Query'
import * as Mutations from './types/Mutation'
import * as Objects from './types/Object'
import { join } from 'path'

export const schema = makeSchema({
  types: [Objects, Queries, Mutations],
  plugins: [nexusPrismaPlugin()],
  outputs: {
      typegen: join(__dirname, './nexus.ts'),
      schema: join(__dirname, '../schema.graphql'),
  },
})