/* =================================================================
   1. SISTEMA DE AUDIO (WEB AUDIO API)
   ================================================================= */
class AudioEngine {
    constructor() {
        this.ctx = null;
        this.isInit = false;
    }

    init() {
        if (this.isInit) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
        this.isInit = true;
    }

    playFootstep(isSprinting) {
        if (!this.isInit) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(isSprinting ? 120 : 80, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(10, this.ctx.currentTime + 0.12);

        filter.type = 'lowpass'; filter.frequency.value = 300;
        gain.gain.setValueAtTime(isSprinting ? 0.2 : 0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

        osc.connect(gain); gain.connect(filter); filter.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.12);
    }

    playFlashlightClick() {
        if (!this.isInit) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.05);
    }

    playDoorSound() {
        if (!this.isInit) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(40, this.ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.4);
    }

    playStairsSound() {
        if (!this.isInit) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.3);
    }

    playLeverSound() {
        if (!this.isInit) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.2);
    }

    playGeneratorStart() {
        if (!this.isInit) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(60, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 1.5);
        gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05, this.ctx.currentTime + 1.5);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 1.5);
    }

    playHitSound() {
        if (!this.isInit) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.5);
    }

    playJumpscare() {
        if (!this.isInit) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.8);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.8);
    }
}

const audio = new AudioEngine();

/* =================================================================
   2. CONFIGURACIÓN DE TECLAS Y LOGROS (LOCALSTORAGE)
   ================================================================= */
const defaultKeyBindings = {
    forward: 'KeyW',
    backward: 'KeyS',
    left: 'KeyA',
    right: 'KeyD',
    interact: 'KeyE',
    flashlight: 'KeyF'
};

let keyBindings = JSON.parse(localStorage.getItem('ecos_keybindings')) || { ...defaultKeyBindings };

const defaultAchievements = {
    speedCollect: false,  // Logro 1: <1 min recolectar tarjetas y palancas
    flawless: false,      // Logro 2: Ganar con 100% sanidad y batería
    speedWin: false,      // Logro 3: Ganar en <1 min
    untouched: false,     // Logro 4: Ganar sin recibir daño
    escaped: false        // Logro 5: Escapar
};

let achievements = JSON.parse(localStorage.getItem('ecos_achievements')) || { ...defaultAchievements };

function saveAchievements() {
    localStorage.setItem('ecos_achievements', JSON.stringify(achievements));
}

function saveKeyBindings() {
    localStorage.setItem('ecos_keybindings', JSON.stringify(keyBindings));
}

/* =================================================================
   3. TEXTURAS PROCEDURALES
   ================================================================= */
function createWallTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#222225'; ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = '#111113'; ctx.lineWidth = 3;
    const rows = 8, cols = 4, rh = 256 / rows, rw = 256 / cols;
    for (let i = 0; i < rows; i++) {
        const offset = (i % 2) * (rw / 2);
        for (let j = -1; j <= cols; j++) ctx.strokeRect(j * rw + offset, i * rh, rw, rh);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping; texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

function createFloorTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#353538'; ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = '#1a1a1c'; ctx.lineWidth = 4;
    const tileSize = 64;
    for (let x = 0; x < 256; x += tileSize) {
        for (let y = 0; y < 256; y += tileSize) ctx.strokeRect(x, y, tileSize, tileSize);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping; texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

function createDoorTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#3a2518'; ctx.fillRect(0, 0, 128, 256);
    ctx.strokeStyle = '#23150c'; ctx.lineWidth = 6;
    ctx.strokeRect(5, 5, 118, 246); ctx.strokeRect(10, 10, 108, 110); ctx.strokeRect(10, 130, 108, 110);
    ctx.fillStyle = '#b59340'; ctx.beginPath(); ctx.arc(18, 128, 5, 0, Math.PI * 2); ctx.fill();
    return new THREE.CanvasTexture(canvas);
}

/* =================================================================
   4. VARIABLES GLOBALES Y ESTADO DEL JUEGO
   ================================================================= */
const GRID_SIZE = 15;
const CELL_SIZE = 4;
const FLOOR_HEIGHT = 6;
const NUM_FLOORS = 3;
const TOTAL_KEYCARDS = 5;
const TOTAL_LEVERS = 4;
let currentFloor = 1;

let scene, camera, renderer;
let flashlight, flashlightLight;

let gameStartTime = 0;
let cardsAndLeversCompletedTime = 0;

const player = {
    position: new THREE.Vector3(6, 1.6, 6),
    rotation: new THREE.Euler(0, 0, 0, 'YXZ'),
    velocity: new THREE.Vector3(),
    speed: 3.8,
    sprintSpeed: 7.0,
    crouchSpeed: 2.0,
    isSprinting: false,
    isCrouching: false,
    stamina: 100,
    battery: 100,
    sanity: 100,
    flashlightOn: true,
    height: 1.6,
    collectedKeycardsCount: 0,
    activatedLeversCount: 0,
    tookDamage: false,
    readingNote: false
};

let isLocked = false;
const keys = {};
const keycards = [];
const batteries = [];
const chocolates = [];
const levers = [];
const doors = [];
const notes = [];
const stairs = [];

let generatorMesh = null;
let generatorStatusLight = null;
let generatorRunning = false;
let floor3VaultDoor = null;

const monster = {
    mesh: null,
    position: new THREE.Vector3(50, 0, 50),
    floor: 1,
    active: false,
    state: 'PATROL',
    patrolTarget: new THREE.Vector3(18, 0, 18),
    speed: 2.2,
    chaseSpeed: 4.6,
    visionRange: 7.0,
    stunTimer: 0
};

const layouts = [];

/* =================================================================
   5. GENERACIÓN DE MAPAS
   ================================================================= */
function generateLayouts() {
    layouts.length = 0;
    for (let floor = 0; floor < NUM_FLOORS; floor++) {
        const grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));

        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (r === 0 || r === GRID_SIZE - 1 || c === 0 || c === GRID_SIZE - 1) grid[r][c] = 1;
            }
        }

        for (let r = 2; r <= 6; r++) grid[r][6] = 1;
        for (let c = 2; c <= 6; c++) grid[6][c] = 1;
        grid[6][4] = 0;

        for (let r = 2; r <= 6; r++) grid[r][8] = 1;
        for (let c = 8; c <= 12; c++) grid[6][c] = 1;
        grid[6][10] = 0;

        for (let r = 8; r <= 12; r++) grid[r][8] = 1;
        for (let c = 8; c <= 12; c++) grid[8][c] = 1;
        grid[8][10] = 0;

        grid[1][1] = 0; grid[1][2] = 0; grid[2][1] = 0;
        grid[1][12] = 0; grid[1][13] = 0; grid[2][13] = 0;

        layouts.push(grid);
    }
}

