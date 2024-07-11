// Inicijuojame sceną
const scene = new THREE.Scene();

// Sukuriame kamerą
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Sukuriame renderer'į
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
const pixel = 1;
const loader = new THREE.TextureLoader();
function tekstura(offx, offy, repx, repy) {

    return loader.load('NIKASURG.png', function (texture) {
        // Nustatome tekstūros dalį (pvz., išimame viršutinę kairę ketvirtį)
        texture.offset.set(offx, offy); // Kairys apatinis kampas
        texture.repeat.set(repx, repy); // Naudojame tik ketvirtį vaizdo
        texture.magFilter = THREE.NearestFilter;
    });
}

// 
// 
const veidas = new THREE.MeshBasicMaterial({ map: tekstura(0.125, 0.750, 0.125, 0.125) });
const pilvas = new THREE.MeshBasicMaterial({ map: tekstura(0.3125, 0.5, 0.125, 0.19) });

let size = {
    head: {
        w: pixel * 8,
        h: pixel * 8,
        d: pixel * 8
    },
    body: {
        w: pixel * 8,
        h: pixel * 12,
        d: pixel * 4
    },
    legarm: {
        w: pixel * 4,
        h: pixel * 12,
        d: pixel * 4
    },
}
// Sukuriame kubo geometriją ir medžiagą
const headM = [
    veidas, // Priekinė
    veidas, // Užpakalinė
    veidas, // Viršutinė
    veidas, // Apatinė
    veidas, // Kairė
    veidas  // Dešinė
];
const pilvasM = [
    pilvas, // Priekinė
    pilvas, // Užpakalinė // Užpakalinė
    pilvas, // Viršutinė // Viršutinė
    pilvas, // Apatinė // Apatinė
    pilvas, // Kairė // Kairė
    pilvas  // Dešinė // Dešinė
];
const material = [
    pilvas, // Priekinė
    pilvas, // Užpakalinė // Užpakalinė
    pilvas, // Viršutinė // Viršutinė
    pilvas, // Apatinė // Apatinė
    pilvas, // Kairė // Kairė
    pilvas  // Dešinė // Dešinė
];
const lkoja = [
    pilvas, // Priekinė
    pilvas, // Užpakalinė // Užpakalinė
    pilvas, // Viršutinė // Viršutinė
    pilvas, // Apatinė // Apatinė
    pilvas, // Kairė // Kairė
    pilvas  // Dešinė // Dešinė
];
let geometry = new THREE.BoxGeometry(size.head.w, size.head.h, size.head.d);
const head = new THREE.Mesh(geometry, headM);
geometry = new THREE.BoxGeometry(size.body.w, size.body.h, size.body.d);

const body = new THREE.Mesh(geometry, pilvasM);
geometry = new THREE.BoxGeometry(size.legarm.w, size.legarm.h, size.legarm.d);
const larm = new THREE.Mesh(geometry, material);
const rarm = new THREE.Mesh(geometry, material);
const lleg = new THREE.Mesh(geometry, material);
const rleg = new THREE.Mesh(geometry, material);

// Pridedame kubą į sceną
scene.add(head);
scene.add(body);
scene.add(larm);
scene.add(rarm);
scene.add(lleg);
scene.add(rleg);

// Nustatome kameros poziciją

camera.position.z = 40;
head.position.y = 2;
body.position.y = -8;
larm.position.y = -8
larm.position.x = -6
rarm.position.y = -8
rarm.position.x = 6
lleg.position.y = -20
lleg.position.x = -2
rleg.position.y = -20
rleg.position.x = 2
jGreitis = 1
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            camera.translateZ(-jGreitis);
            break;
        case 's':
            camera.translateZ(jGreitis);
            break;
        case 'a':
            camera.translateX(-jGreitis);
            break;
        case 'd':
            camera.translateX(jGreitis);
            break;
        default:
            break;

    }
    switch (event.key) {
        case 'ArrowUp':
            camera.rotation.x += jGreitis;
            break;
        case 'ArrowDown':
            camera.rotation.x -= jGreitis;
            break;
        case 'ArrowLeft':
            camera.rotation.y += jGreitis;
            break;
        case 'ArrowRight':
            camera.rotation.y -= jGreitis;
            break;
        default:
            break;

    }
});
// Animacijos funkcija
function animate() {
    requestAnimationFrame(animate);
    head.rotation.y += 0.1
    // body.rotation.y += 0.1
    // larm.rotation.y += 0.1
    // larm.rotation.x += 0.1
    // rarm.rotation.y += 0.1
    // rarm.rotation.x += 0.1
    // lleg.rotation.y += 0.1
    // lleg.rotation.x += 0.1
    // rleg.rotation.y += 0.1
    // rleg.rotation.x += 0.1
    // Pasukame kubą
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // camera.rotation.y += 0.1;
    // head.scale.x += 0.01;
    // head.scale.y += 0.01;
    // head.scale.z += 0.01;

    renderer.render(scene, camera);
}

// Paleidžiame animaciją
animate();
