import * as THREE from '../three.module.js';
import {STLLoader} from '../STLLoader.js';
import {OrbitControls} from '../OrbitControls.js';

let scene, camera, renderer, object;


function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#141414');

    camera = new THREE.PerspectiveCamera(
        75,
        (window.innerWidth / 2) / window.innerHeight,
        0.1,
        10000
    );

    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene.add(object);

    let control = new OrbitControls(camera, renderer.domElement);

	control.enableRotate = false;
    control.enableZoom = false;
    control.enablePan = false;
    
    
    let light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
    
    scene.add(light);

    animate();
}

const animate = () => {
    requestAnimationFrame(animate);  
    renderer.render(scene, camera);

}


let loader = new STLLoader();

loader.load('./fox.stl', (model) => {
    object = new THREE.Mesh(
        model,
        new THREE.MeshLambertMaterial({color: '#444'})
    );

    object.scale.set(0.5, 0.5, 0.5);
    object.position.set(10, -25, 10);
    object.rotation.x = - Math.PI / 2;
	object.rotation.z += 1;

    init();
});

