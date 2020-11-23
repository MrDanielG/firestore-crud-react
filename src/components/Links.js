import React, { useEffect, useState } from 'react';
import LinkForm from './LinkForm';
import { db } from '../firebase';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Links = () => {
    const { Meta } = Card;
    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEditLink = async (linkObj) => {
        try {
            if (currentId === '') {
                await db.collection('links').doc().set(linkObj);
                console.log('Nuevo Link agregado');
            } else {
                await db.collection('links').doc(currentId).update(linkObj);
                console.log('Link Actualizado');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getlinks = async () => {
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);
            console.log(docs);
        });
    };

    const onDeleteLink = async (id) => {
        await db.collection('links').doc(id).delete();
        console.log('Link Eliminado');
    };

    useEffect(() => {
        getlinks();
    }, []);

    return (
        <div>
            <LinkForm {...{ addOrEditLink, currentId, links }} />

            {links.map(({ id, name, url, description }) => (
                <div key={id}>
                    <Card
                        style={{ width: 300 }}
                        actions={[
                            <DeleteOutlined
                                key="delete"
                                onClick={() => onDeleteLink(id)}
                            />,
                            <EditOutlined
                                key="edit"
                                onClick={() => setCurrentId(id)}
                            />,
                        ]}
                    >
                        <Meta title={name} description={description} />
                        <br />
                        <p>{url}</p>
                    </Card>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default Links;