/* =================================================================
   6. INICIALIZACIÓN DE THREE.JS Y ESCENA 3D
   ================================================================= */
function initEngine() {
    const container = document.getElementById('game-container');

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020204, 0.04);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.rotation.order = 'YXZ';
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(1);
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x101018, 0.5);
    scene.add(ambientLight);

    flashlight = new THREE.Group();
    flashlightLight = new THREE.SpotLight(0xffffff, 4.0, 18, Math.PI / 6, 0.4, 1);
    flashlightLight.position.set(0, 0, 0);
    flashlightLight.target.position.set(0, 0, -1);

    flashlight.add(flashlightLight);
    flashlight.add(flashlightLight.target);
    camera.add(flashlight);

    generateLayouts();
    buildWorld();
    buildMonster();

    setupUIEvents();
    setupControls();
    window.addEventListener('resize', onWindowResize);
}

/* =================================================================
   7. CONSTRUCCIÓN DEL MUNDO Y ELEMENTOS
   ================================================================= */
let wallTex, floorTex, doorTex;

function buildWorld() {
    wallTex = createWallTexture();
    floorTex = createFloorTexture();
    doorTex = createDoorTexture();

    wallTex.repeat.set(1, 1); floorTex.repeat.set(15, 15);

    const wallMat = new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.8 });
    const floorMat = new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.6 });
    const ceilingMat = new THREE.MeshStandardMaterial({ color: 0x111115, roughness: 0.9 });

    const floorGeo = new THREE.PlaneGeometry(GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);
    const wallGeo = new THREE.BoxGeometry(CELL_SIZE, FLOOR_HEIGHT, CELL_SIZE);

    for (let f = 0; f < NUM_FLOORS; f++) {
        const yOffset = f * FLOOR_HEIGHT;

        const floorMesh = new THREE.Mesh(floorGeo, floorMat);
        floorMesh.rotation.x = -Math.PI / 2;
        floorMesh.position.set((GRID_SIZE * CELL_SIZE) / 2, yOffset, (GRID_SIZE * CELL_SIZE) / 2);
        scene.add(floorMesh);

        const ceilMesh = new THREE.Mesh(floorGeo, ceilingMat);
        ceilMesh.rotation.x = Math.PI / 2;
        ceilMesh.position.set((GRID_SIZE * CELL_SIZE) / 2, yOffset + FLOOR_HEIGHT, (GRID_SIZE * CELL_SIZE) / 2);
        scene.add(ceilMesh);

        const grid = layouts[f];
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (grid[r][c] === 1) {
                    const constX = c * CELL_SIZE + CELL_SIZE / 2;
                    const constZ = r * CELL_SIZE + CELL_SIZE / 2;
                    const wall = new THREE.Mesh(wallGeo, wallMat);
                    wall.position.set(constX, yOffset + FLOOR_HEIGHT / 2, constZ);
                    scene.add(wall);
                }
            }
        }

        createDoor(4 * CELL_SIZE + CELL_SIZE / 2, yOffset, 6 * CELL_SIZE + CELL_SIZE / 2, false, f + 1);
        createDoor(10 * CELL_SIZE + CELL_SIZE / 2, yOffset, 6 * CELL_SIZE + CELL_SIZE / 2, false, f + 1);

        if (f < 2) {
            createDoor(10 * CELL_SIZE + CELL_SIZE / 2, yOffset, 8 * CELL_SIZE + CELL_SIZE / 2, false, f + 1);
        } else {
            createVaultDoor(10 * CELL_SIZE + CELL_SIZE / 2, yOffset, 8 * CELL_SIZE + CELL_SIZE / 2);
        }

        createStairsForFloor(f, yOffset);
        createHallwayLights(yOffset);
        placeFloorItems(f, yOffset);
    }

    spawnRandomKeycards();
    spawnRandomLevers();
    buildRealisticGenerator();
}

