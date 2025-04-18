'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { NewMemberSchema } from '@/lib/schemas'
import { createNewMemberAction } from '@/lib/actions/team'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import ImageUploader from '@/components/image-uploader'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

type Inputs = z.infer<typeof NewMemberSchema>

export default function NewMemberForm() {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(NewMemberSchema),
    defaultValues: {
      imageUrl: '',
      description: '',
      calUsername: '',
      email: ''
    }
  })

  const processForm: SubmitHandler<Inputs> = async data => {
    const result = await createNewMemberAction(data)

    if (result?.error) {
      toast.error(result.error)
      return
    }

    toast.success('Member created successfully!')
  }

  const [filePickerIsOpen, setFilePickerIsOpen] = useState(false)

  function setImageUrl(url: string) {
    setValue('imageUrl', url)
    setFilePickerIsOpen(false)
  }

  return (
    <form className='mt-4' onSubmit={handleSubmit(processForm)}>
      <div className='flex flex-col gap-4'>
        {/* Email and calendar username */}
        <div className='flex justify-between gap-4'>
          <div className='flex-1'>
            <Input type='text' placeholder='Email' {...register('email')} />
            {errors.email?.message && (
              <p className='mt-1 px-2 text-xs text-red-400'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className='flex-1'>
            <Input
              type='text'
              placeholder='Calendar username'
              {...register('calUsername')}
            />
            {errors.calUsername?.message && (
              <p className='mt-1 px-2 text-xs text-red-400'>
                {errors.calUsername.message}
              </p>
            )}
          </div>
        </div>

        {/* Job title */}
        <div>
          <Input
            type='text'
            placeholder='Job title'
            {...register('jobTitle')}
          />
          {errors.jobTitle?.message && (
            <p className='mt-1 px-2 text-xs text-red-400'>
              {errors.jobTitle.message}
            </p>
          )}
        </div>

        {/* Image */}
        <div className='flex justify-between gap-4'>
          <div className='w-full'>
            <Input
              disabled
              type='text'
              className='w-full'
              placeholder='Member image'
              {...register('imageUrl')}
            />
            {errors.imageUrl?.message && (
              <p className='mt-1 px-2 text-xs text-red-400'>
                {errors.imageUrl.message}
              </p>
            )}
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

        {/* Description */}
        <div>
          <Textarea
            rows={5}
            placeholder='Short description'
            {...register('description')}
          />
          {errors.description?.message && (
            <p className='mt-1 px-2 text-xs text-red-400'>
              {errors.description.message}
            </p>
          )}
        </div>

        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create member'}
        </Button>
      </div>
    </form>
  )
}
