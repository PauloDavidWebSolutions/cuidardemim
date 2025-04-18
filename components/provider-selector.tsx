'use client'

import * as React from 'react'
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Provider, User } from '@prisma/client'

interface ProviderSelectorProps {
  team: (Provider & {
    user: User
  })[]
  selectedProviders: string[]
  addProvider: (id: string) => void
  removeProvider: (id: string) => void
}

export default function ProviderSelector({
  team,
  selectedProviders,
  addProvider,
  removeProvider
}: ProviderSelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='text-muted-foreground'>
          <PlusCircledIcon className='mr-2 h-4 w-4' />
          Select providers
          {selectedProviders?.length > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal lg:hidden'
              >
                {selectedProviders.length}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
                {selectedProviders.length > 2 ? (
                  <Badge
                    variant='secondary'
                    className='rounded-sm px-1 font-normal'
                  >
                    {selectedProviders.length} selected
                  </Badge>
                ) : (
                  team
                    .filter(member => selectedProviders.includes(member.id))
                    .map(member => (
                      <Badge
                        variant='secondary'
                        key={member.id}
                        className='rounded-sm px-1 font-normal'
                      >
                        {member.user.firstName} {member.user.lastName}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandInput placeholder='Select providers' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {team.map(member => {
                const isSelected = selectedProviders.includes(member.id)
                return (
                  <CommandItem
                    key={member.id}
                    onSelect={() => {
                      if (isSelected) {
                        removeProvider(member.id)
                      } else {
                        addProvider(member.id)
                      }
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>
                    {member.user.firstName} {member.user.lastName}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
