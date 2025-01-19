'use client';
import React, { Dispatch, SetStateAction} from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1),
});

export default function ConditionForm({
  setIsOpen,
  addCharConditionsCustom
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  addCharConditionsCustom: (editedCharCond: string) => void;
}) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsOpen(false);
      addCharConditionsCustom(values.name)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-whtie bg-zinc-800">
      <Form {...form}>
        <form className="m-3 grid grid-cols-12 gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
            <FormItem className="col-span-11">
              <FormControl>
                <Input className="text-black" 
                  placeholder="" {...field}
                  required
                  autoFocus
                />
              </FormControl>
            </FormItem>
            )}
          />
          <Button className="col-span-1 justify-self-start" 
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}