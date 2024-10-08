import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const camera = new THREE.PerspectiveCamera(
	100,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const canvas = document.querySelector("#c");

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
	canvas,
	alpha: true,
});

//3d model from blender

const loader = new GLTFLoader();

loader.load(
	"/models/musca-domestica/scene.gltf",
	(gltf) => {
		console.log("success");
		console.log(gltf);
		gltf.scene.children[0].scale.set(2, 2, 2);
		scene.add(gltf.scene.children[0]);
	},
	(progress) => {
		console.log("progress");
		console.log(progress);
	},
	// called when loading has errors
	(error) => {
		console.log("An error happened");
		console.log(error);
	}
);

camera.position.set(0, 2, 8);
camera.lookAt(0, 0, 0);

//floor

const floor = new THREE.Mesh(
	new THREE.PlaneGeometry(10, 10),
	new THREE.MeshStandardMaterial({
		color: "red",
		metalness: 0,
		roughness: 0.5,
	})
);

floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

// //hemLight
const light = new THREE.PointLight(0xeeeeee);
light.position.set(20, 0, 20);
scene.add(light);
const lightAmb = new THREE.AmbientLight(0x777777);
scene.add(lightAmb);

//tick
// const tick = () => {
// 	console.log("tick");
// 	renderer.render(scene, camera);
// 	window.requestAnimationFrame(tick);
// };

// tick();

//line
// const materialLine = new THREE.LineBasicMaterial({ color: 0xfff000 });
// const points = [];
// points.push(new THREE.Vector3(-110, 0, 0));
// points.push(new THREE.Vector3(0, 110, 0));
// points.push(new THREE.Vector3(10, 0, 0));

// const geometryLine = new THREE.BufferGeometry().setFromPoints(points);

// const line = new THREE.Line(geometryLine, materialLine);
// scene.add(line);
//render

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Sphere
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: "red" });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 5;

function animate() {
	requestAnimationFrame(animate);
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	// line.rotation.x += 0.01;
	// line.rotation.y += 0.01;
	renderer.render(scene, camera);
}

animate();
