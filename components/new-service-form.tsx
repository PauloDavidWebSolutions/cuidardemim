'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { Category, Duration, Provider, User } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

import { NewServiceSchema } from '@/lib/schemas'
import { createNewServiceAction } from '@/lib/actions/services'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import ImageUploader from '@/components/image-uploader'
import ProviderSelector from '@/components/provider-selector'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

type Inputs = z.infer<typeof NewServiceSchema>

interface NewServiceFormProps {
  categories: Category[]
  durations: Duration[]
  team: (Provider & {
    user: User
  })[]
}

export default function NewServiceForm({
  categories,
  durations,
  team
}: NewServiceFormProps) {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(NewServiceSchema),
    defaultValues: {
      name: '',
      description: '',
      imageUrl: '',
      categoryId: '',
      durationId: '',
      providers: []
    }
  })

  const processForm: SubmitHandler<Inputs> = async data => {
    const duration = durations.find(duration => duration.id === data.durationId)

    const result = await createNewServiceAction({
      ...data,
      length: duration?.duration || 0
    })

    if (result?.error) {
      toast.error(result.error)
      return
    }

    toast.success('Service created successfully!')
  }

  const [filePickerIsOpen, setFilePickerIsOpen] = useState(false)

  function setImageUrl(url: string) {
    setValue('imageUrl', url)
    setFilePickerIsOpen(false)
  }

  register('providers')
  const providers = getValues('providers')

  function addProvider(id: string) {
    const value = [...providers, id]
    setValue('providers', value, { shouldValidate: true })
  }

  function removeProvider(id: string) {
    const value = providers.filter(providerId => providerId !== id)
    setValue('providers', value, { shouldValidate: true })
  }

  return (
    <form className='mt-4' onSubmit={handleSubmit(processForm)}>
      <div className='flex flex-col gap-4'>
        {/* name and duration */}
        <div className='flex justify-between gap-4'>
          <div className='flex-1'>
            <Input
              type='text'
              placeholder='Service name'
              {...register('name')}
            />
            {errors.name?.message && (
              <p className='mt-1 px-2 text-xs text-red-400'>
                {errors.name.message}
              </p>
            )}
          </div>

          <div className='flex-1'>
            <Select
              onValueChange={value =>
                setValue('durationId', value, { shouldValidate: true })
              }
            >
              <SelectTrigger className='w-full text-muted-foreground'>
                <SelectValue placeholder='Duration' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Duration</SelectLabel>

                  {durations && durations.length > 0 ? (
                    durations.map(duration => (
                      <SelectItem key={duration.id} value={duration.id}>
                        {duration.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value='no-tags'>No duration found</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>

            {errors.durationId?.message && (
              <p className='mt-1 px-2 text-xs text-red-400'>
                {errors.durationId.message}
              </p>
            )}
          </div>
        </div>

        {/* image */}
        <div className='flex justify-between gap-4'>
          <div className='w-full'>
            <Input
              disabled
              type='text'
              className='w-full'
              placeholder='Cover image'
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

        {/* description */}
        <div>
          <Textarea
            rows={5}
            placeholder='Service description'
            {...register('description')}
          />
          {errors.description?.message && (
            <p className='mt-1 px-2 text-xs text-red-400'>
              {errors.description.message}
            </p>
          )}
        </div>

        {/* price and category */}
        <div className='flex justify-between gap-4'>
          <div className='flex-1'>
            <Input
              type='number'
              placeholder='Service price'
              {...register('price')}
            />
            {errors.price?.message && (
              <p className='mt-1 px-2 text-xs text-red-400'>
                {errors.price.message}
              </p>
            )}
          </div>

          <div className='flex-1'>
            <Select
              onValueChange={value =>
                setValue('categoryId', value, { shouldValidate: true })
              }
            >
              <SelectTrigger className='w-full text-muted-foreground'>
                <SelectValue placeholder='Category' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>

                  {categories && categories.length > 0 ? (
                    categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value='no-tags'>No category found</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>

            {errors.categoryId?.message && (
              <p className='mt-1 px-2 text-xs text-red-400'>
                {errors.categoryId.message}
              </p>
            )}
          </div>
        </div>

        {/* providers */}
        <div className='flex items-center justify-between'>
          <div>
            <ProviderSelector
              team={team}
              selectedProviders={providers}
              addProvider={addProvider}
              removeProvider={removeProvider}
            />
            {errors.providers?.message && (
              <p className='mt-1 px-2 text-xs text-red-400'>
                {errors.providers.message}
              </p>
            )}
          </div>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create service'}
          </Button>
        </div>
      </div>
    </form>
  )
}
