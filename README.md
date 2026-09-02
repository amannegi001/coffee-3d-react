# ☕ Coffee House 3D — Interactive 3D Coffee Cup Viewer

An interactive, responsive 3D web application featuring a realistic ceramic coffee cup model rendered in WebGL using React, Three.js, React Three Fiber, and Tailwind CSS.

---

## ✨ Features

- **3D GLB Model Rendering**: Seamlessly renders and interacts with a 3D ceramic coffee cup model (`.glb`).
- **Auto-Centering & Dynamic Framing**: Powered by `@react-three/drei`'s `<Bounds>` and `<Center>` to ensure the model is automatically centered at origin and dynamically framed for any screen resolution or aspect ratio.
- **Realistic Lighting & Shadows**:
  - Balanced 3-point lighting setup (warm key light, cool soft fill light, and warm rim/bounce light).
  - Hemisphere ambient lighting for natural studio depth.
  - Realistic ground `<ContactShadows>` grounded underneath the cup base.
- **Smooth Orbit Controls**:
  - Full 360° rotation with inertia damping (`enableDamping`).
  - Min/max zoom limits and polar angle clamping to prevent clipping.
  - Interactive **Auto-Rotate** toggle and **Reset View** controls.
- **Dark Coffee-Themed UI**:
  - Elegant espresso/mocha dark theme with radial glow.
  - Glassmorphic header and interactive helper badges.
  - Built with **Tailwind CSS v4**.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Frontend UI framework |
| **Vite 8** | High-performance build tool & development server |
| **Three.js** | 3D graphics & WebGL library |
| **@react-three/fiber** | Declarative React renderer for Three.js |
| **@react-three/drei** | Three.js helper components (`Bounds`, `Center`, `OrbitControls`, `ContactShadows`, `Html`) |
| **Tailwind CSS v4** | Modern utility-first styling |

---

## 📁 Project Structure

```text
coffee-3d/
├── public/
│   ├── coffee-cup.glb       # 3D Coffee Cup GLB asset
│   ├── favicon.svg          # Favicon
│   └── icons.svg            # SVG icons
├── src/
│   ├── assets/              # Static assets
│   ├── App.jsx              # Main 3D Canvas scene & UI layout
│   ├── index.css            # Tailwind CSS imports & root viewport styles
│   └── main.jsx             # React DOM entry point
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry point
├── package.json             # Dependencies & scripts
└── vite.config.js           # Vite configuration with Tailwind CSS plugin
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn` / `pnpm`

### Installation

1. Clone or navigate to the repository:
   ```bash
   cd coffee-3d
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port indicated in your terminal).

---

## 📜 Available Scripts

- **`npm run dev`**: Starts the Vite development server with HMR.
- **`npm run build`**: Compiles and bundles production-ready assets into the `dist/` directory.
- **`npm run lint`**: Runs ESLint to verify code quality.
- **`npm run preview`**: Locally previews the production build.

---

## 🎮 Controls & Interactions

| Action | Control |
| :--- | :--- |
| **Rotate** | `Left Click + Drag` or `Single Touch + Drag` |
| **Zoom** | `Mouse Wheel` or `Pinch In / Out` |
| **Pan** | `Right Click + Drag` or `Two-Finger Touch + Drag` |
| **Auto-Rotate** | Toggle button in the top right header |
| **Reset Camera** | `Reset View` button in the top right header |

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
