'use client'

import { Response, Article as TArticle } from '@/app/types'
import { Article } from '@/app/ui/components'
import { API } from '@/app/utils'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import React from 'react'

const Page = () => {
  const [query, setQuery] = React.useState('')
  const [articles, setArticles] = React.useState<TArticle[]>()

  React.useEffect(() => {
    ;(async () => {
      await API.articles.search(
        query,
        (data: Response<TArticle>) => setArticles(data.results),
        (error) => console.log(error),
      )
    })()
  }, [query])

  return (
    <>
      <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 md:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
              Search
            </h1>

            <p className="mt-6 text-xl text-neutral-600">
              Explore the universe of our articles.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <form>
            <div className="relative mt-6">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Type here to search..."
                aria-label="Type here to search..."
                className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
                type="text"
              />

              <div className="absolute inset-y-1 right-1 flex justify-end">
                <button
                  aria-label="Search"
                  className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-neutral-50 transition hover:bg-neutral-800"
                >
                  <MagnifyingGlassIcon className="size-6 fill-neutral-50" />
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6 space-y-24 lg:space-y-32">
            {articles?.map((article) => (
              <Article key={article.id} {...article} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
