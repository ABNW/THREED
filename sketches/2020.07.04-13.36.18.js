import { TimelineMax } from "gsap";
import * as dat from "dat.gui";
import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("#000", 1);

  // Setup a camera
  // const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  const frustumSize = 4;
  const aspect = window.innerWidth / window.innerHeight;
  const camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1000)
  camera.position.set(0, 0, 0);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  // const geometry = new THREE.SphereGeometry(1, 32, 16);

  //Setup a material
  // const material = new THREE.MeshBasicMaterial({
  //   color: "blue",
  //   wireframe: true
  // });

  const geometry = new THREE.PlaneGeometry(4*aspect - 0.2, 3.8, 1, 1);

  const material = new THREE.ShaderMaterial({
    extensions: {
      derivatives: "#extension  GL_OES_stadard_derivitaive : enable"
    }, 
    side: THREE.DoubleSide,
    uniforms: {
      time: {type: "f", value: 0},
      resolution: { type: "v4", value: new THREE.Vector4()},
      uvRate1: {
        value: new THREE.Vector2(1, 1)
      }
    },
    vertexShader: vertex,
    fragmentShader: fragment
  });

  material.uniforms.resolution.value.x = window.innerWidth;
  material.uniforms.resolution.value.y = window.innerHeight; 
  material.uniforms.resolution.value.z = 1;
  material.uniforms.resolution.value.w = 1;


  // Setup a mesh with geometry + material
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
