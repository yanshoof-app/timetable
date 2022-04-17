import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Wrapper } from './types'

export interface IDocumentHeadProps extends Wrapper {
  title?: string
}

export default function DocumentHead({ title, children }: IDocumentHeadProps) {
  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      {children}
    </>
  )
}

export function buildTitleGetStaticProps(title: string): GetStaticProps {
  return () => ({
    props: {
      title,
    },
  })
}
