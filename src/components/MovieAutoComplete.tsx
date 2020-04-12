import moment from 'moment'
import React, { useCallback, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import classNames from 'classnames'
import throttle from 'lodash.throttle'

export interface MovieResult {
    id: number
    title: string
    release_date: string
    popularity: number
}

interface Props {
    movie: MovieResult | undefined
    placeholder?: string
    onMovieChange?: (movie: MovieResult | undefined) => void
    className?: string
}

const MovieAutocomplete: React.FC<Props> = ({
    placeholder,
    movie,
    onMovieChange,
    className,
}) => {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<MovieResult[]>([])
    const searchMovies = useCallback(async (query: string) => {
        if (!query) {
            setSuggestions([])
            return
        }
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=ae9fe5055de5c1c32a0c4818ce4671f9&language=en-US&query=${query}&page=1&include_adult=false`
        )
        const body: { results: MovieResult[] } = await response.json()
        setSuggestions(
            body.results.sort((a, b) => (a.popularity > b.popularity ? -1 : 1))
        )
    }, [])
    const debouncedSearch = throttle(searchMovies, 1000)
    const handleChange = useCallback(debouncedSearch, [])

    return (
        <Autosuggest
            theme={{
                container: classNames(
                    'relative w-full text-gray-900',
                    className
                ),
            }}
            inputProps={{
                value: query,
                placeholder,
                onChange: (event, { newValue }) => setQuery(newValue),
            }}
            onSuggestionSelected={(_, { suggestion }) => {
                onMovieChange?.(suggestion)
                setQuery('')
            }}
            getSuggestionValue={(suggestion) => suggestion.title}
            suggestions={suggestions}
            renderInputComponent={(props) =>
                movie === undefined ? (
                    // @ts-ignore
                    <input
                        {...props}
                        className="appearance-none p-6 border-2 border-red-400 rounded h-10 w-full text-xl font-bold"
                    />
                ) : (
                    <div className="p-3 border border-red-500 rounded w-full text-xl font-bold relative flex items-center mr-16">
                        {movie.title} (
                        {moment(movie.release_date).format('YYYY')})
                        <div
                            onClick={() => onMovieChange?.(undefined)}
                            className="uppercase text-red-700 absolute right-0 cursor-pointer text-sm mr-2"
                        >
                            change
                        </div>
                    </div>
                )
            }
            onSuggestionsFetchRequested={(request) => {
                handleChange(request.value)
            }}
            highlightFirstSuggestion
            renderSuggestionsContainer={({ containerProps, children }) => {
                const { ref, ...restContainerProps } = containerProps
                return query && !movie && suggestions.length ? (
                    <div
                        ref={ref}
                        {...restContainerProps}
                        className="bg-white border border-gray-300 overflow-auto absolute z-10 w-full"
                        style={{ maxHeight: '300px' }}
                    >
                        {children}
                    </div>
                ) : undefined
            }}
            onSuggestionsClearRequested={() => {
                setSuggestions([])
            }}
            renderSuggestion={(result, { isHighlighted }) => (
                <div
                    className={classNames(
                        'text-gray-800 py-3 px-6 hover:bg-gray-200 cursor-pointer',
                        { 'bg-gray-200': isHighlighted }
                    )}
                    key={result.id}
                    onClick={() => {
                        onMovieChange?.(result)
                        setSuggestions([])
                        setQuery('')
                    }}
                >
                    {result.title} ({moment(result.release_date).format('YYYY')}
                    )
                </div>
            )}
        ></Autosuggest>
    )
}
export default MovieAutocomplete
