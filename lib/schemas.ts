import { z } from 'zod'

export const NewServiceSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required.')
    .min(3, 'Needs to be at least 3 characters.'),
  description: z
    .string()
    .min(1, 'Description is required.')
    .min(3, 'Needs to be at least 3 characters.'),
  price: z.coerce.number().min(1, 'Price is required.'),
  durationId: z.string().min(1, 'Duration is required.'),
  categoryId: z.string().min(1, 'Category is required.'),
  imageUrl: z.string().optional(),
  providers: z.array(z.string()).min(1, 'At least one provider is required.')
})

export const NewServiceWithLengthSchema = NewServiceSchema.extend({
  length: z.number().min(1, 'Length is required.')
})

export const NewMemberSchema = z.object({
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  jobTitle: z.string().optional(),
  calUsername: z.string().min(1, 'Cal.com username is required.'),
  email: z.string().min(1, 'Email is required.')
})