import React from 'react';

interface CheckboxProps {
  /**
   * checkbox id 설정
   */
  id?: string;

  /**
   * checkbox name 설정
   */
  name?: string;

  /**
   * checked 된 상태 표시
   */
  checked?: boolean;

  /**
   * label이 가리키는 대상 설정
   */
  htmlFor?: string;

  /**
   * label 이름 설정
   */
  labelName?: string;

  /**
   * border 설정
   */
  border?: string;
}

export const Checkbox = ({
  id,
  name,
  checked,
  htmlFor,
  labelName,
  border,
  ...props
}: CheckboxProps) => {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        style={{
          border,
        }}
      />
      <label htmlFor={htmlFor}>{labelName}</label>
    </>
  );
};
