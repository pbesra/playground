import React, { useEffect, useState } from "react";

export type nameType = {
  name: string;
  isChecked: boolean;
};

type childProps = {
  setHasChanged?: (_hasChanged: boolean) => void;
};

export const Child = ({ setHasChanged }: childProps) => {
  const items: nameType[] = [
    { name: "play", isChecked: true },
    { name: "sing", isChecked: false },
    { name: "dance", isChecked: false },
    { name: "fly", isChecked: false },
    { name: "run", isChecked: true },
    { name: "walk", isChecked: false },
    { name: "fight", isChecked: false },
    { name: "swim", isChecked: false },
    { name: "code", isChecked: true },
  ];

  const [names, setNames] = useState<nameType[]>(items);

  const handleChange = (name: string, isChecked: boolean) => {
    const newState = names.map((x) => {
      if (x.name === name) {
        x.isChecked = isChecked;
      }
      return x;
    });
    setNames(newState);
  };

  const areEqual = (arr1: nameType[], arr2: nameType[]) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  };

  useEffect(() => {
    setHasChanged?.(!areEqual(names, items));
  }, [names]);

  return (
    <div role="child">
      {names.map((item) => (
        <div
          key={item.name}
          style={{
            border: items.find((x) => x.name === item.name)?.isChecked
              ? "1px solid green"
              : "",
          }}
        >
          <input
            type="checkbox"
            checked={item.isChecked}
            onChange={(e) => handleChange(item.name, e.target.checked)}
            role={item.name}
          />
          {item.name}
        </div>
      ))}
    </div>
  );
};
