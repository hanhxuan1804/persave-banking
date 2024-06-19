'use client';
import React from 'react';

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface ICommandProps {
  commands: { value: string; label: string; icon: React.JSX.Element }[];
  placeholder?: string;
}

export default function CommandSearch({
  commands,
  placeholder,
}: ICommandProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleValueChange = (value: string) => {
    setInputValue(value);
    setOpen(!!value);
  };

  const filteredCommands = Array.isArray(commands)
    ? commands.filter((command) =>
        command.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    : [];
  const handleClick = (value: string) => {
    //TODO: navigate to the command
    console.log(value);
    setInputValue('');
    setOpen(false);
  };
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        placeholder={placeholder ? placeholder : 'Search'}
        onValueChange={handleValueChange}
        value={inputValue}
      />
      {
        <CommandList>
          {filteredCommands.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {open &&
            filteredCommands.length > 0 &&
            filteredCommands.map((command) => (
              <CommandItem
                key={command.value}
                value={command.value}
                className="flex items-center gap-2"
                onSelect={(currentValue) => handleClick(currentValue)}
              >
                {command.icon}
                <span>{command.label}</span>
              </CommandItem>
            ))}
        </CommandList>
      }
    </Command>
  );
}
