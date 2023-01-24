import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'

import Flex from 'components/common/Flex'
import FeedItem from 'components/common/FeedItem/FeedItem'
import * as S from 'components/views/MyPost/PostContainer.style'
import { getChannel } from 'services/feeds'
import { CACHE_KEYS } from 'services/cacheKeys'
import Paging from 'components/common/Paging'
import { SkeletonCardType } from 'components/common/Skeleton'
import { ITEMS_PER_PAGE } from '../MyPost/PostContainer.const'
import { getWellKnownChannelImg } from 'utils'

function PostContainer() {
  const { query } = useRouter()
  const id = query.id as string

  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading } = useQuery(
    [CACHE_KEYS.likedItems, { page: currentPage, channel: id }],
    () => getChannel(id, currentPage),
    { enabled: !!id }
  )

  const totalPage = data ? Math.ceil(data.totalCount / ITEMS_PER_PAGE) : 1

  const isChannelProfileImageExist =
    data?.items[0].channelImageUrl ||
    getWellKnownChannelImg(data?.items[0].link ?? '')

  return (
    <S.Container>
      <S.FeedWrapper>
        <S.Header>
          <S.TitleWrapper>
            <S.Title>
              {isLoading ? (
                <Skeleton width={100} />
              ) : (
                <Flex align="center" gap={8}>
                  {isChannelProfileImageExist && (
                    <img
                      alt="채널 로고"
                      src={
                        data?.items[0].channelImageUrl ??
                        getWellKnownChannelImg(data?.items[0].link ?? '')
                      }
                      width={20}
                      height={20}
                      style={{ borderRadius: '50%' }}
                    />
                  )}
                  {data?.items[0]?.channelTitle ?? ''}
                </Flex>
              )}
            </S.Title>
          </S.TitleWrapper>
        </S.Header>
        <S.CardContainer>
          {isLoading
            ? Array.from({ length: 10 }).map((_, idx) => {
                return <SkeletonCardType key={idx} />
              })
            : data?.items.map((item) => (
                <FeedItem key={item.id} type="card" item={item} />
              ))}
        </S.CardContainer>
        <Flex justify="center" style={{ width: '100%', padding: '44px 0' }}>
          <Paging
            totalPage={totalPage}
            currentPage={currentPage}
            movePage={(page: number) => setCurrentPage(page)}
          />
        </Flex>
      </S.FeedWrapper>
    </S.Container>
  )
}

export default PostContainer
