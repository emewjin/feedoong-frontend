import Image from 'next/legacy/image'

import Flex from 'components/common/Flex'
import Input from './Input'
import { isRssUrlValid } from './RssInputContainer.utils'
import { useRssDirectInputModal, useRssInput } from './hooks'

import * as S from './RssInputContainer.style'

import Icons from 'assets/icons'

const RssInputContainer = () => {
  const { handleOpen, renderModal } = useRssDirectInputModal()
  const { url, onSubmit, handleInput, isSubmitting } = useRssInput()

  const isSubmitEnabled = !isSubmitting && isRssUrlValid(url)
  const isInvalidUrl = !!url && isRssUrlValid(url) === false

  return (
    <S.Container>
      <S.Form onSubmit={(e) => isSubmitEnabled && onSubmit(e)}>
        <Flex justify="center" align="center" style={{ position: 'relative' }}>
          <Input
            name="url"
            placeholder="URL을 추가해서 피드로 모아보세요!"
            isError={isInvalidUrl}
            onChange={handleInput}
            value={url}
            renderInputIcon={({ selectedValue, clearValue }) => (
              <Image
                style={{ cursor: 'pointer' }}
                alt={selectedValue ? '삭제 버튼' : 'RSS 직접 추가'}
                src={selectedValue ? Icons.CancelCircle : Icons.RssCircle}
                width={24}
                height={24}
                onClick={selectedValue ? clearValue : handleOpen}
              />
            )}
          />
          <S.AddButton
            type="submit"
            isValid={isRssUrlValid(url)}
            disabled={!isSubmitEnabled}
          >
            <Image
              alt="add 버튼"
              // TODO: svg 컴포넌트로 변경
              src={Icons.Add}
              width={16}
              height={16}
              priority
            />
          </S.AddButton>
          {isInvalidUrl && (
            <S.Error>
              RSS 추가를 할 수 없는 형식의 링크입니다.{' '}
              <S.UnderLine onClick={handleOpen}>RSS 링크를 찾는 법</S.UnderLine>
              을 참고해주세요.
            </S.Error>
          )}
        </Flex>
      </S.Form>
      {renderModal()}
    </S.Container>
  )
}

export default RssInputContainer
