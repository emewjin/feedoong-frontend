import { useRouter } from 'next/router'

import type { Item } from 'types/feeds'
import { getFormatDate, getWellKnownChannelImg } from 'utils'
import { copyToClipboard, getDiameterByType } from './FeedItem.utils'
import Flex from '../Flex'
import Divider from '../Divider'
import Anchor from '../Anchor'
import useToggleLike from './hooks/useToggleLike'
import useReadPost from './hooks/useReadPost'
import LogoIcon from '../LogoIcon'

import * as S from './FeedItem.style'
import { Container, Title } from './CardType.style'

import Icons from 'assets/icons'

interface Props {
  type: 'card' | 'recommend/card'
  item: Item | Exclude<Item, 'isViewed' | 'isLiked'>
}

/**
 * TODO: 북마크 상태 변경 시 깜빡임 문제
 * @param item
 * @constructor
 */

const CardType = ({ type, item }: Props) => {
  const { handleLike } = useToggleLike(item)
  const { handleRead } = useReadPost(item)

  const { pathname } = useRouter()
  const isDetailPage = pathname === '/channels/[id]'

  return (
    <Container>
      <S.Body>
        <Flex gap={10} justify="between" style={{ flex: 'auto' }}>
          <S.BodyWrapper>
            <Anchor
              href={item.link}
              target="_blank"
              onClick={() => handleRead(item.id)}
            >
              <Title>{item.title}</Title>
            </Anchor>
            <Anchor
              href={item.link}
              target="_blank"
              onClick={() => handleRead(item.id)}
            >
              <S.Contents>{item.description}</S.Contents>
            </Anchor>
          </S.BodyWrapper>
          {item.imageUrl && (
            <S.Thumbnail src={item.imageUrl} width={80} height={80} />
          )}
        </Flex>
      </S.Body>
      <Divider />
      <S.Footer>
        <S.PostMeta>
          <LogoIcon
            diameter={getDiameterByType(type)}
            src={item.channelImageUrl ?? getWellKnownChannelImg(item.link)}
          />
          {isDetailPage ? (
            <S.Author href={item.link} target="_blank">
              {item.channelTitle}
            </S.Author>
          ) : (
            <S.Author href={'/channels/' + item.channelId.toString()}>
              {item.channelTitle}
            </S.Author>
          )}
          <S.Date>{getFormatDate(item.publishedAt, 'YYYY.MM.DD')}</S.Date>
        </S.PostMeta>
        <Flex gap={12} align="center">
          <S.CopyLinkButton
            alt="링크 복사"
            src={Icons.Link}
            width={16}
            height={16}
            onClick={() => copyToClipboard(item.link)}
            priority
          />
          <S.Bookmark
            alt="북마크"
            src={item.isLiked ? Icons.Bookmark : Icons.BookmarkDeactive}
            width={16}
            height={16}
            onClick={() => handleLike(String(item.id))}
            priority
          />
        </Flex>
      </S.Footer>
    </Container>
  )
}

export default CardType
