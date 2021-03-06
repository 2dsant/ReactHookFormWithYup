import React from 'react';
import { Button } from '../Button';
import { ControlledInput } from '../ControlledInput';
import { Container } from './styles';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const schema = yup.object({
  name: yup.string().required("Informe o seu nome"),
  email: yup.string().email("Email inválido").required("Informe o email"),
  password: yup.string().min(6, "A senha deve ter ao menos 6 digitos").required("Informe a senha"),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], "A senha de confirmação não confere.").required("Informe a senha")
})

export function Form() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  function handleUserRegister(data: FormData) {
    console.log(data);
  }

  return (
    <Container>
      <ControlledInput
        control={control}
        name='name'
        icon="user"
        placeholder="Nome"
        error={errors.name}
      />

      <ControlledInput
        control={control}
        name='email'
        icon="mail"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize='none'
        error={errors.email}
      />

      <ControlledInput
        control={control}
        name='password'
        icon="lock"
        placeholder="Senha"
        secureTextEntry
        error={errors.password}
      />

      <ControlledInput
        control={control}
        name='passwordConfirm'
        icon="lock"
        placeholder="Confirme a senha"
        secureTextEntry
        error={errors.passwordConfirm}
      />

      <Button
        title="Cadastrar"
        onPress={handleSubmit(handleUserRegister)}
      />
    </Container>
  )
}