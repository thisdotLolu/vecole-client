import React, { SetStateAction } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import clsx from 'clsx'

function CustomSelect({setValue,value,selectOptions,placeholder,className}:{setValue:React.Dispatch<SetStateAction<string>>,selectOptions:string[] | undefined,placeholder?:string,className?:string,value?:string}) {
    console.log(value)
  return (
    <Select
    value={value}
    onValueChange={(value) => {
        setValue(value);
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