function createDoor(x, y, z, rotate, floorNum) {
    const pivot = new THREE.Group();
    pivot.position.set(x - 1.1, y, z);

    const doorGeo = new THREE.BoxGeometry(2.2, 3.6, 0.15);
    const doorMat = new THREE.MeshStandardMaterial({ map: doorTex, roughness: 0.7 });
    const doorMesh = new THREE.Mesh(doorGeo, doorMat);
    doorMesh.position.set(1.1, 1.8, 0);

    if (rotate) pivot.rotation.y = Math.PI / 2;
    pivot.add(doorMesh); scene.add(pivot);

    doors.push({ pivot, isOpen: false, targetAngle: 0, currentAngle: 0, floor: floorNum });
}

function createVaultDoor(x, y, z) {
    const pivot = new THREE.Group();
    pivot.position.set(x - 1.1, y, z);

    const doorGeo = new THREE.BoxGeometry(2.2, 3.6, 0.2);
    const doorMat = new THREE.MeshStandardMaterial({ color: 0xaa2222, metalness: 0.8, roughness: 0.3 });
    const doorMesh = new THREE.Mesh(doorGeo, doorMat);
    doorMesh.position.set(1.1, 1.8, 0);

    pivot.add(doorMesh); scene.add(pivot);
    floor3VaultDoor = { pivot, isOpen: false, targetAngle: 0, currentAngle: 0, floor: 3 };
}

function createStairsForFloor(floorIndex, yOffset) {
    const stairsMat = new THREE.MeshStandardMaterial({ color: 0x4a3222, roughness: 0.8 });

    if (floorIndex < NUM_FLOORS - 1) {
        const stairsUpGroup = new THREE.Group();
        for (let i = 0; i < 8; i++) {
            const step = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.4, 0.5), stairsMat);
            step.position.set(6, yOffset + i * 0.4 + 0.2, 6 + i * 0.4);
            stairsUpGroup.add(step);
        }
        scene.add(stairsUpGroup);

        stairs.push({
            position: new THREE.Vector3(6, yOffset, 6),
            type: 'UP', fromFloor: floorIndex + 1, toFloor: floorIndex + 2,
            targetPos: new THREE.Vector3(6, (floorIndex + 1) * FLOOR_HEIGHT + 1.6, 10)
        });
    }

    if (floorIndex > 0) {
        const stairsDownGroup = new THREE.Group();
        for (let i = 0; i < 8; i++) {
            const step = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.4, 0.5), stairsMat);
            step.position.set(50, yOffset + i * 0.4 + 0.2, 6 + i * 0.4);
            stairsDownGroup.add(step);
        }
        scene.add(stairsDownGroup);

        stairs.push({
            position: new THREE.Vector3(50, yOffset, 6),
            type: 'DOWN', fromFloor: floorIndex + 1, toFloor: floorIndex,
            targetPos: new THREE.Vector3(50, (floorIndex - 1) * FLOOR_HEIGHT + 1.6, 10)
        });
    }
}

function createHallwayLights(yOffset) {
    const lightPositions = [[18, 18], [42, 18], [42, 42], [18, 42], [30, 30]];
    lightPositions.forEach(pos => {
        const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.1, 0.8), new THREE.MeshBasicMaterial({ color: 0xffeabb }));
        const lampLight = new THREE.PointLight(0xffeabb, 0.6, 10);
        lamp.position.set(pos[0], yOffset + FLOOR_HEIGHT - 0.1, pos[1]);
        lampLight.position.set(pos[0], yOffset + FLOOR_HEIGHT - 0.3, pos[1]);
        scene.add(lamp); scene.add(lampLight);
    });
}

function placeFloorItems(floorIndex, yOffset) {
    const noteTexts = [
        "REGISTRO PISO 1: Agáchate para no ser visto por la criatura. Consume Chocolates para mantener tu cordura.",
        "REGISTRO PISO 2: Junta las 5 Tarjetas y activa las 4 Palancas para encender el Generador del Piso 3.",
        "REGISTRO PISO 3: El generador arrancará y te devolverá al menú con tu logro completado."
    ];

    const noteCoords = [{ x: 18, z: 18 }, { x: 42, z: 18 }, { x: 42, z: 42 }];
    const c = noteCoords[floorIndex];

    if (c) {
        const noteGeo = new THREE.PlaneGeometry(0.4, 0.5);
        const noteMat = new THREE.MeshBasicMaterial({ color: 0xeeeeee, side: THREE.DoubleSide });
        const noteMesh = new THREE.Mesh(noteGeo, noteMat);
        noteMesh.rotation.x = -Math.PI / 2;
        noteMesh.position.set(c.x, yOffset + 0.01, c.z);
        scene.add(noteMesh);
        notes.push({ mesh: noteMesh, text: noteTexts[floorIndex], floor: floorIndex + 1 });
    }

    // Pilas de Linterna
    const batterySpots = [
        [{ x: 14, z: 14 }, { x: 38, z: 22 }],
        [{ x: 44, z: 14 }, { x: 22, z: 38 }],
        [{ x: 20, z: 44 }, { x: 36, z: 20 }]
    ];

    batterySpots[floorIndex].forEach(spot => {
        const batGroup = new THREE.Group();
        const bodyGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.25, 8);
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0xddaa22, metalness: 0.8 });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        batGroup.add(body);
        batGroup.position.set(spot.x, yOffset + 0.15, spot.z);
        scene.add(batGroup);
        batteries.push({ mesh: batGroup, floor: floorIndex + 1, collected: false });
    });

    // Barras de Chocolate (+5 Cordura)
    const chocolateSpots = [
        [{ x: 22, z: 14 }, { x: 30, z: 18 }],
        [{ x: 18, z: 38 }, { x: 38, z: 44 }],
        [{ x: 14, z: 22 }, { x: 28, z: 38 }]
    ];

    chocolateSpots[floorIndex].forEach(spot => {
        const chocGeo = new THREE.BoxGeometry(0.3, 0.06, 0.15);
        const chocMat = new THREE.MeshStandardMaterial({ color: 0x3b1e08, roughness: 0.9 });
        const chocMesh = new THREE.Mesh(chocGeo, chocMat);
        chocMesh.position.set(spot.x, yOffset + 0.03, spot.z);
        scene.add(chocMesh);
        chocolates.push({ mesh: chocMesh, floor: floorIndex + 1, collected: false });
    });
}

