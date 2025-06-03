import * as THREE from 'three';

export function convertirMaterialesABasic(materialesOriginales) {
  const nuevosMateriales = {};

  for (const nombre in materialesOriginales) {
    const mat = materialesOriginales[nombre];

    const nuevoMaterial = new THREE.MeshBasicMaterial({
      map: mat.map || null,
      color: mat.color ? mat.color.clone() : new THREE.Color(0xffffff),
      side: mat.side || THREE.FrontSide,
      visible: mat.visible !== undefined ? mat.visible : true
    });

    if (mat.map && mat.map.encoding !== undefined) {
      nuevoMaterial.map.encoding = mat.map.encoding;
    }

    nuevosMateriales[nombre] = nuevoMaterial;
  }

  return nuevosMateriales;
}