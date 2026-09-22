import * as THREE from 'three';

/**
 * Convierte los materiales del GLTF a MeshBasicMaterial. La escena no tiene luces:
 * la iluminacion viene horneada en las texturas, asi que MeshStandardMaterial solo
 * cuesta rendimiento sin aportar nada.
 *
 * Ojo: solo se copia el mapa de color base. Los materiales que unicamente traen
 * emissiveTexture (FondoMonitor, FondoLap y los posters) quedarian negros al
 * convertirse, por eso RoomFinal3 los usa sin convertir.
 */
export function convertirMaterialesABasic(materialesOriginales) {
  const nuevosMateriales = {};

  for (const nombre in materialesOriginales) {
    const mat = materialesOriginales[nombre];

    nuevosMateriales[nombre] = new THREE.MeshBasicMaterial({
      map: mat.map || null,
      color: mat.color ? mat.color.clone() : new THREE.Color(0xffffff),
      side: mat.side || THREE.FrontSide,
      visible: mat.visible !== undefined ? mat.visible : true
    });
  }

  return nuevosMateriales;
}

/**
 * Para los modelos con iluminacion horneada (RoomDarkmode1 / RoomLightmode1):
 * todos sus materiales tienen color base negro y la imagen completa vive en la
 * emissiveTexture. Se usa esa textura como mapa de un MeshBasicMaterial, que
 * es unlit y la muestra tal cual. Si algun material trae baseColorTexture, se
 * respeta esa en su lugar.
 */
export function convertirHorneadoABasic(material) {
  const texture = material.emissiveMap || material.map || null;

  // Sin textura emisiva el color visible es el emisivo (el base es negro).
  const color = material.emissiveMap
    ? material.emissive.clone().multiplyScalar(material.emissiveIntensity ?? 1)
    : (material.color ? material.color.clone() : new THREE.Color(0xffffff));

  return new THREE.MeshBasicMaterial({
    map: texture,
    color,
    side: material.side ?? THREE.FrontSide,
    transparent: material.transparent,
    opacity: material.opacity,
    alphaTest: material.alphaTest,
    // El horneado ya es el color final: sin esto R3F le aplica tone mapping
    // ACES encima, que lo desatura (el piso calido se veia gris) y ademas hace
    // imposible empatar --page-bg con el color real de la base.
    toneMapped: false,
  });
}