function spawnRandomKeycards() {
    keycards.length = 0;
    const possibleSpots = [
        { x: 18, z: 14, floor: 1 }, { x: 22, z: 22, floor: 1 },
        { x: 42, z: 14, floor: 1 }, { x: 38, z: 38, floor: 1 },
        { x: 42, z: 14, floor: 2 }, { x: 18, z: 22, floor: 2 },
        { x: 22, z: 42, floor: 2 }, { x: 42, z: 42, floor: 2 },
        { x: 18, z: 44, floor: 3 }, { x: 22, z: 18, floor: 3 },
        { x: 38, z: 18, floor: 3 }, { x: 14, z: 38, floor: 3 }
    ].sort(() => Math.random() - 0.5);

    for (let i = 0; i < TOTAL_KEYCARDS; i++) {
        const spot = possibleSpots[i];
        const yOffset = (spot.floor - 1) * FLOOR_HEIGHT;
        const cardGeo = new THREE.BoxGeometry(0.35, 0.02, 0.22);
        const cardMat = new THREE.MeshBasicMaterial({ color: 0x00ff44 });
        const cardMesh = new THREE.Mesh(cardGeo, cardMat);
        cardMesh.position.set(spot.x, yOffset + 0.02, spot.z);
        scene.add(cardMesh);
        keycards.push({ mesh: cardMesh, floor: spot.floor, collected: false });
    }
}

function spawnRandomLevers() {
    levers.length = 0;
    const possibleSpots = [
        { x: 25, z: 2, floor: 1 }, { x: 2, z: 25, floor: 1 },
        { x: 50, z: 25, floor: 2 }, { x: 25, z: 50, floor: 2 },
        { x: 2, z: 40, floor: 3 }, { x: 40, z: 2, floor: 3 }
    ].sort(() => Math.random() - 0.5);

    for (let i = 0; i < TOTAL_LEVERS; i++) {
        const spot = possibleSpots[i];
        const yOffset = (spot.floor - 1) * FLOOR_HEIGHT;

        const leverGroup = new THREE.Group();
        const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.6, 0.1), new THREE.MeshStandardMaterial({ color: 0x333333 }));
        const handlePivot = new THREE.Group();
        handlePivot.position.set(0, -0.1, 0.05);

        const handleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8), new THREE.MeshStandardMaterial({ color: 0xcc2222 }));
        handleMesh.position.set(0, 0.2, 0);
        handleMesh.rotation.x = Math.PI / 4;

        handlePivot.add(handleMesh);
        leverGroup.add(baseMesh); leverGroup.add(handlePivot);
        leverGroup.position.set(spot.x, yOffset + 1.8, spot.z);
        scene.add(leverGroup);

        levers.push({ mesh: leverGroup, pivot: handlePivot, floor: spot.floor, activated: false });
    }
}

function buildRealisticGenerator() {
    const yOffset = 2 * FLOOR_HEIGHT;
    const genGroup = new THREE.Group();

    const base = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.4, 2.0), new THREE.MeshStandardMaterial({ color: 0x202025 }));
    base.position.y = 0.2; genGroup.add(base);

    const engine = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 1.4), new THREE.MeshStandardMaterial({ color: 0x442211 }));
    engine.position.set(0, 1.1, 0); genGroup.add(engine);

    generatorStatusLight = new THREE.PointLight(0xff0000, 1.5, 5);
    generatorStatusLight.position.set(0.8, 1.5, 0.85);
    genGroup.add(generatorStatusLight);

    genGroup.position.set(42, yOffset, 42);
    scene.add(genGroup);
    generatorMesh = genGroup;
}

/* =================================================================
   8. MONSTRUO Y COLISIONES CON PAREDES
   ================================================================= */
