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
    </div>
))

export default RengaSubmissionSkeleton
