import {
  ChangeEvent,
  FC,
  HTMLProps,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Button } from 'react-bootstrap';

import cx from 'classnames';

export interface FormControlFileProps extends HTMLProps<HTMLInputElement> {
  onChange?(value: any): any;
  value?: string;
  getOptionLabel?(value: any): string;
}

const FormControlFile: FC<FormControlFileProps> = ({
  onChange = () => {},
  value,
  label = 'Select an image',
  className,
  ...props
}) => {
  const [reader, setReader] = useState<FileReader>();

  useEffect(() => {
    setReader(new FileReader());
  }, []);

  useEffect(() => {
    if (!reader) {
      return;
    }
    reader.addEventListener(
      'load',
      () => {
        onChange(reader.result);
      },
      false,
    );
  }, [onChange, reader]);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!reader) {
        return;
      }
      if (
        (event.target as HTMLInputElement)?.files &&
        (event.target as HTMLInputElement)?.files?.length
      ) {
        const { files } = (event.target as HTMLInputElement)!;
        if (files !== null) {
          reader.readAsDataURL(files[0]);
        }
      }
    },
    [reader],
  );

  return (
    <>
      <Button className={cx('d-block', className)} as="label">
        {label}
        <input
          type="file"
          onChange={handleOnChange}
          className={cx(className, 'd-none')}
          {...props}
        />
      </Button>
      {value && <div>{value && <img alt="preview" src={value} />}</div>}
    </>
  );
};

export default FormControlFile;
