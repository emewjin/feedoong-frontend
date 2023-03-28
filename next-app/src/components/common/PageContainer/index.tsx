import type { ReactNode } from 'react'
import styled from 'styled-components'

import { colors } from 'styles/colors'

interface Props {
  children: ReactNode
  padding?: string
  backgroundColor?: string
}

const PageContainer = ({ children }: Props) => {
  return <Container>{children}</Container>
}

export default PageContainer

const Container = styled.div<{
  padding?: string
  backgroundColor?: string
}>`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: ${({ padding }) => padding || '60px 0 80px'};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || colors.mainBG};
`
