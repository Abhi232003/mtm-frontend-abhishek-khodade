import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/earth_b.gltf');

  // Rotate the Earth around its own axis


  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Clouds_2_Clouds_1.geometry} material={materials.Clouds} />
      <mesh geometry={nodes.Ocean_Mat_0.geometry} material={materials.material} position={[0, 0, -0]} />
      <mesh geometry={nodes.CONT_Extrude_Mat3_0.geometry} material={materials['Mat.3']} position={[-64.303, 10.837, 500]} />
      <mesh geometry={nodes.SP_Extrude_Ice_0.geometry} material={materials.material_3} position={[0, 500, 0]} />
      <mesh geometry={nodes.NP_Extrude_Ice_0.geometry} material={materials.material_3} position={[0, -500, 0]} />
    </group>
  );
}

useGLTF.preload('/earth_b.gltf');
