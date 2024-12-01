import React from 'react';
import { Button } from 'primereact/button';
import { AiFillDelete } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { TbEdit } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

export const CommonButton = ({
  type = 'submit',
  className = '',
  title,
  disabled,
  label,
  icon,
  onClick,
  loading,
  bigButton,
  ...rest
}) => (
  <Button
    type={type}
    label={label}
    title={title}
    icon={icon}
    disabled={disabled}
    className={`${!bigButton ? 'p-button-sm' : ''} ${className}`}
    onClick={onClick}
    loading={loading}
    {...rest}
  />
);

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <CommonButton
      type="button"
      onClick={() => navigate(-1)}
      className="p-button-raised bg-gray-400 my-4 !p-button-sm"
      title="Back"
      label="Back"
      icon="pi pi-arrow-left"
    />
  );
};

const IconButton = ({ onClick, label, icon, className }) => (
  <CommonButton
    icon={icon}
    type="button"
    className={className}
    onClick={onClick}
    label={label}
  />
);

export const SearchButton = ({ loading, type = 'submit', onClick, label, className, icon }) => (
  <Button
    type={type}
    label={label}
    loading={loading}
    disabled={loading}
    className={`p-button-sm ${className}`}
    style={{ padding: '0.75rem' }}
    onClick={onClick}
    icon={icon || <BsSearch className="text-white text-lg mr-2" />}
  />
);

export const DeleteButton = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    label="Delete"
    icon={<AiFillDelete className="text-2xl text-red-500 hover:!text-red-600" />}
    className="rounded-md bg-rose-100 text-red-500 hover:!bg-rose-200 hover:!text-red-600"
  />
);

export const RejectButton = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    label="Reject"
    icon={<AiFillDelete className="text-2xl text-red-500 hover:!text-red-600" />}
    className="rounded-md bg-rose-100 text-red-500 hover:!bg-rose-200 hover:!text-red-600"
  />
);

export const EditButton = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    label="Edit"
    icon={<TbEdit className="text-xl text-emerald-500 hover:!text-emerald-600" />}
    className="rounded-md bg-emerald-100 text-emerald-500 hover:!bg-emerald-200 hover:!text-emerald-600"
  />
);
