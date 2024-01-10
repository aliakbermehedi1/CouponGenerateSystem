import React, { ReactNode } from 'react';
import { Button, ButtonProps } from 'primereact/button';
import { AiFillDelete } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { TbEdit } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

interface CommonButtonProps extends ButtonProps {
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  title?: string;
  disabled?: boolean;
  label?: string; // Ensure label is explicitly typed as string
  icon?: ReactNode;
  onClick?: () => void;
  loading?: boolean;
  bigButton?: boolean;
}

export const CommonButton: React.FC<CommonButtonProps> = ({
  type = 'submit',
  className,
  title,
  disabled,
  label,
  icon,
  onClick,
  loading,
  bigButton,
  ...rest
}) => {
  return (
    <Button
      type={type}
      label={label}
      title={title}
      icon={icon}
      disabled={disabled}
      className={`${!bigButton && 'p-button-sm'} ${className}`}
      onClick={onClick}
      loading={loading}
      {...rest}
    />
  );
};

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <CommonButton
        type="button"
        onClick={() => navigate(-1)}
        className="p-button-raised bg-gray-400 my-4 !p-button-sm"
        title="Back"
        label="Back"
        icon="pi pi-arrow-left"
        color="p-button-raised"
      />
    </div>
  );
};

interface SearchButtonProps {
  loading?: boolean;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  label?: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export const SearchButton: React.FC<SearchButtonProps> = ({
  loading,
  type,
  onClick,
  label,
  className,
  icon,
}) => {
  return (
    <Button
      type={type || 'submit'}
      label={typeof label === 'string' ? label : undefined}
      loading={loading}
      disabled={loading}
      className={className}
      style={{ padding: '0.75rem' }}
      onClick={onClick}
      icon={icon || <BsSearch className={`text-white text-lg mr-2 `} />}
    />
  );
};

interface DeleteButtonProps {
  onClick?: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <CommonButton
      icon={
        <AiFillDelete className="text-2xl rounded-md p-mr-2 text-red-500 hover:!text-red-600" />
      }
      type="button"
      className="rounded-md p-mr-2 bg-rose-100 text-red-500 hover:!bg-rose-200 hover:!text-red-600"
      onClick={onClick}
      label="Delete"
    />
  );
};

interface RejectButtonProps {
  onClick?: () => void;
}

export const RejectButton: React.FC<RejectButtonProps> = ({ onClick }) => {
  return (
    <CommonButton
      icon={
        <AiFillDelete className="text-2xl rounded-md p-mr-2 text-red-500 hover:!text-red-600" />
      }
      type="button"
      className="rounded-md p-mr-2 bg-rose-100 text-red-500 hover:!bg-rose-200 hover:!text-red-600"
      onClick={onClick}
      label="Reject"
    />
  );
};

interface EditButtonProps {
  onClick?: () => void;
}

export const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <div>
      <CommonButton
        icon={
          <TbEdit className="text-xl rounded-md p-mr-2 text-emerald-500 hover:!text-emerald-600" />
        }
        type="button"
        className="rounded-md p-mr-2 bg-emerald-100 text-emerald-500 hover:!bg-emerald-200 hover:!text-emerald-600"
        onClick={onClick}
        label="Edit"
      />
    </div>
  );
};