function buildMonster() {
    const monsterGroup = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.2, 3.0, 8), new THREE.MeshBasicMaterial({ color: 0x050505 }));
    body.position.y = 1.5; monsterGroup.add(body);

    const eyeGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const eye1 = new THREE.Mesh(eyeGeo, eyeMat); eye1.position.set(0.12, 2.7, 0.35);
    const eye2 = new THREE.Mesh(eyeGeo, eyeMat); eye2.position.set(-0.12, 2.7, 0.35);
    monsterGroup.add(eye1); monsterGroup.add(eye2);

    const monsterLight = new THREE.PointLight(0xff0000, 1.2, 4);
    monsterLight.position.set(0, 2.3, 0); monsterGroup.add(monsterLight);

    monster.mesh = monsterGroup;
    spawnMonsterFarFromPlayer();
    scene.add(monster.mesh);
}

function spawnMonsterFarFromPlayer() {
    let validX = 50, validZ = 50;
    while (Math.hypot(validX - player.position.x, validZ - player.position.z) < 18) {
        validX = (Math.floor(Math.random() * (GRID_SIZE - 2)) + 1) * CELL_SIZE;
        validZ = (Math.floor(Math.random() * (GRID_SIZE - 2)) + 1) * CELL_SIZE;
    }
    monster.position.set(validX, (currentFloor - 1) * FLOOR_HEIGHT, validZ);
    monster.mesh.position.copy(monster.position);
}

function updateMonster(delta) {
    if (!monster.mesh) return;

    if (player.collectedKeycardsCount === 0) {
        monster.mesh.position.y = -100;
        return;
    }

    monster.active = true;

    // Aturdimiento del monstruo tras golpear al jugador
    if (monster.stunTimer > 0) {
        monster.stunTimer -= delta;
        return;
    }

    const yPos = (currentFloor - 1) * FLOOR_HEIGHT;
    monster.mesh.position.y = yPos;

    const distToPlayer = monster.mesh.position.distanceTo(player.position);

    // Ataque del monstruo: quita 50 de Sanidad y se aturde 5 segundos
    if (distToPlayer < 1.3) {
        player.sanity = Math.max(0, player.sanity - 50);
        player.tookDamage = true;
        monster.stunTimer = 5.0; // Se queda quieto 5 segundos
        audio.playHitSound();

        const sanityBar = document.getElementById('sanity-bar');
        if (sanityBar) sanityBar.style.width = `${player.sanity}%`;

        if (player.sanity <= 0) {
            triggerGameOver();
            return;
        }
    }

    // Rango de visión: agacharse (crouching) reduce la detección a 1.2m
    let currentVision = monster.visionRange;
    if (player.isCrouching) {
        currentVision = 1.2;
    } else if (player.flashlightOn || player.isSprinting) {
        currentVision = 12.0;
    }

    if (distToPlayer < currentVision) {
        monster.state = 'CHASE';
    } else if (distToPlayer > 15) {
        monster.state = 'PATROL';
    }

    let targetPos = player.position;
    let currentSpeed = monster.speed;

    if (monster.state === 'CHASE') {
        currentSpeed = monster.chaseSpeed;
    } else {
        if (monster.mesh.position.distanceTo(monster.patrolTarget) < 1.8) {
            const patrolNodes = [
                new THREE.Vector3(18, yPos, 18),
                new THREE.Vector3(42, yPos, 18),
                new THREE.Vector3(42, yPos, 42),
                new THREE.Vector3(30, yPos, 30),
                new THREE.Vector3(18, yPos, 42)
            ];
            monster.patrolTarget = patrolNodes[Math.floor(Math.random() * patrolNodes.length)];
        }
        targetPos = monster.patrolTarget;
    }

    const dir = new THREE.Vector3().subVectors(targetPos, monster.mesh.position);
    dir.y = 0; dir.normalize();

    const nextX = monster.mesh.position.x + dir.x * currentSpeed * delta;
    const nextZ = monster.mesh.position.z + dir.z * currentSpeed * delta;

    // Colisión del Monstruo (No atraviesa paredes)
    if (!checkWallCollision(nextX, monster.mesh.position.z)) monster.mesh.position.x = nextX;
    if (!checkWallCollision(monster.mesh.position.x, nextZ)) monster.mesh.position.z = nextZ;

    monster.mesh.lookAt(targetPos.x, yPos + 1.5, targetPos.z);
}

/* =================================================================
   9. INTERFAZ Y EVENTOS DE MENÚ / OPCIONES / LOGROS
   ================================================================= */
function setupUIEvents() {
    const startBtn = document.getElementById('start-btn');
    const optionsBtn = document.getElementById('options-btn');
    const helpBtn = document.getElementById('help-btn');
    const achievementsBtn = document.getElementById('achievements-btn');

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            audio.init();
            document.body.requestPointerLock();
            gameStartTime = clock.getElapsedTime();
            const startScreen = document.getElementById('start-screen');
            if (startScreen) startScreen.style.display = 'none';
        });
    }

    if (optionsBtn) {
        optionsBtn.addEventListener('click', () => {
            const modal = document.getElementById('options-modal');
            if (modal) modal.style.display = 'flex';
            renderKeyBindings();
        });
    }

    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            const modal = document.getElementById('help-modal');
            if (modal) modal.style.display = 'flex';
        });
    }

    if (achievementsBtn) {
        achievementsBtn.addEventListener('click', () => {
            const modal = document.getElementById('achievements-modal');
            if (modal) modal.style.display = 'flex';
            renderAchievements();
        });
    }

    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.parentElement.style.display = 'none';
        });
    });
}

