
import { Input } from '@/components/ui/input';
import React, { useContext, useState } from 'react'
import { AssistantType } from '../../ai-assistants/page';
import Image from 'next/image';
import { AssistantContext } from '@/context/AssistantContext';

function SearchAssistant({list} : {list : AssistantType[]}) {

  const [searchTerm , setSearchTerm] = useState<string>('');
  const [showDropDown , setShowDropDown] = useState<boolean>(false);

  const {assistant , setAssistant} = useContext(AssistantContext);

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropDown(true);
  }

  return (
    <div className = 'relative'>
      <Input
        className = 'dark:bg-black border dark:border-white/10 dark:placeholder-gray-400 dark:text-white'
        placeholder = 'Search'
        value = {searchTerm}
        onChange = {(e) => handleOnInputChange(e)}
        onFocus = {() => setShowDropDown(true)}
        onBlur = {() => setTimeout(() => setShowDropDown(false) , 150)}
      />

      {
        showDropDown && searchTerm && (
          <div
            className = 'absolute top-full mt-1 w-full bg-white dark:bg-black border border-gray-200 dark:border-slate-800 rounded-lg shadow-md z-50 max-h-60 overflow-y-auto'
          >
            {
              list
                ?.filter((assist) => 
                  assist.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  assist.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((assist) => (
                  <div
                    key={assist.id}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer"
                    onClick={() => {
                      setAssistant(assist);
                      setSearchTerm('');
                      setShowDropDown(false);
                    }}
                  >
                    <Image
                      src={assist.image}
                      alt={assist.name}
                      width={30}
                      height={30}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{assist.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{assist.title}</p>
                    </div>
                  </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default SearchAssistant
