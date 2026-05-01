"use client";

import { useId, useMemo, useState } from "react";
import Select, { type SingleValue, type StylesConfig } from "react-select";

export type ReactSelectOption = {
  label: string;
  value: string;
};

type ReactSelectFieldProps = {
  label?: string;
  name: string;
  options: ReactSelectOption[];
  defaultValue?: string | null;
  placeholder?: string;
  emptyLabel?: string;
  isRtl?: boolean;
};

const styles: StylesConfig<ReactSelectOption, false> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#FFFFFF",
    borderColor: state.isFocused ? "#E87722" : "rgba(15, 61, 68, 0.15)",
    borderRadius: 6,
    boxShadow: "none",
    minHeight: 44,
    ":hover": {
      borderColor: state.isFocused ? "#E87722" : "rgba(15, 61, 68, 0.28)",
    },
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? "#E87722" : "rgba(15, 61, 68, 0.55)",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: "rgba(15, 61, 68, 0.1)",
  }),
  input: (base) => ({
    ...base,
    color: "#0F3D44",
  }),
  menu: (base) => ({
    ...base,
    border: "1px solid rgba(15, 61, 68, 0.1)",
    borderRadius: 8,
    boxShadow: "0 18px 55px rgba(15, 61, 68, 0.12)",
    overflow: "hidden",
    zIndex: 40,
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: "rgba(15, 61, 68, 0.55)",
    fontSize: 14,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#0F3D44" : state.isFocused ? "#F7F7F6" : "#FFFFFF",
    color: state.isSelected ? "#FFFFFF" : "#0F3D44",
    cursor: "pointer",
    fontSize: 14,
    paddingBlock: 10,
    paddingInline: 12,
    ":active": {
      backgroundColor: state.isSelected ? "#0F3D44" : "rgba(232, 119, 34, 0.12)",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "rgba(15, 61, 68, 0.45)",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#0F3D44",
  }),
  valueContainer: (base) => ({
    ...base,
    paddingInline: 12,
  }),
};

export function ReactSelectField({
  label,
  name,
  options,
  defaultValue,
  placeholder = "اختر",
  emptyLabel = "بدون اختيار",
  isRtl = true,
}: ReactSelectFieldProps) {
  const fieldId = useId();
  const resolvedOptions = useMemo(() => [{ label: emptyLabel, value: "" }, ...options], [emptyLabel, options]);
  const [selected, setSelected] = useState<ReactSelectOption>(
    resolvedOptions.find((option) => option.value === (defaultValue ?? "")) ?? resolvedOptions[0],
  );

  function handleChange(option: SingleValue<ReactSelectOption>) {
    setSelected(option ?? resolvedOptions[0]);
  }

  return (
    <div className="flex flex-col justify-between">
      {label ? (
        <label className="text-sm font-medium text-petrol" htmlFor={fieldId}>
          {label}
        </label>
      ) : null}
      <input name={name} type="hidden" value={selected.value} />
      <div className={label ? "mt-2" : undefined}>
        <Select
          instanceId={fieldId}
          inputId={fieldId}
          isClearable
          isRtl={isRtl}
          noOptionsMessage={() => "لا توجد نتائج"}
          onChange={handleChange}
          options={resolvedOptions}
          placeholder={placeholder}
          styles={styles}
          value={selected}
        />
      </div>
    </div>
  );
}