function renderKeyBindings() {
    const container = document.getElementById('keybinds-list');
    if (!container) return;
    container.innerHTML = `
        <p>Avanzar: <b>${keyBindings.forward}</b></p>
        <p>Retroceder: <b>${keyBindings.backward}</b></p>
        <p>Izquierda: <b>${keyBindings.left}</b></p>
        <p>Derecha: <b>${keyBindings.right}</b></p>
        <p>Interactuar: <b>${keyBindings.interact}</b></p>
        <p>Linterna: <b>${keyBindings.flashlight}</b></p>
    `;
}

function renderAchievements() {
    const container = document.getElementById('achievements-list');
    if (!container) return;
    container.innerHTML = `
        <div class="achievement ${achievements.speedCollect ? 'unlocked' : ''}">
            🏆 <b>Velocista:</b> Recoger las 5 tarjetas y palancas en menos de 1 minuto.
        </div>
        <div class="achievement ${achievements.flawless ? 'unlocked' : ''}">
            🏆 <b>Perfeccionista:</b> Ganar con 100% de Cordura y 100% de Linterna.
        </div>
        <div class="achievement ${achievements.speedWin ? 'unlocked' : ''}">
            🏆 <b>Relámpago:</b> Ganar la partida en menos de 1 minuto.
        </div>
        <div class="achievement ${achievements.untouched ? 'unlocked' : ''}">
            🏆 <b>Intacto:</b> Escapar sin recibir ningún golpe.
        </div>
        <div class="achievement ${achievements.escaped ? 'unlocked' : ''}">
            🏆 <b>Superviviente:</b> Encender el generador y escapar del asilo.
        </div>
    `;
}

/* =================================================================
   10. CONTROLES Y TECLADO
   ================================================================= */
function setupControls() {
    document.addEventListener('keydown', (e) => {
        keys[e.code] = true;

        if (e.code === keyBindings.flashlight && isLocked) {
            player.flashlightOn = !player.flashlightOn;
            flashlightLight.visible = player.flashlightOn;
            audio.playFlashlightClick();
        }

        if (e.code === keyBindings.interact && isLocked) {
            if (player.readingNote) closeNote();
            else handleInteractions();
        }

        if (e.code === 'Escape') {
            if (player.readingNote) closeNote();
            else if (isLocked) document.exitPointerLock();
        }
    });

    document.addEventListener('keyup', (e) => { keys[e.code] = false; });

    document.addEventListener('mousemove', (e) => {
        if (!isLocked || player.readingNote) return;
        const mouseSensitivity = 0.0022;
        player.rotation.y -= e.movementX * mouseSensitivity;
        player.rotation.x -= e.movementY * mouseSensitivity;
        player.rotation.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, player.rotation.x));
    });

    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) restartBtn.addEventListener('click', () => location.reload());

    const winRestartBtn = document.getElementById('win-restart-btn');
    if (winRestartBtn) winRestartBtn.addEventListener('click', () => location.reload());

    document.addEventListener('pointerlockchange', () => {
        isLocked = (document.pointerLockElement === document.body);
        const startScreen = document.getElementById('start-screen');
        const pauseScreen = document.getElementById('pause-screen');

        if (!isLocked && startScreen && startScreen.style.display === 'none' && !player.readingNote) {
            if (pauseScreen) pauseScreen.style.display = 'flex';
        } else if (isLocked) {
            if (pauseScreen) pauseScreen.style.display = 'none';
        }
    });
}

/* =================================================================
   11. SISTEMA COMPLETO DE INTERACCIONES
   ================================================================= */
