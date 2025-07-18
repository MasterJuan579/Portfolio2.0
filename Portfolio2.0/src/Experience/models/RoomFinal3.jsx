import React from 'react';
import { useGLTF } from '@react-three/drei';
import { convertirMaterialesABasic } from '../utils/ConvertToBasic';

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models/RoomFinal3.glb');
  const basicMaterials = convertirMaterialesABasic(materials);

  return (
    <group {...props} dispose={null}>

      {/* Todo el cuarto escalado */}
      <group scale={[0.7, 0.7, 0.7]}>
        <mesh geometry={nodes.Plane002.geometry} material={basicMaterials.AzulOscuro} position={[0, -0.15, 0]}/>
        <mesh geometry={nodes.Wall.geometry} material={basicMaterials.AzulPared} position={[0, 2.5, 0]} />

        <group position={[-1.928, 2.032, -0.392]} rotation={[-Math.PI, 0.541, -Math.PI]}>
          <mesh geometry={nodes.Cube010.geometry} material={basicMaterials['Brown Fabric']} />
          <mesh geometry={nodes.Cube010_1.geometry} material={basicMaterials.NegroDomo} />
          <mesh geometry={nodes.Cube010_2.geometry} material={basicMaterials.DomoBlanco} />
          <mesh geometry={nodes.Cube010_3.geometry} material={basicMaterials.RojoDomo} />
        </group>

        <mesh geometry={nodes.Buro.geometry} material={basicMaterials.CafeMaderaBuro} position={[-3.022, 2.051, -2.684]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} />

        <group position={[2.754, 2.08, -1.042]} rotation={[0, Math.PI / 4, 0]}>
          <mesh geometry={nodes.Cube.geometry} material={basicMaterials.NegroSilla} />
          <mesh geometry={nodes.Cube_1.geometry} material={basicMaterials.AzulRubick} />
          <mesh geometry={nodes.Cube_2.geometry} material={basicMaterials.RojoRubick} />
          <mesh geometry={nodes.Cube_3.geometry} material={basicMaterials.GrisClaro} />
          <mesh geometry={nodes.Cube_4.geometry} material={basicMaterials.VerdeRubick} />
        </group>

        <mesh geometry={nodes.Floor.geometry} material={basicMaterials.Piso} position={[0, 0.2, 0]}>
          <mesh geometry={nodes.Floor001.geometry} material={basicMaterials.MaderaPiso} />
        </mesh>

        <group position={[-1.841, 1.065, 0]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} scale={[2.626, 1.511, 2.006]}>
          <mesh geometry={nodes.Cube001.geometry} material={basicMaterials.AzulCama} />
          <mesh geometry={nodes.Cube001_1.geometry} material={basicMaterials.CafeMadera} />
          <mesh geometry={nodes.Cube001_2.geometry} material={basicMaterials['Bed sheet material black.002']} />
          <mesh geometry={nodes.Cube001_3.geometry} material={basicMaterials.NegroClaro} />
          <mesh geometry={nodes.Cube006.geometry} material={basicMaterials.AzulAlmohada} position={[-0.295, -0.38, 0.747]} rotation={[-0.206, -0.454, -0.071]} scale={[1.931, 0.615, 1.445]} />
        </group>

        <group position={[-0.101, 4.035, -3.834]} scale={[4, 2.491, 4]}>
          <mesh geometry={nodes.Cube025.geometry} material={basicMaterials.NegroPersiana} />
          <mesh geometry={nodes.Cube025_1.geometry} material={basicMaterials.GrisPersiana} />
        </group>

        <group position={[-0.1, 3.238, -4.448]} scale={[4, 2.5, 4]}>
          <mesh geometry={nodes.Cube017.geometry} material={basicMaterials.WoodWindow} />
          <mesh geometry={nodes.Cube017_1.geometry} material={basicMaterials.DarkBlueWindow} />
        </group>

        <mesh geometry={nodes.Screen.geometry} material={materials.FondoMonitor} position={[3.072, 2.917, -2.255]} rotation={[0, 0.39, -Math.PI / 2]} />
        <mesh geometry={nodes.Base.geometry} material={basicMaterials.NegroMonitor} position={[3.072, 2.917, -2.255]} rotation={[0, 0.39, -Math.PI / 2]} />

        <group position={[3.457, 3.353, -2.433]} rotation={[Math.PI / 2, 0, -0.39]}>
          <mesh geometry={nodes.Cylinder.geometry} material={basicMaterials.GrisSilla} />
          <mesh geometry={nodes.Cylinder_1.geometry} material={basicMaterials.NegroSilla} />
          <mesh geometry={nodes.Cylinder_2.geometry} material={basicMaterials.LuzLampara2} />
        </group>

        <mesh geometry={nodes.Screen001.geometry} material={materials.FondoLap} position={[3.761, 2.087, -0.11]} />
        <group position={[3.761, 2.087, -0.11]}>
          <mesh geometry={nodes.Plane016.geometry} material={basicMaterials.GrisSilla} />
          <mesh geometry={nodes.Plane016_1.geometry} material={basicMaterials.NegroMonitor} />
        </group>

        <mesh geometry={nodes.BasePoster1.geometry} material={basicMaterials.NegroSilla} position={[-3.997, 3.305, 1.846]} rotation={[0, 0, -Math.PI / 2]} />
        <mesh geometry={nodes.LuffyPoster.geometry} material={materials['Material.005']} position={[-3.359, 3.497, -3.988]} rotation={[Math.PI / 2, 0, 0]} />

        <group position={[-3.997, 3.305, 1.846]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh geometry={nodes.Plane001.geometry} material={materials.PosterDune} />
          <mesh geometry={nodes.Plane001_1.geometry} material={materials.PosterBastardos} />
          <mesh geometry={nodes.Plane001_2.geometry} material={materials.KillBillPoster} />
        </group>

        <group position={[-1.813, 2.082, 0.29]} rotation={[-3.098, -0.283, -2.988]}>
          <mesh geometry={nodes.BézierCurve006.geometry} material={basicMaterials.Negro_Ukulele} />
          <mesh geometry={nodes.BézierCurve006_1.geometry} material={basicMaterials['Procedural Wood']} />
          <mesh geometry={nodes.BézierCurve006_2.geometry} material={basicMaterials.GrisClaro_Ukulele} />
          <mesh geometry={nodes.BézierCurve006_3.geometry} material={basicMaterials.Gris_Ukulele} />
          <mesh geometry={nodes.BézierCurve006_4.geometry} material={basicMaterials.Ukulele_circulos} />
          <mesh geometry={nodes.BézierCurve006_5.geometry} material={basicMaterials.WoodUkulele} />
        </group>

        <group position={[-3.509, 2.481, -2.588]}>
          <mesh geometry={nodes.Circle001_1.geometry} material={basicMaterials['Brushed used metal gold']} />
          <mesh geometry={nodes.Circle001_2.geometry} material={basicMaterials.TelaMarshall} />
          <mesh geometry={nodes.Circle001_3.geometry} material={basicMaterials.NegroMarshall} />
        </group>

        <group position={[3.012, 1.951, 0.557]} rotation={[0, 0, -Math.PI]}>
          <mesh geometry={nodes.Cube045.geometry} material={basicMaterials.WoodDesk} />
          <mesh geometry={nodes.Cube045_1.geometry} material={basicMaterials.NegroClaroDesk} />
        </group>

        <group position={[1.147, 1.79, -1.038]} rotation={[0, -1.22, 0]}>
          <mesh geometry={nodes.Cube034.geometry} material={basicMaterials.NegroSilla} />
          <mesh geometry={nodes.Cube034_1.geometry} material={basicMaterials.GrisSilla} />
          <mesh geometry={nodes.Cube034_2.geometry} material={basicMaterials.NegroClaroSilla} />
        </group>

        <group position={[-2.981, 2.568, 2.472]} rotation={[Math.PI / 2, 0, -0.692]}>
          <mesh geometry={nodes.Cylinder014.geometry} material={basicMaterials.NegroClaroLampara} />
          <mesh geometry={nodes.Cylinder014_1.geometry} material={basicMaterials.MaderaLampara1} />
          <mesh geometry={nodes.Cylinder014_2.geometry} material={basicMaterials.Lampara1} />
        </group>

        <group position={[-3.999, 4.746, 0.039]}>
          <mesh geometry={nodes.Cube022.geometry} material={basicMaterials.NegroSilla} />
          <mesh geometry={nodes.Cube022_1.geometry} material={basicMaterials.LuzLampara2} />
        </group>

        <group position={[-3.115, 2.326, -3.159]}>
          <mesh geometry={nodes.Circle008_1.geometry} material={basicMaterials.Lampara3} />
          <mesh geometry={nodes.Circle008_2.geometry} material={basicMaterials.NegroLampara} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/RoomFinal3.glb');
