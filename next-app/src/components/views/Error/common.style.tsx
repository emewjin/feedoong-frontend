import styled from 'styled-components'

import { colors } from 'styles/colors'
import { getTypographyStyles } from 'styles/fonts'
import Flex from 'components/common/Flex'

export const ContentWrapper = styled(Flex)`
  width: 100%;
  height: calc(100vh - 75px);
  background-color: ${colors.mainBG};
`

export const ContentContainer = styled(Flex)``

export const MainDescription = styled.p`
  ${getTypographyStyles('Headline1_B')}
`