function handleInteractions() {
    // 1. Escaleras
    stairs.forEach(stair => {
        if (stair.fromFloor === currentFloor) {
            if (player.position.distanceTo(stair.position) < 3.0) {
                currentFloor = stair.toFloor;
                player.position.copy(stair.targetPos);
                audio.playStairsSound();
                const floorTxt = document.getElementById('floor-txt');
                if (floorTxt) floorTxt.innerText = `PISO ${currentFloor}`;
            }
        }
    });

    // 2. Puertas
    doors.forEach(door => {
        if (door.floor === currentFloor) {
            if (player.position.distanceTo(door.pivot.position) < 2.8) {
                door.isOpen = !door.isOpen;
                door.targetAngle = door.isOpen ? Math.PI / 2 : 0;
                audio.playDoorSound();
            }
        }
    });

    // 3. Puerta de Seguridad Piso 3
    if (floor3VaultDoor && currentFloor === 3) {
        if (player.position.distanceTo(floor3VaultDoor.pivot.position) < 3.0) {
            if (player.collectedKeycardsCount >= TOTAL_KEYCARDS) {
                floor3VaultDoor.isOpen = !floor3VaultDoor.isOpen;
                floor3VaultDoor.targetAngle = floor3VaultDoor.isOpen ? Math.PI / 2 : 0;
                audio.playDoorSound();
            } else {
                const objElem = document.getElementById('objective');
                if (objElem) objElem.innerText = `¡PUERTA BLOQUEADA! Necesitas 5 Tarjetas (${player.collectedKeycardsCount}/${TOTAL_KEYCARDS})`;
            }
        }
    }

    // 4. Pilas
    batteries.forEach(bat => {
        if (bat.floor === currentFloor && !bat.collected) {
            if (player.position.distanceTo(bat.mesh.position) < 2.5) {
                bat.collected = true;
                scene.remove(bat.mesh);
                player.battery = Math.min(100, player.battery + 40);
                audio.playFlashlightClick();
            }
        }
    });

    // 5. Chocolates (+5 Cordura)
    chocolates.forEach(choc => {
        if (choc.floor === currentFloor && !choc.collected) {
            if (player.position.distanceTo(choc.mesh.position) < 2.5) {
                choc.collected = true;
                scene.remove(choc.mesh);
                player.sanity = Math.min(100, player.sanity + 5);
                audio.playFlashlightClick();

                const sanityBar = document.getElementById('sanity-bar');
                if (sanityBar) sanityBar.style.width = `${player.sanity}%`;
            }
        }
    });

    // 6. Palancas
    levers.forEach(lev => {
        if (lev.floor === currentFloor && !lev.activated) {
            if (player.position.distanceTo(lev.mesh.position) < 2.5) {
                lev.activated = true;
                lev.pivot.rotation.x = -Math.PI / 2;
                player.activatedLeversCount++;
                audio.playLeverSound();

                checkSpeedCollectAchievement();

                const objElem = document.getElementById('objective');
                if (objElem) objElem.innerText = `Palancas: ${player.activatedLeversCount}/${TOTAL_LEVERS}`;
            }
        }
    });

    // 7. Tarjetas
    keycards.forEach(card => {
        if (card.floor === currentFloor && !card.collected) {
            if (player.position.distanceTo(card.mesh.position) < 2.5) {
                card.collected = true;
                scene.remove(card.mesh);
                player.collectedKeycardsCount++;
                audio.playFlashlightClick();

                checkSpeedCollectAchievement();

                const objElem = document.getElementById('objective');
                if (objElem) objElem.innerText = `Tarjetas: ${player.collectedKeycardsCount}/${TOTAL_KEYCARDS} | Palancas: ${player.activatedLeversCount}/${TOTAL_LEVERS}`;
            }
        }
    });

    // 8. Generador y Fin de Juego
    if (generatorMesh && currentFloor === 3) {
        if (player.position.distanceTo(generatorMesh.position) < 3.5) {
            if (player.activatedLeversCount < TOTAL_LEVERS) {
                const objElem = document.getElementById('objective');
                if (objElem) objElem.innerText = `¡SIN ENERGÍA! Activa las 4 Palancas primero (${player.activatedLeversCount}/${TOTAL_LEVERS})`;
            } else if (!generatorRunning) {
                generatorRunning = true;
                if (generatorStatusLight) generatorStatusLight.color.setHex(0x00ff00);
                audio.playGeneratorStart();
                setTimeout(() => triggerWin(), 1800);
            }
        }
    }

    // 9. Notas
    notes.forEach(note => {
        if (note.floor === currentFloor) {
            if (player.position.distanceTo(note.mesh.position) < 2.5) openNote(note.text);
        }
    });
}

function checkSpeedCollectAchievement() {
    if (player.collectedKeycardsCount === TOTAL_KEYCARDS && player.activatedLeversCount === TOTAL_LEVERS) {
        cardsAndLeversCompletedTime = clock.getElapsedTime() - gameStartTime;
        if (cardsAndLeversCompletedTime <= 60) {
            achievements.speedCollect = true;
            saveAchievements();
        }
    }
}

function openNote(text) {
    player.readingNote = true;
    const noteText = document.getElementById('note-text');
    const noteModal = document.getElementById('note-modal');
    if (noteText) noteText.innerText = text;
    if (noteModal) noteModal.style.display = 'block';
    document.exitPointerLock();
}

function closeNote() {
    player.readingNote = false;
    const noteModal = document.getElementById('note-modal');
    if (noteModal) noteModal.style.display = 'none';
    document.body.requestPointerLock();
}

function triggerGameOver() {
    document.exitPointerLock();
    // Al morir nos envía de regreso al menú principal
    location.reload();
}

function triggerWin() {
    document.exitPointerLock();

    const totalTime = clock.getElapsedTime() - gameStartTime;

    achievements.escaped = true;
    if (totalTime <= 60) achievements.speedWin = true;
    if (player.sanity >= 100 && player.battery >= 100) achievements.flawless = true;
    if (!player.tookDamage) achievements.untouched = true;

    saveAchievements();

    const winScreen = document.getElementById('win-screen');
    if (winScreen) winScreen.style.display = 'flex';
}

/* =================================================================
   12. ACTUALIZACIÓN DE JUGADOR Y EFECTO PANTALLA BORROSA
   ================================================================= */
