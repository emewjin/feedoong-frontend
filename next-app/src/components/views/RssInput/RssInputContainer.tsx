import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

import Input from './Input'
import Icons from 'assets/icons'
import * as S from './RssInputContainer.style'
import { checkURLValid } from 'utils'

const RssInputContainer = () => {
  const [url, setUrl] = useState<string | undefined>(undefined)

  const handleInput = (e: ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === 'string') {
      setUrl(e)
      return
    }
    setUrl(e.target.value)
  }

  const isRssUrlValid = ((_url?: string) => {
    if (_url === undefined) {
      return _url
    }
    return checkURLValid(_url)
  })(url)

  return (
    <S.Container>
      <S.Wrapper>
        <Input isValid={isRssUrlValid} onChange={handleInput} />
        <S.AddButton isValid={isRssUrlValid}>
          <Image alt="add 버튼" src={Icons.Add} width={20} height={20} />
        </S.AddButton>
      </S.Wrapper>
      {isRssUrlValid === false && (
        <S.Error>
          RSS 추가를 할 수 없는 형식의 링크입니다.{' '}
          <S.UnderLine>RSS 링크를 찾는 법</S.UnderLine>을 참고해주세요.
        </S.Error>
      )}
    </S.Container>
  )
}

export default RssInputContainer
