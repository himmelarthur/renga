import React, { memo } from 'react'
import MovieAutocomplete from '../MovieAutoComplete'
import { Emoji } from 'emoji-mart'

const RengaSubmissionSkeleton = memo(() => (
    <div className="rounded p-4 bg-gray-100 flex flex-col">
        <div className="w-full text-3xl font-bold text-center"></div>
        <div className="w-full flex justify-center invisible">
            {['santa', 'santa', 'santa'].map((e, index) => {
                return (
                    <span className="mx-2" key={index}>
                        <Emoji native emoji={e} size={48} />
                    </span>
                )
            })}
        </div>
        <div className="text-gray-00 my-4 invisible">
            <Emoji size={16} native emoji={'painter'}></Emoji> Posted by{' '}
            <span className="font-semibold invisible"></span>
        </div>
        <MovieAutocomplete
            movie={undefined}
            onMovieChange={() => {}}
            placeholder="You guess"
        />
        <button
            className="p-4 text-gray-100 rounded mt-4 w-full bg-green-500 opacity-50"
            onClick={() => {}}
        >
            Submit
        </button>
        <div className="h-px bg-gray-300"></div>
    </div>
))

export default RengaSubmissionSkeleton
