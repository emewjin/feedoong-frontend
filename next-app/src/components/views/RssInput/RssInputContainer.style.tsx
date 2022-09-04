import styled from 'styled-components'
import { colors } from 'styles/colors'
import { getTypographyStyles } from 'styles/fonts'

export const Container = styled.div`
  background-color: ${colors.gray200};
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const InputWrapper = styled.div<{ isValid?: boolean }>`
  display: flex;
  justify-content: space-between;
  width: 472px;
  height: 48px;
  margin: 40px 0;
  padding: 13px 20px;
  border: ${({ isValid = true }) => !isValid && `1px solid ${colors.error}`};
  border-radius: 100px;
  background-color: ${colors.white};

  &:focus-within {
    border: 1px solid
      ${({ isValid = true }) => (isValid ? colors.black : colors.error)};
  }
`

export const Input = styled.input`
  all: unset;
  width: 100%;

  ::placeholder {
    ${getTypographyStyles('Headline3_M')};
    color: ${colors.gray500};
  }
`

export const AddButton = styled.button<{ isValid?: boolean }>`
  all: unset;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isValid }) =>
    isValid === true ? colors.black : colors.gray500};
  cursor: pointer;
`
