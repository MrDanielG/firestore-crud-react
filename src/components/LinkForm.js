import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { db } from '../firebase';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const LinkForm = ({ addOrEditLink, currentId, links }) => {
    const [form] = Form.useForm();

    const initialStateValues = {
        url: '',
        name: '',
        description: '',
    };

    // const [values, setValues] = useState(initialStateValues);

    const onFinish = (values) => {
        form.resetFields();
        addOrEditLink(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const getLinkById = async (id) => {
        const doc = await db.collection('links').doc(id).get();
        form.setFieldsValue(doc.data());
    };

    useEffect(() => {
        if (currentId === '') {
            form.resetFields();
        } else {
            getLinkById(currentId);
            console.log('Editando');
        }
    }, [currentId]);

    return (
        <Form
            {...layout}
            form={form}
            name="basic"
            initialValues={initialStateValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            // onValuesChange={handleChange}
        >
            <Form.Item
                label="Inserta URL"
                name="url"

                // onChange={handleChange}
                // rules={[
                //     { required: true, message: 'Please input your username!' },
                // ]}
            >
                <Input placeholder="www.facebook.com" />
            </Form.Item>

            <Form.Item
                label="Nombre Sitio:"
                name="name"
                // rules={[
                //     { required: true, message: 'Please input your username!' },
                // ]}
            >
                <Input placeholder="Facebook" />
            </Form.Item>

            <Form.Item name="description" label="Descripcion">
                <Input.TextArea placeholder="Pagina para compartir fotos y memingos" />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    {currentId === '' ? 'Guardar' : 'Editar'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LinkForm;
