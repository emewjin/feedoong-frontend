import styled from 'styled-components'
import Image from 'next/image'

import { colors } from 'styles/colors'
import { getTypographyStyles } from 'styles/fonts'
import { mediaQuery } from 'styles/mediaQuery'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${colors.mainBG};
`

export const Contents = styled.div`
  width: 650px;
  margin: 0 auto;
  padding-bottom: 40px;

  ${mediaQuery.mobileL`
    width: 100%;
    padding: 40px 24px;
  `}
`

export const PageTitle = styled.p`
  ${getTypographyStyles('Headline2_B')};
  color: var(--color-gray-900);
  margin-bottom: 60px;
`

export const ProfileImage = styled(Image)`
  margin: 8px 0 30px;
  border-radius: 50%;
`

export const Item = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  .label {
    ${getTypographyStyles('Headline3_B')}
    color: var(--color-gray-900);
  }
  .desc {
    ${getTypographyStyles('Body1_M')}
    color: var(--color-gray-700);
  }

  ${mediaQuery.mobileL`
     flex-direction: column;
     align-items: flex-start;
  `}
`

export const SubLabel = styled.span`
  ${getTypographyStyles('Body1_B')}
  color: ${colors.gray600};
`

export const BorderLine = styled.div`
  border: 1px solid ${colors.gray400};
  margin: 30px 0;
`

export const ButtonContainer = styled.div`
  gap: 10px;
  display: flex;
  margin-top: 60px;
  justify-content: flex-end;
`

export const FeedoongUrl = styled.span`
  ${getTypographyStyles('Body1_M')}
  color: ${colors.gray500};
`

export const TabWrapper = styled.div`
  margin-bottom: 24px;
`

export const InfoItemContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 24px;

  ${mediaQuery.mobileL`
    flex-direction: column;
  `}
`

export const Label = styled.span`
  ${getTypographyStyles('Body1_B')}
  color: var(--color-font-secondary);
`
