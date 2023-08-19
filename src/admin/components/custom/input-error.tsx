import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import React from "react";
import { MultipleFieldErrors } from "react-hook-form";

type InputErrorProps = {
  errors?: { [x: string]: unknown };
  name?: string;
  className?: string;
};

const InputError = ({ errors, name, className }: InputErrorProps) => {
  if (!errors || !name) {
    return null;
  }

  return (
    <ErrorMessage
      name={name}
      errors={errors}
      render={({ message, messages }) => {
        return (
          <div
            className={clsx("text-rose-50 inter-small-regular mt-2", className)}
          >
            {messages ? (
              <MultipleMessages messages={messages} />
            ) : (
              <p>{message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

const MultipleMessages = ({ messages }: { messages: MultipleFieldErrors }) => {
  const errors = Object.entries(messages).map(([_, message]) => message);

  const displayedError = errors[0];
  const remainderErrors = errors.slice(1);

  return (
    <div className="flex items-center gap-x-1 cursor-default">
      <p>{displayedError}</p>
    </div>
  );
};

export default InputError;
