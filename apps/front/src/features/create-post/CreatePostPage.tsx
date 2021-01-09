import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useUser } from 'src/components/AuthModule';
import { Button } from 'src/components/Button';
import { Dashboard } from 'src/components/Dashboard';
import { api } from 'src/services/api';

interface CreatePostPageProps {
  uploadParams: {
    url: string;
    fields: Record<string, string>;
  };
}

export function CreatePostPage(props: CreatePostPageProps) {
  const fileRef = React.useRef<HTMLInputElement>(null);
  const textRef = React.useRef<HTMLTextAreaElement>(null);
  const [uploadedPhoto, setUploadedPhoto] = React.useState('');
  const router = useRouter();
  const user = useUser();

  const upload = async () => {
    fileRef.current?.click();
  };

  const create = async () => {
    const text = textRef.current!.value.trim();
    if (!text && uploadedPhoto) {
      return;
    }
    const ret = await api.post_createPost({
      imageUrl: uploadedPhoto || null,
      text: text || null,
    });
    void router.push(`/@${user!.username}/posts/${ret.id}`);
  };

  return (
    <Dashboard>
      <div className="container mx-auto mt-4">
        <h1 className="text-center text-lg">Create post</h1>
        <textarea
          ref={textRef}
          className="p-4 block w-full  mb-4 border border-gray-200"
          rows={4}
        ></textarea>
        <input
          onChange={async e => {
            const file = e.target.files?.item(0);
            if (!file) {
              return;
            }
            const uploadParams = await api.media_getUploadUrl();
            const form = new FormData();
            form.append('acl', 'public-read');
            for (const field in uploadParams.fields) {
              form.append(field, uploadParams.fields[field]);
            }
            form.append('file', file);
            await fetch(uploadParams.url, {
              method: 'POST',
              body: form,
            });
            const fullUrl = uploadParams.url + '/' + uploadParams.fields.key;
            setUploadedPhoto(fullUrl);
          }}
          type="file"
          ref={fileRef}
          className="hidden"
        />
        {uploadedPhoto && (
          <div className="max-h-40 mb-4 relative">
            <img src={uploadedPhoto} className="max-h-32" />
            <div
              onClick={() => setUploadedPhoto('')}
              role="button"
              className="top-2 left-2 text-xs absolute text-red-400 hover:text-red-600 cursor-pointer"
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Button onClick={upload}>Upload photo</Button>
          <Button onClick={create}>Post</Button>
        </div>
      </div>
    </Dashboard>
  );
}
