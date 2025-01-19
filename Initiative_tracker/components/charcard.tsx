"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Char } from "@/lib/utils";
import { Badge } from "@/components/ui/badge"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";

export default function CharCard({
    char,
    updateCharDamage,
    deleteChar,
    addCharConditions,
    deleteCharConditions
}: {
    char: Char,
    updateCharDamage: (editingCharId: number | null, editedCharDamage: number | null) => void,
    addCharConditions: (editingCharId: number | null, editedCharCond: string) => void, 
    deleteCharConditions: (editingCharId: number | null, editedCharCond: string) => void, 
    deleteChar: (id: number) => void
}) {

    function updateDamage(e: React.ChangeEvent<HTMLInputElement>){
        updateCharDamage(char.id, parseInt(e.target.value));
    }


    return (
        <div className="border-white bg-black border-4 text-white grid grid-cols-1 2xl:grid-cols-9 gap-4 p-4 items-center">
            <h1 className="col-span-1">Name: {char.name}</h1>
            <h1 className="col-span-1">Roll: {char.roll}</h1>
            <h1 className="col-span-1">Conditions:</h1>
            <div className="col-span-1">
                <Select 
                    value={""} 
                    onValueChange={(value) => addCharConditions(char.id, value)}
                >
                    <SelectTrigger className="text-black">
                        <SelectValue placeholder="Conditions"/>
                    </SelectTrigger>
                    <SelectContent className="text-black">
                        <SelectGroup>
                            <SelectLabel>Conditions</SelectLabel>
                            <SelectItem 
                                value="Blinded
                                |Automatically fails any ability check that requires sight.
                                |Disadvantage on attack rolls.
                                |Attack rolls against the creature have advantage."
                            >
                                Blinded
                            </SelectItem>
                            <SelectItem 
                                value="Charmed
                                |Can’t attack the charmer.
                                |Can'ttarget the charmer with harmful abilities or magical effects.
                                |The charmer has advantage on any ability check to interact socially with the creature."
                            >
                                Charmed
                            </SelectItem>
                            <SelectItem 
                                value="Deafened
                                |Automatically fails any ability check that requires hearing."
                            >
                                Deafened
                            </SelectItem>
                            <SelectItem 
                                value="Frightened
                                |Disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.
                                |Can’t willingly move closer to the source of its fear."
                            >
                                Frightened
                            </SelectItem>
                            <SelectItem 
                                value="Grappled
                                |Speed becomes 0."
                            >
                                Grappled
                            </SelectItem>
                            <SelectItem 
                                value="Incapacitated
                                |Can’t take actions or reactions."
                            >
                                Incapacitated
                            </SelectItem>
                            <SelectItem 
                                value="Invisible
                                |Attack rolls against the creature have disadvantage.
                                |The creature’s attack rolls have advantage."
                            >
                                Invisible
                            </SelectItem>
                            <SelectItem 
                                value="Paralyzed
                                |A paralyzed creature is incapacitated.
                                |Can’t move or speak.
                                |Automatically fails Strength and Dexterity saving throws.
                                |Attack rolls against the creature have advantage.
                                |Any attack that hits the creature is a critical hit if the attacker is within 5 feet."
                            >
                                Paralyzed
                            </SelectItem>
                            <SelectItem 
                                value="Poisoned
                                |Disadvantage on attack rolls and ability checks."
                            >
                                Poisoned
                            </SelectItem>
                            <SelectItem 
                                value="Prone
                                |The creature has disadvantage on attack rolls.
                                |An attack roll against the creature has advantage if the attacker is within 5 feet of the creature. 
                                |Ranged Attacks on the creature have disadvatange."
                            >
                                Prone
                            </SelectItem>
                            <SelectItem 
                                value="Restrained
                                |Speed becomes 0.
                                |Attack rolls against the creature have advantage.
                                |The creature’s attack rolls have disadvantage.
                                |Disadvantage on Dexterity saving throws."
                            >
                                Restrained
                            </SelectItem>
                            <SelectItem 
                                value="Stunned
                                |A stunned creature is incapacitated, can’t move, and can speak only falteringly.
                                |Automatically fails Strength and Dexterity saving throws.
                                |Attack rolls against the creature have advantage."
                            >
                                Stunned
                            </SelectItem>
                            <SelectItem 
                                value="Exhaustion 1
                                |Disadvantage on ability checks"
                            >
                                Exhaustion 1
                            </SelectItem>
                            <SelectItem 
                                value="Exhaustion 2
                                |Speed halved"
                            >
                                Exhaustion 2
                            </SelectItem>
                            <SelectItem 
                                value="Exhaustion 3
                                |Disadvantage on attack rolls and saving throws"
                            >
                                Exhaustion 3
                            </SelectItem>
                            <SelectItem 
                                value="Exhaustion 4
                                |Hit point maximum halved"
                            >
                                Exhaustion 4
                            </SelectItem>
                            <SelectItem 
                                value="Exhaustion 5
                                |Speed reduced to 0"
                            >
                                Exhaustion 5
                            </SelectItem>
                            <SelectItem 
                                value="Exhaustion 6
                                |Death"
                            >
                                Exhaustion 6
                            </SelectItem>
                            <SelectItem 
                                value="Concentration
                                |Concentrating on a spell"
                            >
                                Concentration
                            </SelectItem>
                            <SelectItem 
                                value="Custom
                                |Custom Condition"
                            >
                                Custom
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="col-span-1 2xl:col-span-3 grid grid-cols-1 2xl:grid-cols-3 gap-1 place-items-stretch 2xl:place-items-evenly">
                {
                    char.conditions.map(
                        c => 
                            < TooltipProvider key={c[0]}>
                                <Tooltip>
                                    <TooltipTrigger className="bg-red-500 p-1 overflow-clip rounded-lg col-span-1" 
                                        onClick={(value) => deleteCharConditions(char.id, c[0])}
                                    >
                                        {c[0]}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <ul>
                                            {
                                                c.slice(1).map(d =>
                                                    <li key={d}>{d}</li>
                                                )
                                            }
                                        </ul>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                    )
                }
            </div>
            <Input className="text-black col-span-1 2xl:col-start-8" 
                type="number" 
                onChange={(e) => updateDamage(e)} 
                defaultValue={char.damage}
            />
            <Button className="m-2 col-span-1 2xl:col-start-9" 
                variant="destructive" 
                onClick={() => deleteChar(char.id)}
            >
                    Delete
            </Button>
        </div>
    );
}