import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import FeedItem from 'components/common/FeedItem'
import Icons from 'assets/icons'
import * as S from './FeedsContainer.style'
import { getFeeds } from 'services/feeds'
import { CACHE_KEYS } from 'services/cacheKeys'

const FeedsContainer = () => {
  const { data, isLoading } = useQuery(CACHE_KEYS.feeds, getFeeds)

  const [selectedCategory, setSelectedCategory] = useState<
    'home' | 'recommended'
  >('home')
  const [selectedViewType, setSelectedViewType] = useState<'card' | 'grid'>(
    'card'
  )

  const isGridView = selectedViewType === 'grid'

  return (
    <S.Container>
      <S.FeedWrapper>
        <S.Header>
          <S.TitleWrapper>
            <S.Title
              isSelected={selectedCategory === 'home'}
              onClick={() => setSelectedCategory('home')}
            >
              홈 피드
            </S.Title>
          </S.TitleWrapper>
          <S.SelectViewType>
            <S.ViewType
              alt="카드 뷰"
              src={Icons[!isGridView ? 'CardViewIcon' : 'CardViewIconDeactive']}
              isSelected={!isGridView}
              onClick={() => setSelectedViewType('card')}
              width={16}
              height={16}
            />
            <S.ViewType
              alt="그리드 뷰"
              src={Icons[isGridView ? 'GridViewIcon' : 'GridViewIconDeactive']}
              isSelected={isGridView}
              onClick={() => setSelectedViewType('grid')}
              width={16}
              height={16}
            />
          </S.SelectViewType>
        </S.Header>
        <S.CardContainer type={selectedViewType}>
          {isLoading
            ? '로딩 스피너'
            : data?.items.map((item) => {
                return (
                  <FeedItem key={item.id} type={selectedViewType} item={item} />
                )
              })}
        </S.CardContainer>
      </S.FeedWrapper>
    </S.Container>
  )
}

export default FeedsContainer
