"use client";

import React, { useEffect, useState } from "react";
import { PlusIcon } from "@/components/icons";
import { Button } from "../Button";

interface PairsListProps {
  label?: string;
  onChange: (items: Record<string, string>) => void;
}

export const PairsList: React.FC<PairsListProps> = ({ label, onChange }) => {
  const [items, setItems] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const keyInputRef = React.useRef<HTMLInputElement>(null);
  const valueInputRef = React.useRef<HTMLInputElement>(null);

  const handleAddItem = () => {
    const key = keyInputRef.current;
    const value = valueInputRef.current;

    if (key && value) {
      setItems((p) => {
        const newItems = { ...p, [key.value]: value.value };
        onChange(newItems);
        return newItems;
      });
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-[24rem]">
      {label && <label className="block mb-2">{label}</label>}
      <div className="flex flex-col gap-2">
        {!Object.entries(items).length && (
          <p className="text-foreground-dark">This list is empty.</p>
        )}
        {Object.entries(items).map(([key, value], index) => (
          <div key={index} className="flex flex-col">
            <span className="text-sm text-foreground-dark">{key}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      {isEditing && (
        <div className="flex gap-1.5">
          <div className="bg-default rounded-md border border-border flex">
            <input
              ref={keyInputRef}
              className="bg-transparent px-3 py-1.5 w-full"
            />
            <input
              ref={valueInputRef}
              className="bg-transparent px-3 py-1.5 border-l border-border w-full"
            />
          </div>
          <Button
            variant="outline"
            iconOnly
            startContent={<PlusIcon />}
            type="button"
            onClick={handleAddItem}
          ></Button>
        </div>
      )}
      <button
        type="button"
        className="mt-3 bg-default-800 px-4 py-1 rounded-md border border-border w-full flex justify-center items-center hover:bg-default-700"
        onClick={() => setIsEditing(true)}
      >
        <PlusIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
