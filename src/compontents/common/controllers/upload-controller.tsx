
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from '../../ui/file-upload';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { cn, formatBytes, parseAllowedTypes } from '@/src/utils/utils';
import { CloudUploadIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { Button } from '../../ui/button';

export interface UploadControllerProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  label?: string;
  optional?: boolean;
  formItemClassName?: string;
  disabled?: boolean;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  uploadOnSelect?: boolean;
  deleteKeyName?: Path<TFormValues>;
  onExistingFileDelete?: () => void;
}

export function UploadController<TFormValues extends FieldValues>({
  name,
  label,
  optional,
  formItemClassName,
  maxFiles = 1,
  maxSize: maxSizeProp,
  accept: acceptProp,
  uploadOnSelect = true,
  deleteKeyName,
  onExistingFileDelete,
  ...props
}: UploadControllerProps<TFormValues>) {
  const accept = acceptProp ?? ('application/pdf, image/jpeg');
  const maxSize =
    maxSizeProp ??
    (5 * 1024 * 1024);

  const { control, setError, setValue, getValues } = useFormContext();
  const t = useTranslations();




  const handleValueChange = useCallback(
    (files: File[]) => {
      setValue(name, files as never, { shouldValidate: false });
    },

    [getValues, name, setValue]
  );



  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn('w-full', formItemClassName)}>
          {label && (
            <FormLabel className='mb-1.5 block'>
              {label}
              {optional && (
                <span className='text-muted-foreground ms-1 font-normal'>
                  ({t('common.optional')})
                </span>
              )}
            </FormLabel>
          )}
          <FormControl>
            <FileUpload
              invalid={!!error}
              value={(field.value as File[])}
              onValueChange={handleValueChange}
              maxFiles={maxFiles}
              maxSize={maxSize}
              accept={accept}
              // onUpload={}
              {...props}
              onFileReject={(_, message) => setError(name, { message })}
              onFileValidate={file => {
                if (maxSize && file.size > maxSize) {
                  return t('validation.errors.file_size_too_large', {
                    file_size: formatBytes(maxSize),
                  });
                }
                if (accept && !accept.includes(file.type)) {
                  return t('validation.errors.file_allowed_types', {
                    file_type: parseAllowedTypes(accept),
                  });
                }
                return null;
              }}
            >
              <FileUploadDropzone
                className={cn(
                  'fex-row text-muted-foreground flex-wrap gap-1 border-dotted text-center',
                  error && 'border-destructive'
                )}
              >
                <CloudUploadIcon className='size-4' />
                {t('common.file_upload_prefix_message')}
                <FileUploadTrigger asChild>
                  <Button
                    variant='link'
                    size='sm'
                    className='text-muted-foreground h-auto p-0 font-semibold underline-offset-1'
                  >
                    {t('common.browse_files')}
                  </Button>
                </FileUploadTrigger>
              </FileUploadDropzone>




              <FileUploadList>
                {(field.value as File[])?.map((file: File, index: number) => (
                  <FileUploadItem value={file} key={index}>
                    <FileUploadItemPreview />
                    <FileUploadItemMetadata />
                    <FileUploadItemDelete asChild>
                      <Button variant='ghost' size='icon'>
                        <span className='sr-only'>{t('common.delete')}</span>
                        <XIcon className='size-7' />
                      </Button>
                    </FileUploadItemDelete>
                  </FileUploadItem>
                ))}
              </FileUploadList>

            </FileUpload>
          </FormControl>
          <FormDescription className='pt-1'>
            {t('common.file_upload_description', {
              count: maxFiles,
              allowed_types: parseAllowedTypes(accept),
              max_size: formatBytes(maxSize),
            })}
          </FormDescription>
          <FormMessage className='pt-0' />
        </FormItem>
      )}
    />
  );
}
