// Inicijuojame sceną, kamerą ir renderer'į
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sukuriame Canvas elementą
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 512;

// Užpildome Canvas baltu fonu
context.fillStyle = '#ffffff';
context.fillRect(0, 0, canvas.width, canvas.height);

// Sukuriame tekstūrą iš Canvas
const texture = new THREE.CanvasTexture(canvas);

// Sukuriame kubą su Canvas tekstūra
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Nustatome pradinę kameros padėtį
camera.position.z = 5;

// Pridedame atsisiuntimo mygtuką
const downloadButton = document.createElement('button');
downloadButton.innerText = 'Atsisiųsti paveikslėlį';
downloadButton.onclick = downloadImage;
document.body.appendChild(downloadButton);

// Inicijuojame Raycaster ir Mouse kintamuosius
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Pelės paspaudimo įvykis
window.addEventListener('click', onMouseClick, false);

function onMouseClick(event) {
    // Konvertuojame pelės poziciją į normuotas prietaisų koordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Atnaujiname Raycaster pagal kamerą ir pelės poziciją
    raycaster.setFromCamera(mouse, camera);

    // Pasiimame objektus su kuriais susikerta spindulys
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const intersect = intersects[0];
        console.log('Paspaustas objektas:', intersect.object);

        // Konvertuojame pasaulio koordinates į UV koordinates
        const uv = intersect.uv;

        // Apskaičiuojame pikselių koordinates ant tekstūros
        const x = Math.floor(uv.x * canvas.width);
        const y = Math.floor((1 - uv.y) * canvas.height);

        // Nupiešiame mažą kvadratėlį ant Canvas
        context.fillStyle = '#ff0000';
        context.fillRect(x - 5, y - 5, 10, 10);

        // Atnaujiname tekstūrą
        texture.needsUpdate = true;
    } else {
        console.log('Nepaspausta ant objekto');
    }
}

// Atsisiuntimo funkcija
function downloadImage() {
    // Sukuriame duomenų URL iš Canvas elemento
    const dataURL = canvas.toDataURL('image/png');

    // Sukuriame atsisiuntimo nuorodą
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'nupieštas_vaizdas.png';

    // Spustelime atsisiuntimo nuorodą programiškai
    link.click();
}

// Animacijos ciklas
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
