import Image from 'next/image'
import styled from 'styled-components'

import { colors } from 'styles/colors'
import { getTypographyStyles } from 'styles/fonts'
import { mediaQuery } from 'styles/mediaQuery'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 60px;
  background-color: ${colors.mainBG};
`

export const Contents = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 12px;
  max-width: 640px;
  border-radius: 4px;
  margin: 0 auto;

  ${mediaQuery.tablet`
    padding: 0px 20px;
  `}
`

export const Header = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 60px;
`

export const UserImage = styled(Image)`
  width: 72px;
  height: 72px;
  border-radius: 50%;
`

export const NickName = styled.span`
  ${getTypographyStyles('Headline1_B')}
  color: ${colors.gray900};
`

export const FeedoongUrl = styled.span`
  ${getTypographyStyles('Body1_M')}
  color: ${colors.gray500}
`
