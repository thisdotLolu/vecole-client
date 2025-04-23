'use client'
import React, { SetStateAction } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

function CustomSelect({setValue,value,selectOptions,placeholder,className}:{setValue?:React.Dispatch<SetStateAction<string | undefined>>,selectOptions:string[] | undefined,placeholder?:string,className?:string,value?:string | undefined}) {
    console.log(value)

    const pathname = usePathname()
  return (
    <Select
    disabled={pathname === '/signin'}
    value={value && value}
    onValueChange={(value) => {
       setValue && setValue(value);
    }}
    >
    <SelectTrigger className={clsx("w-full",className)}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
    {selectOptions?.map((item)=>(
      <SelectItem 
      key={item}
      value={item.toLowerCase()}>{item}</SelectItem>
    ))}
    </SelectContent>
    </Select>
  )
}

export default CustomSelect