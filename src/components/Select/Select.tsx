import { ComponentProps, FC } from 'react';
import ReactSelect from 'react-select';

type IProps = ComponentProps<typeof ReactSelect> & {
  getOptionLabel?(value: any): string;
};

const Select: FC<IProps> = ({
  labelAttribute = 'name',
  valueAttribute = 'id',
  isClearable = true,
  getOptionLabel,
  ...props
}) => {
  return (
    <ReactSelect
      styles={{
        control: (controlProps: any) => {
          return {
            ...controlProps,
            minHeight: '50px',
          };
        },
      }}
      isClearable={isClearable}
      getOptionLabel={getOptionLabel || ((value: any) => value[labelAttribute])}
      getOptionValue={(value: any) => value[valueAttribute]}
      {...props}
    />
  );
};

export default Select;
