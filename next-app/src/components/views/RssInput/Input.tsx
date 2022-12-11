import { forwardRef, type ChangeEvent } from 'react'

import { useControlled } from './hooks'

import * as S from './RssInputContainer.style'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string
  defaultValue?: string
  isError?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement> | string) => void
  renderInputIcon?: ({
    selectedValue,
    clearValue,
  }: {
    selectedValue: string | undefined
    clearValue: VoidFunction
  }) => React.ReactNode
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    { value, defaultValue, isError, onChange, renderInputIcon, ...rest },
    forwardedRef
  ) => {
    const [selectedValue, setSelectedValue] = useControlled<string | undefined>(
      {
        controlled: value,
        default: defaultValue,
      }
    )

    const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e)
      setSelectedValue(e.target.value)
    }

    const clearValue = () => {
      onChange('')
      setSelectedValue('')
    }

    return (
      <S.InputWrapper isError={isError}>
        <S.Input
          {...rest}
          ref={forwardedRef}
          onChange={_onChange}
          value={selectedValue}
        />
        {renderInputIcon?.({ selectedValue, clearValue })}
      </S.InputWrapper>
    )
  }
)
Input.displayName = 'Input'

export default Input
