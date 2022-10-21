import Image from 'next/image'

import type { Item } from 'types/feeds'
import Icons from 'assets/icons'
import { getFormatDate } from 'utils'

import { Container, Title } from './CardType.style'
import { copyToClipboard } from './FeedItem.utils'
import Flex from '../Flex'
import Divider from '../Divider'

import * as S from './FeedItem.style'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likeItem, submitViewedItem } from 'services/feeds'
import Anchor from '../Anchor'
import { cacheKeys } from 'services/cacheKeys'
import Toast from '../Toast'

interface Props {
  item: Item
}

const CardType = ({ item }: Props) => {
  const client = useQueryClient()
  const { mutate: handleLike } = useMutation(
    cacheKeys.likeItem(item.id),
    likeItem,
    {
      onSuccess: (data) => {
        client.invalidateQueries(['feeds'])
        client.invalidateQueries(['likedItems'])
        let toastMessage = '게시물이 저장되었습니다.'
        if (!data.isLiked) {
          toastMessage = '게시물 저장이 해제되었습니다.'
        }
        Toast.show({ content: toastMessage })
      },
    }
  )
  const { mutate: handleRead } = useMutation(
    cacheKeys.viewItem(item.id),
    submitViewedItem
  )

  return (
    <Container>
      <S.Body>
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
        <S.ThumbnailEmpty />
      </S.Body>
      <Divider />
      <S.Footer>
        <S.PostMeta>
          <Image
            alt="네이버 로고"
            src={Icons.NaverIcon}
            width={20}
            height={20}
          />
          <S.Author>네이버 뉴스</S.Author>
          <S.Date>{getFormatDate(item.publishedAt, 'YYYY.MM.DD')}</S.Date>
        </S.PostMeta>
        <Flex gap={12}>
          <S.CopyLinkButton
            alt="링크 복사"
            src={Icons.Link}
            width={16}
            height={16}
            onClick={() => copyToClipboard(item.link)}
          />
          <S.Bookmark
            alt="북마크"
            src={item.isLiked ? Icons.Bookmark : Icons.BookmarkDeactive}
            width={16}
            height={16}
            onClick={() => handleLike(String(item.id))}
          />
        </Flex>
      </S.Footer>
    </Container>
  )
}

export default CardType
