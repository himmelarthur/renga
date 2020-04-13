import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './tailwind.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import * as Sentry from '@sentry/browser'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './client'

Sentry.init({
    dsn: 'https://dbbff303002a4521a2de4c7bffac69bb@sentry.io/1841359',
})

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
