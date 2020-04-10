import React from 'react'
import gql from 'graphql-tag'
import { useAllUsersQuery } from './generated/graphql'

gql`
    query allUsers {
        users {
            id
            username
        }
    }
`

export default () => {
    const { data, loading } = useAllUsersQuery()
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="rounded shadow p-8 bg-red-700 hover:bg-red-500 text-gray-100 font-semibold text-xl ">
                Happy Renga!
            </div>
            <div className="ml-4">
                {data?.users.map((user) => {
                    return <div className="uppercase text-green-800">{user.username}</div>
                })}
            </div>
        </div>
    )
}
