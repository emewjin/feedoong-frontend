import { AxiosError } from 'axios'
import Image from 'next/image'

import type { PrivateSubscription, Subscription } from 'types/subscriptions'
import Flex from '../Flex'
import Anchor from '../Anchor'
import { getWellKnownChannelImg } from 'utils'
import PrivateFeedItemPopover from './Popovers/PrivateFeedItemPopover'
import LogoIcon from '../LogoIcon'
import { getDiameterByType } from './FeedItem.utils'
import { submitRssUrl } from 'services/feeds'
import Toast from '../Toast'
import { useGetUserProfile } from 'features/user/userProfile'
import { useCheckLoginModal } from 'features/auth/checkLogin'
import { ErrorBody, getAxiosError } from 'utils/errors'

import { AddButton, Container, Title, Url } from './SubscriptionType.style'

import Icons from 'assets/icons'

type Props =
  | {
      type: 'subscription'
      item: Subscription
    }
  | {
      type: 'subscription/private'
      item: PrivateSubscription
    }

const SubscriptionType = ({ type, item }: Props) => {
  const { data: user } = useGetUserProfile()
  const { handleOpen, renderModal } = useCheckLoginModal()

  const addChannel = async (item: Subscription) => {
    if (!user) {
      return handleOpen()
    }

    Toast.show({
      type: 'promise',
      fetchFn: submitRssUrl({ url: item.url, feedUrl: item.feedUrl }),
      content: '새로운 채널이 추가되었어요!',
      promiseContent: {
        loading: '채널을 등록중이에요',
        error: (err: AxiosError<ErrorBody, any>) =>
          `채널 추가에 실패했어요 😅 ${getAxiosError(err).message}`,
      },
      option: { duration: 3000 },
    })
  }

  return (
    <Container>
      <Flex gap={12}>
        <LogoIcon
          diameter={getDiameterByType(type)}
          src={item.imageUrl ?? getWellKnownChannelImg(item.url)}
        />
        <Flex direction="column" style={{ width: '100%' }}>
          <Flex
            align="center"
            justify="between"
            gap={8}
            style={{ width: '100%' }}
          >
            <Anchor
              target={type === 'subscription' ? '_blank' : '_self'}
              href={
                type === 'subscription'
                  ? item.url
                  : '/channels/' + item.id.toString()
              }
            >
              <Title>{item.title}</Title>
            </Anchor>
            {type === 'subscription/private' ? (
              <PrivateFeedItemPopover item={item as Subscription} />
            ) : (
              <AddButton onClick={() => addChannel(item)}>
                <Image
                  src={Icons.AddMono}
                  width={20}
                  height={20}
                  alt="채널 추가"
                  priority
                />
              </AddButton>
            )}
          </Flex>
          <Anchor href={item.url} target="_blank" style={{ width: '90%' }}>
            <Url>
              {type === 'subscription/private' ? item.description : item.url}
            </Url>
          </Anchor>
        </Flex>
      </Flex>
      {renderModal()}
    </Container>
  )
}

export default SubscriptionType
