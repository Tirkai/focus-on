import { FC } from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

interface IPostEditorProps {
  name?: string;
  control: Control<FieldValues>;
  label?: string;
  defaultValue?: string;
}

const PostEditor: FC<IPostEditorProps> = ({
  name,
  control,
  label,
  defaultValue = '',
}) => {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1"> {label}</label>}
      <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            init={{
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                'image',
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'code',
                'help',
                'wordcount',
                'anchor',
              ],
              toolbar:
                'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default PostEditor;