function updatePlayer(delta) {
    if (isLocked && !player.readingNote) {
        if (player.flashlightOn) {
            player.battery = Math.max(0, player.battery - delta * 0.7);
            const batNum = document.getElementById('battery-num');
            const batBar = document.getElementById('battery-bar');
            if (batNum) batNum.innerText = `${Math.round(player.battery)}%`;
            if (batBar) batBar.style.width = `${player.battery}%`;

            if (player.battery === 0) {
                player.flashlightOn = false;
                flashlightLight.visible = false;
            }
        }

        // Pantalla borrosa al bajar de 50 de Cordura
        const container = document.getElementById('game-container');
        if (container) {
            if (player.sanity <= 50) {
                const blurAmount = ((50 - player.sanity) / 10).toFixed(1);
                container.style.filter = `blur(${blurAmount}px)`;
            } else {
                container.style.filter = 'none';
            }
        }

        player.isSprinting = (keys['ShiftLeft'] || keys['ShiftRight']) && player.stamina > 5;
        player.isCrouching = keys['KeyC'] || keys['ControlLeft'];

        let moveSpeed = player.speed;
        if (player.isSprinting) {
            moveSpeed = player.sprintSpeed;
            player.stamina = Math.max(0, player.stamina - delta * 25);
        } else {
            player.stamina = Math.min(100, player.stamina + delta * 15);
        }

        if (player.isCrouching) moveSpeed = player.crouchSpeed;

        const stamBar = document.getElementById('stamina-bar');
        if (stamBar) stamBar.style.width = `${player.stamina}%`;

        const moveDir = new THREE.Vector3();
        if (keys[keyBindings.forward]) moveDir.z -= 1;
        if (keys[keyBindings.backward]) moveDir.z += 1;
        if (keys[keyBindings.left]) moveDir.x -= 1;
        if (keys[keyBindings.right]) moveDir.x += 1;

        moveDir.normalize();

        const rotationMatrix = new THREE.Matrix4().makeRotationY(player.rotation.y);
        moveDir.applyMatrix4(rotationMatrix);

        const nextX = player.position.x + moveDir.x * moveSpeed * delta;
        const nextZ = player.position.z + moveDir.z * moveSpeed * delta;

        if (!checkWallCollision(nextX, player.position.z)) player.position.x = nextX;
        if (!checkWallCollision(player.position.x, nextZ)) player.position.z = nextZ;

        const targetHeight = player.isCrouching ? player.height * 0.6 : player.height;
        const yBase = (currentFloor - 1) * FLOOR_HEIGHT;
        player.position.y = yBase + targetHeight;

        camera.position.copy(player.position);
        camera.rotation.copy(player.rotation);

        if (moveDir.length() > 0) {
            if (Math.random() < (player.isSprinting ? 0.08 : 0.04)) audio.playFootstep(player.isSprinting);
        }
    }

    doors.forEach(door => {
        door.currentAngle = THREE.MathUtils.lerp(door.currentAngle, door.targetAngle, delta * 6);
        door.pivot.rotation.y = door.currentAngle;
    });

    if (floor3VaultDoor) {
        floor3VaultDoor.currentAngle = THREE.MathUtils.lerp(floor3VaultDoor.currentAngle, floor3VaultDoor.targetAngle, delta * 6);
        floor3VaultDoor.pivot.rotation.y = floor3VaultDoor.currentAngle;
    }

    checkInteractionPrompt();
}

function checkWallCollision(x, z) {
    if (x < 0.4 || x > GRID_SIZE * CELL_SIZE - 0.4 || z < 0.4 || z > GRID_SIZE * CELL_SIZE - 0.4) return true;
    const gridX = Math.floor(x / CELL_SIZE);
    const gridZ = Math.floor(z / CELL_SIZE);
    const grid = layouts[currentFloor - 1];
    if (grid && grid[gridZ] && grid[gridZ][gridX] === 1) return true;
    return false;
}

function checkInteractionPrompt() {
    if (!isLocked) return;

    const prompt = document.getElementById('interaction-prompt');
    const crosshair = document.getElementById('crosshair');

    let hovering = false;

    stairs.forEach(stair => {
        if (stair.fromFloor === currentFloor && player.position.distanceTo(stair.position) < 3.0) hovering = true;
    });

    doors.forEach(door => {
        if (door.floor === currentFloor && player.position.distanceTo(door.pivot.position) < 2.8) hovering = true;
    });

    if (floor3VaultDoor && currentFloor === 3 && player.position.distanceTo(floor3VaultDoor.pivot.position) < 3.0) hovering = true;

    batteries.forEach(bat => {
        if (bat.floor === currentFloor && !bat.collected && player.position.distanceTo(bat.mesh.position) < 2.5) hovering = true;
    });

    chocolates.forEach(choc => {
        if (choc.floor === currentFloor && !choc.collected && player.position.distanceTo(choc.mesh.position) < 2.5) hovering = true;
    });

    levers.forEach(lev => {
        if (lev.floor === currentFloor && !lev.activated && player.position.distanceTo(lev.mesh.position) < 2.5) hovering = true;
    });

    keycards.forEach(card => {
        if (card.floor === currentFloor && !card.collected && player.position.distanceTo(card.mesh.position) < 2.5) hovering = true;
    });

    if (generatorMesh && currentFloor === 3 && player.position.distanceTo(generatorMesh.position) < 3.5) hovering = true;

    notes.forEach(note => {
        if (note.floor === currentFloor && player.position.distanceTo(note.mesh.position) < 2.5) hovering = true;
    });

    if (hovering) {
        if (prompt) prompt.style.display = 'block';
        if (crosshair) crosshair.classList.add('active');
    } else {
        if (prompt) prompt.style.display = 'none';
        if (crosshair) crosshair.classList.remove('active');
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/* =================================================================
   13. BUCLE PRINCIPAL (ANIMATION LOOP)
   ================================================================= */
let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = Math.min(clock.getDelta(), 0.1);

    updatePlayer(delta);
    updateMonster(delta);

    renderer.render(scene, camera);
}

window.onload = () => {
    initEngine();
    animate();
};