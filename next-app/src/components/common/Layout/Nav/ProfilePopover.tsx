import Image from 'next/image'
import { useQueryClient } from '@tanstack/react-query'

import Anchor from 'components/common/Anchor'
import Popover from 'components/common/Popover'
import { useGetUserProfile } from 'features/user/userProfile'
import { logoutAction } from 'features/auth/logout'
import { FEEDOONG_EXTENSION_URL } from 'constants/url'
import { useColorMode } from 'utils/hooks'

import Icons from 'assets/icons'

interface Props {
  children: JSX.Element
}

const ProfilePopover = ({ children }: Props) => {
  const { data: me } = useGetUserProfile()
  const client = useQueryClient()
  const { isDarkMode, toggleColorMode } = useColorMode()

  return (
    <Popover
      placement="bottom-start"
      render={() => (
        <Popover.Layout>
          <a
            target="_blank"
            href={FEEDOONG_EXTENSION_URL}
            rel="noreferrer"
            style={{
              textDecoration: 'none',
            }}
          >
            <Popover.Item
              icon={
                <Image
                  src={Icons.LogoDesktop}
                  width={20}
                  height={20}
                  alt="FAQ"
                  priority
                />
              }
            >
              피둥을 시작화면으로 하기
            </Popover.Item>
          </a>

          <Popover.Item
            onClick={toggleColorMode}
            icon={
              <Image
                src={isDarkMode ? Icons.LightMode : Icons.DarkMode}
                width={20}
                height={20}
                alt="로그아웃"
                priority
              />
            }
          >
            {`${isDarkMode ? '라이트' : '다크'} 모드로 보기`}
          </Popover.Item>

          <Anchor href={`/${me?.username}`}>
            <Popover.Item
              icon={
                <Image
                  src={Icons.SettingIcon}
                  width={20}
                  height={20}
                  alt="내 프로필"
                  priority
                />
              }
            >
              내 프로필
            </Popover.Item>
          </Anchor>

          <a
            target="_blank"
            href="https://oj8mm.notion.site/FAQ-081c373d745f411e91d47689c2bb53e3"
            rel="noreferrer"
            style={{
              textDecoration: 'none',
            }}
          >
            <Popover.Item
              icon={
                <Image
                  src={Icons.Thunder}
                  width={20}
                  height={20}
                  alt="FAQ"
                  priority
                />
              }
            >
              FAQ
            </Popover.Item>
          </a>

          <a
            target="_blank"
            href="https://discord.gg/jdvnSCjjSx"
            rel="noreferrer"
            style={{
              textDecoration: 'none',
            }}
          >
            <Popover.Item
              icon={
                <Image
                  src={Icons.SpeechBubble}
                  width={20}
                  height={20}
                  alt="FAQ"
                  priority
                />
              }
            >
              커뮤니티 참여하기
            </Popover.Item>
          </a>

          <Popover.Item
            onClick={() => logoutAction(client)}
            icon={
              <Image
                src={Icons.Close}
                width={20}
                height={20}
                alt="로그아웃"
                priority
              />
            }
          >
            로그아웃
          </Popover.Item>
        </Popover.Layout>
      )}
    >
      {children}
    </Popover>
  )
}

export default ProfilePopover
