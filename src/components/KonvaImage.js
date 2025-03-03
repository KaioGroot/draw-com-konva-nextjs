'use client';
import React, { useEffect, useRef } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';

const KonvaImageComponent = ({ image }) => {
    const stageRef = useRef(null);
    const layerRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const stage = new Konva.Stage({
            container: stageRef.current,
            width: image.width,
            height: image.height,
        });

        const layer = new Konva.Layer();
        stage.add(layer);
        layerRef.current = layer;

        const imageObj = new KonvaImage({
            image: image,
            x: 0,
            y: 0,
            draggable: true,
        });

        layer.add(imageObj);
        imageRef.current = imageObj;
    }, [image]);

    return <Stage ref={stageRef} width={image.width} height={image.height} />;
};

export default KonvaImage;
