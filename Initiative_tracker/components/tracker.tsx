"use client";
import { useState, useEffect } from "react";
import CharForm from "./charform";
import CopyList from "./copylist";
import CharCard from "./charcard";

import { Button } from "@/components/ui/button"
import { Char } from "@/lib/utils";
import ConditionForm from "./conditionform";
import { ResponsiveDialog } from "./responsive-dialog";


export default function Tracker() {
    const [chars, setChars] = useState<Char[]>([]);
    const [isCustomOpen, setIsCustomOpen] = useState<boolean>(false);
    const [isConcentrationOpen, setIsConcentrationOpen] = useState<boolean>(false);
    const [charId, setCharId] = useState<string | null>(null);
    const [conType, setConType] = useState<number | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedChars = localStorage.getItem("chars");
            setChars(savedChars ? JSON.parse(savedChars) : []);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("chars", JSON.stringify(chars));
        }
    }, [chars]);

    const addChar = (newChar: string, newRoll: number): void => {
        if (newChar.trim() !== "") {
            const updatedChars = [...chars, {
                id: crypto.randomUUID(), 
                name: newChar, 
                roll: newRoll, 
                conditions: [], 
                damage: 0
            }];
            
            updatedChars.sort((a, b) => b.roll - a.roll);
            setChars(updatedChars);
        }
    };

    const updateCharDamage = (editingCharId: string| null, editedCharDamage: number | null): void => {
        if (editedCharDamage !== null) {
            setChars(
                chars.map((char) =>
                    char.id === editingCharId ? { ...char, damage: editedCharDamage } : char
                )
            );
        }
    };

    const addCharConditions = (editingCharId: string | null, editedCharCond: string): void => {
        const conDetails = editedCharCond.split(" |");
    
        if (conDetails[0] === "Concentration") {
            setCharId(editingCharId);
            setIsConcentrationOpen(true);
            setConType(0);
            return;
        }
    
        if (conDetails[0] === "Custom") {
            setCharId(editingCharId);
            setIsCustomOpen(true);
            setConType(1);
            return;
        }

        setChars((prevChars) =>
            prevChars.map((char) => {
                if (char.id === editingCharId) {
                    const conditionExists = char.conditions.some(cond => JSON.stringify(cond) === JSON.stringify(conDetails));
                    
                    if (!conditionExists) {
                        return { ...char, conditions: [...char.conditions, conDetails] };
                    }
                }
                return char;
            })
        );
    };

    const addCharConditionsCustom = (editedCharCond: string): void => {
        if (charId && conType !== null) {
            const conDetails: string[] = [];
            let pref = "";
            let desc = "";

            switch(conType) { 
                case 0:
                    pref = `Concentration: ${editedCharCond}`;
                    desc = "Concentrating on a spell";
                    break;
                default:
                    pref = editedCharCond;
                    desc = "Custom Condition";
                    break;
            } 

            conDetails.push(pref);
            conDetails.push(desc);

            setChars((prevChars) =>
                prevChars.map((char) => {
                    if (char.id === charId) {
                        const conditionExists = char.conditions.some(cond => JSON.stringify(cond) === JSON.stringify(conDetails));
                        
                        if (!conditionExists) {
                            return { ...char, conditions: [...char.conditions, conDetails] };
                        }
                    }
                    return char;
                })
            );

            setCharId(null);
            setConType(null);
        }
    };

    const deleteCharConditions = (editingCharId: string | null, editedCharCond: string): void => {
        setChars(
            chars.map((char) =>
                char.id === editingCharId 
                    ? { ...char, conditions: char.conditions.filter((cond) => cond[0] !== editedCharCond)} 
                    : char
            )
        );
    };

    const deleteChar = (id: string): void => {
        setChars(chars.filter((char) => char.id !== id));
    };

    const clearList = (): void => {
        setChars([]);
    };

    if (chars === null) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="col-span-8 col-start-3 m-3 text-white grid grid-cols-1 grid-rows-auto gap-4">
            <ResponsiveDialog isOpen={isConcentrationOpen} setIsOpen={setIsConcentrationOpen} title="Concentration">
                <ConditionForm addCharConditionsCustom={addCharConditionsCustom} setIsOpen={setIsConcentrationOpen} />
            </ResponsiveDialog>

            <ResponsiveDialog isOpen={isCustomOpen} setIsOpen={setIsCustomOpen} title="Custom">
                <ConditionForm addCharConditionsCustom={addCharConditionsCustom} setIsOpen={setIsCustomOpen} />
            </ResponsiveDialog>

            <h1 className="text-5xl text-center">Initiative Tracker</h1>
            <CharForm addChar={addChar} />
            <Button className="justify-self-start" onClick={clearList}>Clear</Button>
            <CopyList chars={chars} />
            <h1 className="text-2xl">Characters</h1>
            <div className="grid grid-cols-1 grid-rows-auto gap-4">
                {chars.map(c => (
                    <div key={c.id}>
                        <CharCard char={c} deleteCharConditions={deleteCharConditions} addCharConditions={addCharConditions} updateCharDamage={updateCharDamage} deleteChar={deleteChar} />
                    </div>
                ))}
            </div>
        </div>
    );
}
