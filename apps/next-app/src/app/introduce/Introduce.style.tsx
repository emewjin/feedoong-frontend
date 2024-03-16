'use client'
import styled from 'styled-components'

import Flex from 'components/common/Flex'
import { mediaQuery } from 'styles/mediaQuery'

export const Wrapper = styled.div`
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;

  ${mediaQuery.tablet`
    padding: 40px 20px;
  `}
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 860px;
`

export const HeaderTitle = styled.h1`
  display: inline-block;

  color: var(--color-gray-1000, #2a2528);
  font-family: Satoshi-Bold;
  font-size: 60px;
  font-weight: 700;
  line-height: normal;

  word-break: break-all;

  ${mediaQuery.tablet`
    color: var(--color-gray-1000, #2A2528);
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Satoshi-Bold;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
  `}
`

export const PinkFeedoong = styled.div`
  display: inline-block;
  color: var(--color-primary-500, #d4608f);
  font-family: Satoshi-Bold;
  font-size: 60px;
  font-weight: 700;

  ${mediaQuery.tablet`
    font: inherit;
    color: inherit;
  `}
`

export const FeatureWrapper = styled(Flex)`
  flex-direction: column;
  gap: 200px;

  ${mediaQuery.tablet`
    gap: 100px;
  `}
`

export const FeatureCard = styled.div`
  border-radius: 16px;
  background: var(--color-surface-container-lowest);
  padding: 10px;

  ${mediaQuery.tablet`
    width: 100%;
  `}
`

export const CardTitle = styled.h2`
  color: var(--color-font-primary, #423c3f);
  font-family: Satoshi-Bold;
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;

  ${mediaQuery.tablet`
    color: var(--color-font-primary, #423C3F);
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Satoshi-Bold;
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 39px */
  `}
`

export const CardSubTitle = styled.h3`
  color: var(--color-font-primary, #423c3f);
  font-family: Satoshi-Bold;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;

  ${mediaQuery.tablet`
    color: var(--color-font-primary, #423C3F);
    font-family: Satoshi-Bold;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
  `}
`

export const CardDescription = styled.p`
  color: var(--color-font-secondary, #71646a);
  font-family: 'Pretendard Variable';
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;

  ${mediaQuery.tablet`
    color: var(--color-font-secondary, #71646A);
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  `}
`

export const ImageWrapper = styled.div`
  padding: 50px 0 0;
  margin-bottom: 150px;
  max-width: 850px;
  position: relative;

  ${mediaQuery.tablet`
    margin-bottom: 100px;
  `}
`

export const IntroduceHeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

export const StartFeedoongDescription = styled.p`
  color: var(--color-font-secondary, #71646a);
  text-align: center;
  font-family: 'Pretendard Variable';
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-size: 20px;
  font-weight: 500;
  line-height: 150%;
`
