import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { Container, Icon, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

export const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const { fieldName, defaultValue = '', registerField } = useField(name);

  const inputRef = useRef<any>(null);
  const valueRef = useRef<InputValueReference>({ value: defaultValue });

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
    <Container>
      <Icon name={icon} size={20} color="#666360" />

      <TextInput
        ref={inputRef}
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={value => {
          valueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};
