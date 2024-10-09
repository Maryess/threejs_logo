import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

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
	antialias: true,
});

//3d model from blender

const loader = new GLTFLoader();

let mixer = null;
let first_action = null;
// let second_action = null;
// let three_action = null;
// let fourth_action = null;
// let five_action = null;
// let six_action = null;
// let seven_action = null;
// let eight_action = null;
// let night_action = null;
// let ten_action = null;
// let eleven_action = null;
// let twelve_action = null;
// let thirteen_action = null;
// let fourteen_action = null;
// let fiveteen_action = null;
let sceneAnim = null;

loader.load(
	"/models/shadow_leviathan/scene.gltf",
	(gltf) => {
		console.log(gltf);
		gltf.scene.scale.set(100, 100, 100);
		mixer = new THREE.AnimationMixer(gltf.scene);
		first_action = gltf.animations[0];
		second_action = gltf.animations[1];
		three_action = gltf.animations[2];
		fourth_action = gltf.animations[3];
		// five_action = gltf.animations[4];
		// six_action = gltf.animations[5];
		// seven_action = gltf.animations[6];
		// eight_action = gltf.animations[7];
		// night_action = gltf.animations[8];
		// ten_action = gltf.animations[9];
		// eleven_action = gltf.animations[10];
		// twelve_action = gltf.animations[11];
		// thirteen_action = gltf.animations[12];
		// fourteen_action = gltf.animations[13];
		// fiveteen_action = gltf.animations[14];

		mixer.clipAction(first_action).play();
		// mixer.clipAction(second_action).play();
		// mixer.clipAction(three_action).play();
		// mixer.clipAction(fourth_action).play();
		// mixer.clipAction(five_action).play();
		// mixer.clipAction(six_action).play();
		// mixer.clipAction(seven_action).play();
		// mixer.clipAction(eight_action).play();
		// mixer.clipAction(night_action).play();
		// mixer.clipAction(ten_action).play();
		// mixer.clipAction(eleven_action).play();
		// mixer.clipAction(twelve_action).play();
		// mixer.clipAction(thirteen_action).play();
		// mixer.clipAction(fourteen_action).play();
		// mixer.clipAction(fiveteen_action).play();

		// gltf.animations.map((element) => {
		// 	mixer.clipAction(element).play();
		// });
		sceneAnim = gltf.scene;
		scene.add(sceneAnim);
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

// const sceneAnimate = (event) => {
// const rotation = [
// 	{
// 		position: "x",
// 		value: 0.3,
// 	},
// 	{
// 		position: "y",
// 		value: 0.5,
// 	},
// 	{ position: "z", value: 0.4 },
// ];

// for (let i = 0; i < rotation.length; i++) {
// 	if ((rotation[i].position = "x")) {
// 		event.scene.rotation.x += rotation[i].value;
// 	} else if ((rotation[i].position = "y")) {
// 		event.scene.rotation.y += rotation[i];
// 	} else {
// 		event.scene.rotation.z += rotation[i];
// 	}
// 	i++;
// }

// rotation.map((target) => {
// 	if ((target.position = "x")) {
// 		event.scene.rotation.x += target.value;
// 	} else if ((target.position = "y")) {
// 		event.scene.rotation.y += target.value;
// 	} else {
// 		event.scene.rotation.z += target.value;
// 	}
// });
// };

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
// scene.add(floor);

//hemLight
//Add light
// const light = new THREE.AmbientLight(0xffffff);
// scene.add(light);
const hemLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemLight.position.set(0, 50, 0);
scene.add(hemLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1025, 1024);
scene.add(dirLight);

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

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 5, 0);
controls.update();

const clock = new THREE.Clock();

function animate() {
	requestAnimationFrame(animate);

	const delta = clock.getDelta();

	if (mixer) {
		mixer.update(delta);
	}
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	// line.rotation.x += 0.01;
	// line.rotation.y += 0.01;
	renderer.render(scene, camera);
}
animate();
