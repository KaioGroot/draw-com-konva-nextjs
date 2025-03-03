'use client';
import KonvaCanvas from '@/components/KonvaCanvas';
import { useState, useEffect } from 'react';
import KonvaImage from '@/components/KonvaImage';

export default function Home() {
    const [brushColor, setBrushColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [isEraser, setIsEraser] = useState(false);
    const [image, setImage] = useState(null);
    const [drag, setDrag] = useState(false);
    const [quadrado, setQuadrado] = useState(false);
    const [retangulo, setRetangulo] = useState(false);
    const [circulo, setCirculo] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => setImage(img);
            };
            reader.readAsDataURL(file);
        }
    };

    const limparQuadro = () => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    const baixarImagem = () => {
        const link = document.createElement('a');
        link.download = 'desenho.png';
        link.href = document.querySelector('canvas').toDataURL('image/png');
        link.click();
    };

    useEffect(() => {
        if (quadrado) {
            setCirculo(false);
            document.getElementById('circulo').style.display = quadrado ? 'none' : 'initial';
        } else {
            document.getElementById('circulo').style.display = quadrado ? 'none' : 'initial';
        }
        if (circulo) {
            setQuadrado(false);
            setRetangulo(false);
            //deixar os outros elementos html invisiveis
            document.getElementById('quadrado').style.display = circulo ? 'none' : 'initial';
            //document.getElementById('circulo').style.display = circulo ? 'none' : 'initial';
        } else {
            document.getElementById('quadrado').style.display = circulo ? 'none' : 'initial';
        }
    }, [quadrado, circulo]);
    return (
        <div className="flex justify-center gap-4 items-center h-screen bg-gray-100">
            <div className="flex-col gap-40 items-center h-[74%] w-90 bg-white rounded-2xl shadow-lg p-6 mb-4">
                <h2 className="text-xl font-bold text-center mb-4">Selecione as formas</h2>
                <div className="grid grid-cols-1 gap-4">
                    <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition">Limpar quadro</button>
                    <button
                        onClick={() => setDrag(!drag)}
                        className="bg-blue-500 w-20 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-mouse-pointer-2"
                        >
                            <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z" />
                        </svg>
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <button
                        onClick={(e) => setQuadrado(!quadrado)}
                        id="quadrado"
                        className="bg-purple-500 text-white font-bold py-2 w-20  px-4 rounded-full hover:bg-purple-600 transition"
                    >
                        {quadrado ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-square"
                            >
                                <rect width="18" height="18" x="3" y="3" rx="2" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-pencil-line"
                            >
                                <path d="M12 20h9" />
                                <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                <path d="m15 5 3 3" />
                            </svg>
                        )}
                    </button>
                    <button
                        onClick={(e) => setCirculo(!circulo)}
                        id="circulo"
                        className="bg-pink-500 text-white font-bold py-2 px-4 rounded-full hover:bg-pink-600 transition"
                    >
                        {circulo ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-circle"
                            >
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-pencil-line"
                            >
                                <path d="M12 20h9" />
                                <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                                <path d="m15 5 3 3" />
                            </svg>

                        )}
                    </button>
                </div>
            </div>
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-2xl font-bold text-center mb-4">Página de Desenho</h1>
                <div className="flex justify-between mb-4">
                    <div className="flex items-center">
                        <input type="file" id="imageData" className="hidden" onChange={handleImageUpload} />
                        <button
                            onClick={() => document.getElementById('imageData').click()}
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition"
                        >
                            Enviar Imagem
                        </button>
                        <button
                            onClick={baixarImagem}
                            className="bg-green-500 text-white font-bold py-2 px-4 rounded-full ml-2 hover:bg-green-600 transition"
                        >
                            Baixar Imagem
                        </button>
                    </div>

                    <div className="flex items-center">
                        <label className="mr-2">Tamanho:</label>
                        <input
                            type="range"
                            min="1"
                            max="18"
                            value={brushSize}
                            onChange={(e) => setBrushSize(Number(e.target.value))}
                            className="w-24 border border-purple-400 rounded-full"
                            style={{
                                width: '100%',
                                appearance: 'none',
                                background: 'linear-gradient(to right, #333 0%, #333 100%)',
                                backgroundSize: `${(brushSize * parent.innerWidth) / 180}px 100%`,
                                backgroundRepeat: 'no-repeat',
                                borderRadius: '10px',
                                padding: '0.5rem',
                            }}
                        />
                        <label className="ml-2">Cor:</label>
                        <input
                            type="color"
                            value={brushColor}
                            onChange={(e) => setBrushColor(e.target.value)}
                            className="w-8 h-8 rounded-full border-purple-200"
                        />
                        <label className="ml-2">Eraser:</label>
                        <input type="checkbox" checked={isEraser} onChange={(e) => setIsEraser(e.target.checked)} className="w-8 h-8" />
                    </div>
                </div>
                <KonvaCanvas
                    image={image ? image : null}
                    width={800}
                    height={600}
                    brushColor={brushColor}
                    brushSize={brushSize}
                    isEraser={isEraser}
                    quadrado={quadrado}
                    circulo={circulo}
                />
            </div>
        </div>
    );
}
