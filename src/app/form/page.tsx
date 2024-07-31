'use client';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from 'primereact/button';
import FloatInput from '@/src/components/Input/FloatInput';
import { Divider } from "primereact/divider";
import DropdownInput from '@/src/components/Input/DropdownInput ';
import InputNumber from '@/src/components/Input/InputNumber';

type FormValues = {
    dropdown: string;
    name: string;
    email: string;
    age: string;
    tel: string;
    password: string
};

export default function Page() {
    const defaultValues: FormValues = {
        // dropdown: "3",
        // name: "4339",
        // email: "admin@j.com",
        // age: "12",
        // tel: '09-517782236',
        // password:"123456",
        dropdown: "",
        name: "",
        email: "",
        age: "",
        tel: '',
        password: "",
    };

    const methods = useForm<FormValues>({ defaultValues, shouldFocusError: true });
    const { handleSubmit, reset, control, formState: { errors } } = methods;

    const options = [
        { label: 'Option 1', key: '1' },
        { label: 'Option 2', key: '2' },
        { label: 'Option 3', key: '3' },
    ];

    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    const onSubmit = (data: FormValues) => {
        console.log(data);
        reset(defaultValues);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-x-4">
                    <FloatInput
                        name="name"
                        label="Name"
                        type="text"
                        rules={{ required: "Name is required." }}
                    />
                    <FloatInput
                        name="password"
                        label="Password"
                        type="password"
                        toggleMask
                        header={passwordHeader}
                        footer={passwordFooter}
                        rules={{ required: "Password is required." }}
                        maxLength={8}
                    />

                    <FloatInput
                        name="tel"
                        label="Tel"
                        type="tel"
                        placeholder="06-12345678"
                        mask='99-99999999' // การจัดวางรูปแบบ เลข 9 หมายถึง พิมพืได้ 0-9 
                        rules={{ required: "Tel is required." }}
                    />
                    <FloatInput
                        name="email"
                        label="Email"
                        type="email"
                        rules={{
                            required: "Email is required.",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address. E.g. example@email.com",
                            },
                        }}
                    />
                    <DropdownInput
                        name="dropdown"
                        label="Dropdown"
                        options={options}
                        placeholder="Select an option"
                        filter //ใช้สำหรับ เมื่อตต้องการพิมพ์ค้นหา ใน dropdown
                    />
                    <InputNumber
                        name="number"
                        label="Number"
                        // type="text"
                        // rules={{ required: "Name is required." }}
                    />
                </div>
                <FloatInput
                    name="textarea"
                    label="Textarea"
                    type="textarea"
                />
                <Button type="submit" className="bg-black text-white p-2 mt-4">บันทึก</Button>
            </form>
        </FormProvider>
    );
}
