import React, {useState} from "react";
import Input from "@/components/form/elements/input";
import Button from "@/components/form/elements/button";
import DatePicker from "react-datepicker";
import {retry} from "@reduxjs/toolkit/query";
import AutoInput, {AutoDataSource} from "@/components/form/elements/autoInput";
import SelectInput from "@/components/form/elements/SelectInput";

export enum FieldType {
    TEXT = 'text',
    PASSWORD = 'password',
    DROPDOWN = 'dropdown',
    CHECKBOX = 'checkbox',
    RADIO = 'radio',
    TEXTAREA = 'textarea',
    FILE = 'file',
    DATETIME = 'datetime',
    AUTOCOMPLETE = 'autocomplete',
}

type FormField<FieldValue> = {
    name: string,
    type: FieldType,
    label?: string,
    placeholder?: string,
    source?: AutoDataSource<any>,
    title?: (val: FieldValue) => string,
}

function FormFieldElement<T>(
    {
        field,
        value,
        onValueChange
    }: {field: FormField<T>, value: any, onValueChange: ((value: any) => void) }
) {

    if (field.type == FieldType.TEXT) {
        return <div className="mt-2">
            <label className="text-lg font-semibold">{field?.label || field.name}</label>
            <Input
                block
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onValueChange(e.target.value)}
                placeholder={field.placeholder}
            />
        </div>
    }

    if (field.type == FieldType.DATETIME) {
        return <div className="mt-2">
            <label className="text-lg font-semibold">{field?.label || field.name}</label>
            <Input
                block
                type="datetime"
                placeholder={field.placeholder}
                value={value}
                onChange={(e) => onValueChange(e)}
            />
        </div>
    }

    if (field.type == FieldType.AUTOCOMPLETE) {
        return <div className="mt-2">
            <label className="text-lg font-semibold">{field?.label || field.name}</label>
            <AutoInput
                title={field.title || (() => "no title")}
                source={field.source || (async () => [])}
                onSelect={(e) => onValueChange(e)}
            />
        </div>
    }

    if (field.type == FieldType.DROPDOWN) {
        return <div className="mt-2">
            <label className="text-lg font-semibold">{field?.label || field.name}</label>
            <SelectInput
                onSelect={(e) => onValueChange(e)}
                source={field.source || (async () => [])}
                title={field.title || (() => "no title")}
            />
        </div>
    }

    return <p> Field type is not supported </p>

}

export default function FormTemplate(
    {
        fields,
        onSubmit,
        title,
        submitText = "Submit",
        onDataChange = () => null,
    }: {fields: FormField<any>[], title?: string, onSubmit?: (({})=>void), submitText?: string, onDataChange?: (({})=>void)}
) {

    const [formState, setFormState] = useState({} as {[key: string]: any});

    function updateOwnAndParentState(field: FormField<unknown>, value: any) {
        setFormState({...formState, [field.name]: value});
        onDataChange({...formState, [field.name]: value});
    }

    function submitForm() {
        onSubmit && onSubmit(formState);
        for (const field of fields) {
            setFormState({...formState, [field.name]: ""})
        }
    }

    return <div className="py-4 bg-gray-100 px-2 rounded-md shadow-lg">
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="mt-8">
            {fields.map((field, i) => {
                return <FormFieldElement
                    key={field.name}
                    field={field}
                    value={formState[field.name] || ""}
                    onValueChange={(value: any) => {
                        updateOwnAndParentState(field, value)
                    }
                    }/>
            })}
        </div>
        <div className="mt-8">
            <Button block onClick={submitForm}> {submitText} </Button>
        </div>
    </div>

}