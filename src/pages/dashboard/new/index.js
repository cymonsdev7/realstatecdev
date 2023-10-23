import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState } from 'react';
import { FiTrash, FiUpload } from 'react-icons/fi';
import { Container } from '../../../components/container';
import { useForm } from 'react-hook-form';
import { Input } from '../../../components/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '../../../contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { storage, db } from '../../../services/firebaseConnection';
import { ref, uploadBytes, getDownloadURL, deleteObject
// deleteObject
 } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
const schema = z.object({
    adress: z.string().nonempty('O campo endereço é obrigatório'),
    name: z.string().nonempty('O campo nome é obrigatório'),
    price: z.string().nonempty('O preço é obrigatório'),
    area: z.string().nonempty('A área é obrigatória'),
    bedrooms: z.string().nonempty('O campo dormitórios é obrigatório'),
    bathrooms: z.string().nonempty('O campo banheiros é obrigatório'),
    cookrooms: z.string().nonempty('O campo cozinha é obrigatório'),
    garages: z.string().nonempty('O campo garagens é obrigatório'),
    nameBroker: z.string().nonempty('O nome do corretor é obrigatório'),
    imageBroker: z.string().nonempty('A imagem do corretor é obrigatória'),
    description: z.string().nonempty('A descrição é obrigatória'),
    categories: z.string().nonempty('A categoria é obrigatória')
});
// COMPONENT FUNCITON PRINCIPAL
export const NewProperty = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange'
    });
    const [propertyImages, setPropertyImages] = useState([]);
    async function handleUpload(image) {
        if (!user?.uid) {
            return;
        }
        const currentUid = user?.uid;
        const uidImage = uuidv4();
        const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);
        uploadBytes(uploadRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downLoadUrl) => {
                console.log('URL DE ACESSO DA FOTO', downLoadUrl);
                const imageItem = {
                    name: uidImage,
                    uid: currentUid,
                    previewUrl: URL.createObjectURL(image),
                    url: downLoadUrl
                };
                setPropertyImages((images) => [...images, imageItem]);
            });
        });
    }
    // FUNCTION ONSUBMIT
    function onSubmit(data) {
        if (propertyImages.length === 0) {
            alert('Carregue alguma imagem!');
            return;
        }
        const propertyListImages = propertyImages.map((property) => {
            return {
                uid: property.uid,
                name: property.name,
                url: property.url
            };
        });
        addDoc(collection(db, 'property'), {
            name: data.name.toUpperCase(),
            adress: data.adress,
            price: data.price,
            area: data.area,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            cookrooms: data.cookrooms,
            garages: data.garages,
            nameBroker: data.nameBroker,
            imageBroker: data.imageBroker,
            description: data.description,
            categories: data.categories,
            create: new Date(),
            owner: user?.name,
            uid: user?.uid,
            images: propertyListImages
        })
            .then(() => {
            reset();
            setPropertyImages([]);
            console.log('CADASTRADO COM SUCESSO!');
        })
            .catch((error) => {
            console.log(error);
            console.log('ERRO AO CADASTRAR NO BANCO');
        });
    }
    // FUNCTION HANDLEDELETEIMAGE
    async function handleDeleteImage(item) {
        const imagePath = `images/${item.uid}/${item.name}`;
        const imageRef = ref(storage, imagePath);
        try {
            await deleteObject(imageRef);
            setPropertyImages(propertyImages.filter((proprerty) => proprerty.url !== item.url));
        }
        catch (err) {
            console.log('ERRO AO DELETAR IMAGEM');
        }
    }
    // FUNCTION HANDLEFILE
    async function handleFile(e) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];
            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                await handleUpload(image);
            }
            else {
                alert('Faça upload de uma imagem jpeg ou png!');
            }
        }
    }
    return (_jsxs(Container, { children: [_jsxs("h1", { className: "text-center text-4xl mb-14 font-bold text-indigo-700 mt-14", children: [_jsx("span", { className: "text-gray-500", children: "Cadastrar Destaques" }), " RE", _jsx("span", { className: "font-bold text-red-600 relative -top-1", children: "/" }), "MAX"] }), _jsxs("div", { className: "w-full shadow-sm bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2", children: [_jsxs("button", { className: "border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-700 h-32 md:w-48", children: [_jsx("div", { className: "absolute cursor-pointer", children: _jsx(FiUpload, { size: 30 }) }), _jsx("div", { className: "cursor-pointer", children: _jsx("input", { className: "opacity-0 cursor-pointer", type: "file", accept: "image/*", onChange: handleFile }) })] }), propertyImages.map((item) => (_jsxs("div", { className: "w-full h-32 flex items-center justify-center relative", children: [_jsx("button", { className: "absolute", onClick: () => handleDeleteImage(item), children: _jsx(FiTrash, { size: 30, color: "white" }) }), _jsx("img", { src: item.previewUrl, className: "rounded-lg w-full h-32 object-cover", alt: "Foto do im\u00F3vel" })] }, item.name)))] }), _jsx("div", { className: "w-full bg-white shadow-md p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2", children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "w-full", children: [_jsxs("div", { className: "grid md:grid-cols-2 items-center gap-4", children: [_jsxs("div", { className: "mb-3", children: [_jsx("p", { className: "mb-2 font-bold", children: "Nome do im\u00F3vel" }), _jsx(Input, { type: "text", register: register, name: "name", error: errors.name?.message, placeholder: "Nome do im\u00F3vel..." })] }), _jsxs("div", { className: "mb-3", children: [_jsx("p", { className: "mb-2 font-bold", children: "Endere\u00E7o" }), _jsx(Input, { type: "text", register: register, name: "adress", error: errors.adress?.message, placeholder: "Endere\u00E7o do im\u00F3vel..." })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 items-center gap-4", children: [_jsxs("div", { className: "w-full", children: [_jsx("p", { className: "mb-2 font-bold", children: "Pre\u00E7o" }), _jsx(Input, { type: "text", register: register, name: "price", error: errors.price?.message, placeholder: "Pre\u00E7o do im\u00F3vel..." })] }), _jsxs("div", { className: "w-full", children: [_jsx("p", { className: "mb-2 font-bold", children: "\u00C1rea Total" }), _jsx(Input, { type: "text", register: register, name: "area", error: errors.area?.message, placeholder: "Tamanho total da \u00E1rea..." })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 items-center gap-4", children: [_jsxs("div", { className: "w-full", children: [_jsx("p", { className: "mb-2 font-bold", children: "Dormit\u00F3rios" }), _jsx(Input, { type: "text", register: register, name: "bedrooms", error: errors.bedrooms?.message, placeholder: "Quantidade de dormit\u00F3rios..." })] }), _jsxs("div", { className: "w-full", children: [_jsx("p", { className: "mb-2 font-bold", children: "Banheiros" }), _jsx(Input, { type: "text", register: register, name: "bathrooms", error: errors.bathrooms?.message, placeholder: "Quantidade de banheiros..." })] })] }), _jsxs("div", { className: "grid gri md:grid-cols-2 items-center gap-4", children: [_jsxs("div", { className: "w-full", children: [_jsx("p", { className: "mb-2 font-bold", children: "Cozinhas" }), _jsx(Input, { type: "text", register: register, name: "cookrooms", error: errors.cookrooms?.message, placeholder: "Quantidade de cozinhas..." })] }), _jsxs("div", { className: "w-full", children: [_jsx("p", { className: "mb-2 font-bold", children: "Garagens" }), _jsx(Input, { type: "text", register: register, name: "garages", error: errors.garages?.message, placeholder: "Quantidade de garagens..." })] })] }), _jsxs("div", { className: "grid gri md:grid-cols-2 items-center gap-4", children: [_jsxs("div", { className: "w-full", children: [_jsx("p", { className: "mb-2 font-bold", children: "Nome do corretor" }), _jsx(Input, { type: "text", register: register, name: "nameBroker", error: errors.nameBroker?.message, placeholder: "Nome do corretor..." })] }), _jsxs("div", { className: "w-full", children: [_jsx("p", { className: "mb-2 font-bold", children: "Imagem do corretor" }), _jsx(Input, { type: "text", register: register, name: "imageBroker", error: errors.imageBroker?.message, placeholder: "imagem perfil do corretor..." })] })] }), _jsxs("div", { className: "w-full", children: [_jsx("p", { className: "mb-2 font-bold", children: "Descri\u00E7\u00E3o do im\u00F3vel" }), _jsx("textarea", { className: "mb-2 w-full rounded-md h-24 px-2 border-2 border-gray-200", ...register('description'), name: "description", id: "description", placeholder: "Digite a descri\u00E7\u00E3o do im\u00F3vel..." }), errors.description && (_jsx("p", { className: "mb-1 text-red-400", children: errors.description.message }))] }), _jsxs("div", { className: "w-full", children: [_jsx("p", { className: "mb-2 font-bold", children: "Categoria do im\u00F3vel" }), _jsxs("select", { className: "mb-2 w-full rounded-md h-12 px-2 border-2 border-gray-200", ...register('categories'), name: "categories", id: "categories", placeholder: "Escolha a categoria do im\u00F3vel...", children: [_jsx("option", { value: "Casas", children: "Casas" }), _jsx("option", { value: "Apartamentos", children: "Apartamentos" }), _jsx("option", { value: "Lotes", children: "Lotes" }), _jsx("option", { value: "Rural", children: "Rurais" })] }), errors.description && (_jsx("p", { className: "mb-1 text-red-400", children: errors.categories.message }))] }), _jsx("button", { type: "submit", className: "w-full rounded-md h-12 relative top-[0.1rem] hover:bg-indigo-500\n               transition duration-700 mt-7 cursor-pointer bg-indigo-700 text-white\n               font-medium", children: "Cadastrar" })] }) }), _jsx("br", {})] }));
};
