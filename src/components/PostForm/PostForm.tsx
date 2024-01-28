// import { IUser } from '../../appwrite/authService';
// import { IPostData, IUpdatePostData } from '../../appwrite/databaseService';
// import { IPostData } from '../../appwrite/databaseService';
import { FC, useCallback, useEffect } from 'react';
import Select from '../Select/Select';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IRootState } from '../../store/store';
import Button from '../Button/Button';
import Input from '../Input/Input';
import PostEditor from '../PostEditor/PostEditor';
import databaseService from '../../appwrite/databaseService';


export interface IUser {
  email: string;
  password: string;
  name: string;
}

export interface IPostData {
  title: string;
  slug: string;
  content: string;
  imagePreview: string;
  status: string;
  $id?: string;
}

interface PostFormProps {
  post?: IPostData;
}

interface FormData {
  title: string;
  slug: string;
  content: string;
  imagePreview: FileList | null;
  status: string;
}

const PostForm: FC<PostFormProps> = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm<FormData>({
      defaultValues: {
        title: post?.title || '',
        slug: post?.slug || '',
        content: post?.content || '',
        status: post?.status || 'active',
        imagePreview: null,
      },
    });

  const navigate = useNavigate();
  const userData = useSelector(
    (state: IRootState) => state.auth.userData,
  ) as IUser | null;

  const submit = async (data: FormData) => {
    let imagePreviewId = post?.imagePreview || null;

    if (data.imagePreview && data.imagePreview.length > 0) {
      const file = await databaseService.uploadFile(data.imagePreview[0]);
      if (file) {
        imagePreviewId = file.$id;
        if (post?.imagePreview) {
          databaseService.deleteFile(post.imagePreview);
        }
      }
    }

    const postData: IPostData = {
      ...data,
      imagePreview: imagePreviewId || '',
    };

    if (post) {
      const dbPost = await databaseService.updatePost(post.$id, postData);
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      if (userData) {
        const dbPost = await databaseService.createPost({
          ...postData,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value: string) => {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, '-')
      .replace(/\s/g, '-');
  }, []);

  useEffect(() => {
    watch((value, { name }) => {
      if (name === 'title') {
        const title = value.title ?? '';
        setValue('slug', slugTransform(title), { shouldValidate: true });
      }
    });
  }, [watch, slugTransform, setValue]);
  
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register('title', { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <PostEditor
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues('content')}
        />
      </div>
      <div className="1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg"
          {...register('imagePreview', { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={databaseService.getFilePreview(post.imagePreview)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={['active', 'inactive']}
          label="Status"
          className="mb-4"
          {...register('status', { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? 'bg-green-500' : undefined}
          className="w-full"
        >
          {post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;


// //

// import { FC, useCallback, useEffect } from 'react';
// import Select from '../Select/Select';
// import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { IRootState } from '../../store/store';
// import Button from '../Button/Button';
// import Input from '../Input/Input';
// import PostEditor from '../PostEditor/PostEditor';
// import databaseService from '../../appwrite/databaseService';
// import { IUser } from '../../appwrite/authService';
// import { IPostData } from '../../appwrite/databaseService';
// // import { IPostData, IUpdatePostData } from '../../appwrite/databaseService';


// interface PostFormProps {
//   post?: IPostData;
// }

// interface FormData {
//   title: string;
//   slug: string;
//   content: string;
//   imagePreview: string | null;
//   status: string;
// }

// const PostForm: FC<PostFormProps> = ({ post }) => {
//   const { register, handleSubmit, watch, setValue, control, getValues } =
//     useForm<FormData>({
//       defaultValues: {
//         title: post?.title || '',
//         slug: post?.slug || '',
//         content: post?.content || '',
//         status: post?.status || 'active',
//       },
//     });

//   const navigate = useNavigate();
//   const userData = useSelector(
//     (state: IRootState) => state.auth.userData,
//   ) as IUser | null;

//   const submit = async (data: FormData) => {
//     if (post) {
//       // const file = data.imagePreview[0]
//       //   ? await databaseService.uploadFile(data.imagePreview[0])
//       //   : null;
//       const file = data.imagePreview && data.imagePreview.length > 0 
//     ? await databaseService.uploadFile(data.imagePreview[0]) 
//     : null;

//       if (file) {
//         databaseService.deleteFile(post.imagePreview);
//       }
//       const dbPost = await databaseService.updatePost(post.$id, {
//         ...data,
//         imagePreview: file ? file.$id : undefined,
//       });
//       if (dbPost) {
//         navigate(`/post/${dbPost.$id}`);
//       }
//     } else {
//       const file = await databaseService.uploadFile(data.imagePreview[0]);
//       if (file) {
//         const fileId = file.$id;
//         data.imagePreview = fileId;
//         const dbPost = await databaseService.createPost({
//           ...data,
//           userId: userData.$id,
//         });

//         if (dbPost) {
//           navigate(`/post/${dbPost.$id}`);
//         }
//       }
//     }
//   };

//   const slugTransform = useCallback((value: string) => {
//     if (value && typeof value === 'string')
//       return value
//         .trim()
//         .toLowerCase()
//         .replace(/[^a-zA-Z\d\s]+/g, '-')
//         .replace(/\s/g, '-');
//   }, []);

//   useEffect(() => {
//     watch((value, { name }) => {
//       if (name === 'title') {
//         setValue('slug', slugTransform(value.title), { shouldValidate: true });
//       }
//     });
//   }, [watch, slugTransform, setValue]);
//   return (
//     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//       <div className="w-2/3 px-2">
//         <Input
//           label="Title"
//           placeholder="Title"
//           className="mb-4"
//           {...register('title', { required: true })}
//         />
//         <Input
//           label="Slug :"
//           placeholder="Slug"
//           className="mb-4"
//           {...register('slug', { required: true })}
//           onInput={(e) => {
//             setValue('slug', slugTransform(e.currentTarget.value), {
//               shouldValidate: true,
//             });
//           }}
//         />
//         <PostEditor
//           label="Content: "
//           name="content"
//           control={control}
//           defaultValue={getValues('content')}
//         />
//       </div>
//       <div className="1/3 px-2">
//         <Input
//           label="Featured Image"
//           type="file"
//           className="mb-4"
//           accept="image/png, image/jpg, image/jpeg"
//           {...register('imagePreview', { required: !post })}
//         />
//         {post && (
//           <div className="w-full mb-4">
//             <img
//               src={databaseService.getFilePreview(post.imagePreview)}
//               alt={post.title}
//               className="rounded-lg"
//             />
//           </div>
//         )}
//         <Select
//           options={['active', 'inactive']}
//           label="Status"
//           className="mb-4"
//           {...register('status', { required: true })}
//         />
//         <Button
//           type="submit"
//           bgColor={post ? 'bg-green-500' : undefined}
//           className="w-full"
//         >
//           {post ? 'Update' : 'Submit'}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default PostForm;
//

// import { FC, useCallback, useEffect } from 'react';
// import Select from '../Select/Select';
// import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { IRootState } from '../../store/store';
// import Button from '../Button/Button';
// import Input from '../Input/Input';
// import PostEditor from '../PostEditor/PostEditor';
// import databaseService from '../../appwrite/databaseService';
// import { IUser } from '../../appwrite/authService'
// import { IPostData, IUpdatePostData } from '../../appwrite/databaseService';

// const PostForm: FC = ({post}) => {
//   const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
//       defaultValues: {
//           tittle: post?.title || "",
//           slug: post?.slug || "",
//           content: post?.content || "",
//           status: post?.status || "active"

//       }
//   })

//   const navigate = useNavigate()
//   const userData = useSelector((state: IRootState) => state.auth.userData)

//   const submit = async(data: IPostData) => {
//       if (post) {
//           const file = data.imagePreview[0] ? await databaseService.uploadFile(data.imagePreview[0]) : null

//           if (file) {
//             databaseService.deleteFile(post.imagePreview)
//           }
//           const dbPost = await databaseService.updatePost(post.$id, {
//               ...data,
//               imagePreview: file ? file.$id : undefined
//           })
//           if (dbPost) {
//               navigate(`/post/${dbPost.$id}`)
//           }
//       } else {
//           const file = await databaseService.uploadFile(data.imagePreview[0])
//           if (file) {
//               const fileId = file.$id
//               data.imagePreview = fileId
//               const dbPost = await databaseService.createPost({...data, userId: userData.$id})

//               if (dbPost) {
//                   navigate(`/post/${dbPost.$id}`)
//               }
//           }
//       }

//   }

//   const slugTransform = useCallback((value) => {
//       if(value && typeof value === "string") return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-')
//       .replace(/\s/g, "-")
//   }, [])

//   useEffect(() => {
//       watch((value, {name}) => {
//           if (name === "title") {
//               setValue("slug", slugTransform(value.title), {shouldValidate: true})
//           }
//       })
//   }, [watch, slugTransform, setValue])
//   return (
//       <form onSubmit={handleSubmit(submit)}
//       className="flex flex-wrap"
//       >
//           <div className="w-2/3 px-2">
//               <Input
//               label="Title"
//               placeholder="Title"
//               className="mb-4"
//               {...register("title", {required: true})}
//               />
//               <Input
//               label="Slug :"
//               placeholder="Slug"
//               className="mb-4"
//               {...register("slug", {required: true})}
//               onInput={(e) => {
//                   setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
//               }}
//               />
//               <PostEditor
//               label="Content: "
//               name="content"
//               control={control}
//               defaultValue={getValues("content")}
//               />
//           </div>
//           <div className="1/3 px-2">
//               <Input
//               label="Featured Image"
//               type="file"
//               className="mb-4"
//               accept="image/png, image/jpg, image/jpeg"
//               {...register("image", {required: !post})}
//               />
//               {post && (
//                   <div className="w-full mb-4">
//                       <img src={databaseService.getFilePreview(post.imagePreview)} alt={post.title}
//                       className="rounded-lg"
//                       />

//                   </div>
//               )}
//               <Select
//               options={["active", "inactive"]}
//               label="Status"
//               className="mb-4"
//               {...register("status", {required: true})}
//               />
//               <Button
//               type="submit"
//               bgColor={post ? "bg-green-500": undefined}
//               className="w-full"
//               >{post ? "Update": "Submit"}</Button>
//           </div>
//       </form>
//   )
// }

// export default PostForm;

//

