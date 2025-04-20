'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { Category } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

import { createNewCategoryAction } from '@/lib/actions/categories'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import ImageUploader from '@/components/image-uploader'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

type Inputs = {
  name: string
  description: string
  imageUrl: string
}

interface NewCategoryFormProps {
  categories: Category[]
}

export default function NewCategoryForm({ categories }: NewCategoryFormProps) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(z.object({
      name: z.string().min(1, 'Name is required'),
      description: z.string().optional(),
      imageUrl: z.string().optional(),
    })),
    defaultValues: {
      name: '',
      description: '',
      imageUrl: '',
    }
  })

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await createNewCategoryAction(data)

    if (result?.error) {
      toast.error(result.error)
      return
    }

    toast.success('Category created successfully!')
  }

  const [filePickerIsOpen, setFilePickerIsOpen] = useState(false)

  function setImageUrl(url: string) {
    setValue('imageUrl', url)
    setFilePickerIsOpen(false)
  }
  

  return (
    <form className='mt-4' onSubmit={handleSubmit(processForm)}>
      <div className='flex flex-col gap-4'>
        {/* Category name */}
        <div>
          <Input type='text' placeholder='Category name' {...register('name')} />
          {errors.name?.message && <p className='text-red-400'>{errors.name.message}</p>}
        </div>

        {/* Category image */}
        <div className='flex justify-between gap-4'>
          <div className='w-full'>
            <Input disabled type='text' className='w-full' placeholder='Cover image' {...register('imageUrl')} />
          </div>
          <Dialog open={filePickerIsOpen} onOpenChange={setFilePickerIsOpen}>
            <DialogTrigger asChild>
              <Button>Select file</Button>
            </DialogTrigger>
            <DialogContent>
              <ImageUploader setImageUrl={setImageUrl} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Category description */}
        <div>
          <Textarea rows={5} placeholder='Category description' {...register('description')} />
        </div>

        {/* Submit button */}
        <div className='flex justify-between'>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Category'}
          </Button>
        </div>
      </div>
    </form>
  )
}
