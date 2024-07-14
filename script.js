// Inicijuojame sceną
const scene = new THREE.Scene();

// Sukuriame kamerą
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Sukuriame renderer'į
const renderer = new THREE.WebGLRenderer({ antialias: true });
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('click', onMouseClick, false);
function onMouseClick(event) {
    // Konvertuojame pelės poziciją į normuotas prietaisų koordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Atnaujiname `Raycaster` pagal kamerą ir pelės poziciją
    raycaster.setFromCamera(mouse, camera);

    // Pasiimame objektus su kuriais susikerta spindulys
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        // Susikertama su pirmu objektu
        const intersect = intersects[0];
        console.log(intersects.length);
        console.log('Paspaudimo koordinatės objekto atžvilgiu:', intersect.point);
        console.log('Paspaustas objektas:', intersect.object);


    }
}
const kunas = new THREE.Group();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
const pixel = 1;
const loader = new THREE.TextureLoader();
function tekstura(offx, offy, repx, repy) {

    return loader.load('TRADERURG.png', function (texture) {
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
const nugara = new THREE.MeshBasicMaterial({ map: tekstura(0.5, 0.5, 0.125, 0.1875) });
const drp = new THREE.MeshBasicMaterial({ map: tekstura(0.671875, 0.5, 0.0625, 0.1875) });
const krp = new THREE.MeshBasicMaterial({ map: tekstura(0.546875, 0, 0.0625, 0.1875) });


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
    nugara, // Priekinė
    nugara, // Užpakalinė
    nugara, // Viršutinė
    nugara, // Apatinė
    veidas, // Kairė
    nugara  // Dešinė
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
    krp, // Kairė // Kairė
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
head.name = "head";

const body = new THREE.Mesh(geometry, pilvasM);
body.name = "body";
geometry = new THREE.BoxGeometry(size.legarm.w, size.legarm.h, size.legarm.d);
const larm = new THREE.Mesh(geometry, material);
const rarm = new THREE.Mesh(geometry, material);
const lleg = new THREE.Mesh(geometry, material);
const rleg = new THREE.Mesh(geometry, material);

// Pridedame kubą į sceną
kunas.add(head);
kunas.add(body);
kunas.add(larm);
kunas.add(rarm);
kunas.add(lleg);
kunas.add(rleg);
scene.add(kunas);
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


// Kintamieji pelės judesiui sekti
let isMouseDown = false;
let prevMouseY = 0;

// Pelės nuspaudimo įvykis
window.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    prevMouseY = event.clientY;
    prevMouseX = event.clientX;

});

// Pelės atleidimo įvykis
window.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// Pelės judesio įvykis
window.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        const deltaX = event.clientX - prevMouseX;
        prevMouseX = event.clientX;
        const angleX = deltaX * 0.005; // Kintamasis, kad pasukti kampą pagal judesį

        const deltaY = event.clientY - prevMouseY;
        prevMouseY = event.clientY;
        const angleY = deltaY * 0.005; // Kintamasis, kad pasukti kampą pagal judesį

        // Sukame kamerą aplink X ašį
        kunas.rotation.x += angleY * 5;
        kunas.rotation.y += angleX * 5;




    }
});
// Animacijos funkcija
function animate() {
    requestAnimationFrame(animate);
    // kunas.rotation.y += 0.1
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
