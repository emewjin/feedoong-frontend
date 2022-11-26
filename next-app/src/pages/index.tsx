import type { GetServerSideProps, NextPage } from 'next'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import { parseCookies } from 'nookies'

import RssInputView from 'components/views/RssInput'
import FeedsContainerView from 'components/views/Feeds/FeedsContainer'
import { getUserInfo, UserProfile } from 'services/auth'
import { CACHE_KEYS } from 'services/cacheKeys'
import { AccessToken } from 'constants/auth'
import api from 'services/api'

const Home: NextPage = () => {
  useQuery<UserProfile>(CACHE_KEYS.me, getUserInfo)

  return (
    <>
      <Head>
        <title>홈 | 인사이트가 피둥피둥</title>
      </Head>
      <RssInputView />
      <FeedsContainerView />
    </>
  )
}

export default Home

export const getServerSideProps = async (context: GetServerSideProps) => {
  try {
    const cookies = parseCookies(context as typeof parseCookies['arguments'])

    api.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${cookies[AccessToken]}`

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery<UserProfile>(CACHE_KEYS.me, getUserInfo)
    // TODO: feed도 prefetch 해야함

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  } catch (error) {
    return {
      props: {},
    }
  }
}
