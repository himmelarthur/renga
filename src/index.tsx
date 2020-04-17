import { ApolloProvider } from '@apollo/react-hooks'
import * as Sentry from '@sentry/browser'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { client } from './client'
import './index.css'
import * as serviceWorker from './serviceWorker'
import './tailwind.css'

Sentry.init({
    environment: process.env.REACT_APP_SENTRY_ENV,
    dsn:
        'https://f80e05cbcee64135a0c28df600eabe64@o378128.ingest.sentry.io/5201075',
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
