'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Line, Image as KonvaImage, Transformer } from 'react-konva';

const KonvaCanvas = ({ image, width, height, brushColor, brushSize, isEraser, quadrado, retangulo, circulo }) => {
    const stageRef = useRef(null);
    const layerRef = useRef(null);
    const transformerRef = useRef(null);
    const isDrawing = useRef(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [criando, setCriando] = useState(false);

    const [selectedShape, setSelectedShape] = React.useState(null);

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        setSelectedShape(e.target);
        const stage = stageRef.current.getStage();
        const layer = layerRef.current;
        const pos = stage.getPointerPosition();
        const line = new Konva.Line({
            stroke: isEraser ? 'white' : brushColor,
            strokeWidth: brushSize,
            globalCompositeOperation: isEraser ? 'destination-out' : 'source-over',
            points: [pos.x, pos.y],
            lineCap: 'round',
            lineJoin: 'round',
            tension: 0.1,
        });
        layer.add(line);
        layer.batchDraw();
    };

    const mouseClick = function (e) {
        setSelectedShape(e.target);
    };

    const criarquadrado = (e) => {
        const stage = stageRef.current.getStage();
        const layer = layerRef.current;
        const pos = stage.getPointerPosition();
        const square = new Konva.Rect({
            x: pos.x,
            y: pos.y,
            width: 0,
            height: 0,
            fill: 'transparent',
            stroke: brushColor,
            strokeWidth: brushSize,
            globalCompositeOperation: isEraser ? 'destination-out' : 'source-over',
        });
        layer.add(square);
        layer.batchDraw();

        const handleMouseMove = (e) => {
            const newPos = stage.getPointerPosition();
            const width = newPos.x - pos.x;
            const height = newPos.y - pos.y;
            square.width(width);
            square.height(height);
            layer.batchDraw();
        };

        const handleMouseUp = () => {
            setCriando(false);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        setCriando(true);
    };

    const criarcirculo = (e) => {
        const stage = stageRef.current.getStage();
        const layer = layerRef.current;
        const pos = stage.getPointerPosition();
        const square = new Konva.Circle({
            x: pos.x,
            y: pos.y,
            stroke: 'black',
            strokeWidth: brushSize,
            width: 20,
            height: 20,
            fill: 'transparent',
        });
        layer.add(square);
        layer.batchDraw();

        const handleMouseMove = (e) => {
            const newPos = stage.getPointerPosition();
            const width = newPos.x - pos.x + 20;
            const height = newPos.y - pos.y / window.innerHeight;
            if (width <= 0 || height <= 0) return;
            square.width(width);
            square.height(height);
            layer.batchDraw();
        };

        const handleMouseUp = () => {
            setCriando(false);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        setCriando(true);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) return;
        const stage = stageRef.current.getStage();
        const layer = layerRef.current;
        const pos = stage.getPointerPosition();
        const lastLine = layer.getChildren().slice(-1)[0]; // Última linha adicionada

        if (lastLine instanceof Konva.Line) {
            lastLine.points(lastLine.points().concat([pos.x, pos.y]));
            layer.batchDraw();
        }
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    useEffect(() => {
        if (transformerRef.current) {
            transformerRef.current.nodes(selectedShape ? [selectedShape] : []);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [image, transformerRef]);

    return (
        <Stage
            ref={stageRef}
            width={width}
            onClick={setSelectedShape}
            onMouseDown={circulo ? criarcirculo : handleMouseDown && quadrado ? criarquadrado : handleMouseDown}
            height={height}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <Layer ref={layerRef}>
                {image && (
                    <KonvaImage
                        stroke={isEraser ? 'white' : brushColor}
                        scaleX={1}
                        draggable={true}
                        image={image}
                        x={0}
                        y={0}
                        width={width}
                        height={height}
                        globalCompositeOperation={isEraser ? 'destination-out' : 'source-over'}
                    />
                )}

                {selectedShape && <Transformer ref={transformerRef} />}
            </Layer>
        </Stage>
    );
};

export default KonvaCanvas;
