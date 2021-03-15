import { useField } from '@unform/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextInputProps } from 'react-native';
import { Container, Icon, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: Record<string, unknown>;
}

interface InputValueReference {
  value: string;
}

export const Input: React.FC<InputProps> = ({
  name,
  icon,
  containerStyle = {},
  ...rest
}) => {
  const {
    fieldName,
    defaultValue = '',
    error,
    registerField,
    clearError,
  } = useField(name);

  const inputRef = useRef<any>(null);
  const valueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleOnFocus = useCallback((): void => {
    setIsFocused(true);
  }, []);

  const handleOnBlur = useCallback((): void => {
    setIsFocused(false);

    if (valueRef.current?.value) {
      setIsFilled(true);

      clearError();
    } else {
      setIsFilled(false);
    }
  }, [clearError]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: valueRef.current,
      path: 'value',
      setValue(_, value: string) {
        valueRef.current.value = value;
        inputRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        valueRef.current.value = '';
        inputRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      hasError={Boolean(error)}
      isFocused={isFocused}
    >
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />

      <TextInput
        ref={inputRef}
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onChangeText={value => {
          valueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};
