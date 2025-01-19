"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Please Enter a Name",
  }),
  roll: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Please Enter a Roll",
  }),
})

export default function CharForm({
  addChar
}: {
  addChar: (name: string, roll: number) => void
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      roll: ""
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addChar(data.name, parseFloat(data.roll));
    form.reset();
  }

  return (
  <div className="text-whtie bg-zinc-800">
    <Form {...form}>
      <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
          <FormItem className="">
            <FormControl>
              <Input className="text-black" 
                placeholder="Name" {...field}
              />
            </FormControl>
          </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roll"
          render={({ field }) => (
          <FormItem className="">
            <FormControl>
              <Input className="text-black" 
                placeholder="Roll" {...field} 
                pattern="^\d*(\.\d{0,2})?$"
              />
            </FormControl>
          </FormItem>
          )}
        />
        <Button className="justify-self-start" 
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  </div>
  )
}
