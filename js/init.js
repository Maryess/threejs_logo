import * as THREE from "three";

export const init = () => {
	const camera = new THREE.PerspectiveCamera(
		100,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	const scene = new THREE.Scene();
	const renderer = new THREE.WebGLRenderer();

	return {
		camera,
		scene,
		renderer,
	};
};
