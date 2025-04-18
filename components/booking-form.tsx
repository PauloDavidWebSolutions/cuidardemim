'use client'

import { use, useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { AnimatePresence, motion, MotionProps } from 'framer-motion'

import { Category, Duration, Provider, Service, User } from '@prisma/client'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import ServiceItem from '@/components/service-item'
import Member from './member'
import Calendar from './calendar'

interface BookingFormProps {
  categories: (Category & {
    service: (Service & {
      provider: (Provider & {
        user: User
      })[]
      duration: Duration
      category: Category
    })[]
  })[]
}

type Animate = 'none' | 'next' | 'back'

export default function BookingForm({ categories }: BookingFormProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>()
  const selectedCategory = categories.find(c => c.id === selectedCategoryId)

  useEffect(() => {
    if (selectedCategoryId) {
      setSelectedServiceId(undefined)
      setSelectedProviderId(undefined)
    }
  }, [selectedCategoryId])

  const [selectedServiceId, setSelectedServiceId] = useState<string>()
  const selectedService = selectedCategory?.service.find(
    s => s.id === selectedServiceId
  )

  useEffect(() => {
    if (selectedServiceId) {
      setSelectedProviderId(undefined)
    }
  }, [selectedServiceId])

  const [selectedProviderId, setSelectedProviderId] = useState<string>()
  const selectedProvider = selectedService?.provider.find(
    p => p.id === selectedProviderId
  )

  const [animate, setAnimate] = useState<Animate>('none')
  const [currentStep, setCurrentStep] = useState(0)

  function next() {
    setAnimate('next')
    setTimeout(() => setCurrentStep(s => s + 1), 0)
  }

  function back() {
    setAnimate('back')
    setTimeout(() => setCurrentStep(s => s - 1), 0)
  }

  return (
    <section>
      <div className='min-h-[565px]'>
        <AnimatePresence mode='wait' initial={false}>
          {currentStep === 0 && (
            <motion.section key={1}>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.25, duration: 0.25 }
                }}
                exit={{
                  opacity: 0,
                  transition: { delay: 0, duration: 0.25 }
                }}
                className='mb-10 text-xl font-semibold'
              >
                <span>What brings you here today?</span>
              </motion.h2>

              <motion.div
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.25, duration: 0.5 }
                }}
                {...motionProps(animate)}
              >
                <RadioGroup
                  value={selectedCategoryId}
                  onValueChange={value => {
                    setSelectedCategoryId(value)
                    next()
                  }}
                  className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'
                >
                  {categories.map(category => (
                    <div className='grow' key={category.id}>
                      <RadioGroupItem
                        id={category.id}
                        value={category.id}
                        className='peer hidden'
                      />
                      <Label
                        htmlFor={category.id}
                        className='card-shine-effect inline-flex aspect-video w-full cursor-pointer items-center justify-center rounded-2xl bg-primary/50 px-4 py-4 text-lg font-light text-primary/90 outline-offset-4 outline-primary transition-colors peer-data-[state=checked]:outline'
                      >
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </motion.div>
            </motion.section>
          )}

          {currentStep === 1 && (
            <motion.section key={2}>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.25, duration: 0.25 }
                }}
                exit={{
                  opacity: 0,
                  transition: { delay: 0, duration: 0.25 }
                }}
                className='mb-10 flex items-center gap-2 text-lg font-semibold'
              >
                <span className='inline-flex size-8 items-center justify-center rounded-full bg-muted text-sm font-normal'>
                  1
                </span>
                <span>Choose a service:</span>
              </motion.h2>
              <motion.div
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.25, duration: 0.5 }
                }}
                {...motionProps(animate)}
              >
                <RadioGroup
                  value={selectedServiceId}
                  onValueChange={value => {
                    setSelectedServiceId(value)
                    next()
                  }}
                  className='mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'
                >
                  {selectedCategory?.service.map(service => (
                    <div className='' key={service.id}>
                      <RadioGroupItem
                        id={service.id}
                        value={service.id}
                        className='peer hidden'
                      />
                      <Label
                        htmlFor={service.id}
                        className='group relative block cursor-pointer overflow-hidden rounded-2xl outline-offset-4 outline-primary peer-data-[state=checked]:outline'
                      >
                        <ServiceItem service={service} />
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </motion.div>
            </motion.section>
          )}

          {currentStep === 2 && (
            <motion.section key={3}>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.25, duration: 0.25 }
                }}
                exit={{
                  opacity: 0,
                  transition: { delay: 0, duration: 0.25 }
                }}
                className='mb-10 flex items-center gap-2 text-lg font-semibold'
              >
                <span className='inline-flex size-8 items-center justify-center rounded-full bg-muted text-sm font-normal'>
                  2
                </span>
                <span>Choose your provider:</span>
              </motion.h2>

              <motion.div
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.25, duration: 0.5 }
                }}
                {...motionProps(animate)}
              >
                <RadioGroup
                  value={selectedProviderId}
                  onValueChange={value => {
                    setSelectedProviderId(value)
                    next()
                  }}
                  className='mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'
                >
                  {selectedService?.provider.map(provider => (
                    <div className='' key={provider.id}>
                      <RadioGroupItem
                        id={provider.id}
                        value={provider.id}
                        className='peer hidden'
                      />
                      <Label
                        htmlFor={provider.id}
                        className='group relative block cursor-pointer overflow-hidden rounded-2xl outline-offset-4 outline-primary peer-data-[state=checked]:outline'
                      >
                        <Member member={provider} />
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </motion.div>
            </motion.section>
          )}

          {currentStep === 3 && (
            <motion.section key={4}>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.25, duration: 0.25 }
                }}
                exit={{
                  opacity: 0,
                  transition: { delay: 0, duration: 0.25 }
                }}
                className='mb-10 flex items-center gap-2 text-lg font-semibold'
              >
                <span className='inline-flex size-8 items-center justify-center rounded-full bg-muted text-sm font-normal'>
                  3
                </span>
                <span>Pick a time:</span>
              </motion.h2>
              <motion.div
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.25, duration: 0.5 }
                }}
                {...motionProps(animate)}
              >
                <Calendar
                  namespace={selectedService?.calEventSlug || ''}
                  calLink={`${selectedProvider?.calUsername}/${selectedService?.calEventSlug}`}
                />
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <div className='mt-6 flex justify-between gap-2'>
        <Button
          size='sm'
          disabled={currentStep === 0}
          onClick={() => {
            if (currentStep === 0) return
            back()
          }}
        >
          <ChevronUp className='size-5' />
        </Button>

        <Button
          size='sm'
          disabled={
            currentStep === 3 ||
            (currentStep === 0 && !selectedCategoryId) ||
            (currentStep === 1 && !selectedServiceId) ||
            (currentStep === 2 && !selectedProviderId)
          }
          onClick={() => {
            if (currentStep === 0 && !selectedCategoryId) return
            if (currentStep === 1 && !selectedServiceId) return
            if (currentStep === 2 && !selectedProviderId) return
            if (currentStep === 3) return
            next()
          }}
        >
          <ChevronDown className='size-5' />
        </Button>
      </div>
    </section>
  )
}

function motionProps(animate: Animate): MotionProps {
  if (animate === 'next') {
    return {
      initial: { y: 100, opacity: 0 },
      exit: {
        y: -100,
        opacity: 0,
        transition: { delay: 0, duration: 0.25 }
      }
    }
  }
  if (animate === 'back') {
    return {
      initial: { y: -100, opacity: 0 },
      exit: {
        y: 100,
        opacity: 0,
        transition: { delay: 0, duration: 0.25 }
      }
    }
  }
  return {}
}
