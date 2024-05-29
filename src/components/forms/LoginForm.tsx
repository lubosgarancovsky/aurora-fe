"use client";
import React from "react";
import { Button, Input } from "../core";
import { useLoginForm } from "./useLogin";

interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const { login, error } = useLoginForm();

  return (
    <form
      className="flex flex-col gap-4 bg-default-900 p-4 border border-border rounded-md"
      action={login}
    >
      <Input
        type="email"
        id="email-input"
        label="E-mail address"
        name="email"
        required
        fullWidth
        // quick login
        value="john.doe@gmail.com"
      />
      <Input
        type="password"
        id="psw-input"
        label="Password"
        name="password"
        required
        fullWidth
        // quick login
        value="123456"
      />
      <Button fullWidth type="submit" color="success">
        Login
      </Button>
    </form>
  );
};
