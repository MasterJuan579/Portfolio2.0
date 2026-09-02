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
