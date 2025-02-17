window.onload = function () {// Inicijuojame sceną, kamerą ir renderer'į
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    let pixel = 1;
    const imgLinkas = 'TRADEURG.png';
    // Sukuriame Canvas elementą
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    function gautiPavInfo(nuoroda) {
        const img = new Image();
        img.src = nuoroda;
        context.drawImage(img, 0, 0, 64, 64);
        const taskas = context.getImageData(10, 20, 1, 1).data;
        console.log(taskas)
        const red = taskas[0];
        const green = taskas[1];
        const blue = taskas[2];
        const alpha = taskas[3] / 255;
        const hexColor = `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
        return hexColor

    }
    // gautiPavInfo('TRADERURG.png')
    canvas.width = 64;
    canvas.height = 64;
    context.fillRect(0, 0, canvas.width, canvas.height);
    // context.fillStyle = gautiPavInfo('TRADERURG.png')

    // Sukuriame tekstūrą iš Canvas
    const texture = new THREE.CanvasTexture(canvas);

    // Sukuriame grupę

    const kunas = new THREE.Group();
    scene.add(kunas);

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
        const intersects = raycaster.intersectObjects(kunas.children);

        if (intersects.length > 0) {
            const intersect = intersects[0];
            console.log('Paspaustas objektas:', intersect.object);

            // Konvertuojame pasaulio koordinates į UV koordinates
            const uv = intersect.uv;

            // Apskaičiuojame pikselių koordinates ant tekstūros
            const x = Math.floor(uv.x * canvas.width);
            const y = Math.floor((1 - uv.y) * canvas.height);

            // Nupiešiame mažą kvadratėlį ant Canvas
            context.fillStyle = gautiPavInfo('TRADERURG.png');
            console.log(x, y);
            const xP = Math.round(x / 8) * 8
            const yP = Math.round(y / 8) * 8

            context.fillRect(xP, yP, pixel * 8, pixel * 8);

            // Atnaujiname tekstūrą
            texture.needsUpdate = true;
        } else {
            console.log('Nepaspausta ant objekto');
        }
    }

    // Pridedame atsisiuntimo mygtuką
    const downloadButton = document.createElement('button');
    downloadButton.innerText = 'Atsisiųsti paveikslėlį';
    downloadButton.onclick = downloadImage;
    document.body.appendChild(downloadButton);

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

    // Sukuriame objektus
    const medziaga = new THREE.MeshBasicMaterial({ color: gautiPavInfo('TRADERURG.png') });
    const size = {
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
    let geometry = new THREE.BoxGeometry(size.head.w, size.head.h, size.head.d);
    const head = new THREE.Mesh(geometry, medziaga);
    geometry = new THREE.BoxGeometry(size.body.w, size.body.h, size.body.d);
    head.name = "head";

    const body = new THREE.Mesh(geometry, medziaga);
    body.name = "body";
    geometry = new THREE.BoxGeometry(size.legarm.w, size.legarm.h, size.legarm.d);
    const rarm = new THREE.Mesh(geometry, medziaga);
    const lleg = new THREE.Mesh(geometry, medziaga);
    const rleg = new THREE.Mesh(geometry, medziaga);
    const larm = new THREE.Mesh(geometry, medziaga);
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
    kunas.add(head, body, larm, rarm, lleg, rleg);
    scene.add(kunas);

    console.log(head)
    // Animacijos funkcija
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    // Paleidžiame animaciją
    animate();
}
