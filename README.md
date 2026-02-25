# 🚀 Scalable Visual Workflow Engine for Chatbot Design

A **production-ready Chatbot Flow Builder** built using **React.js, TypeScript, and React Flow**.

This project enables users to visually construct chatbot message workflows by connecting nodes, enforcing structural validation rules, and maintaining extensible architecture for future enhancements.

Built as part of the **BiteSpeed Frontend Task**, with focus on:

- Clean Architecture  
- Extensibility  
- Strong Type Safety  
- Scalable State Management  
- Production-Ready Code Quality  

---

## 🌐 Live Demo

👉 **Live App:** https://flow-weaver-psi.vercel.app/  
👉 **GitHub Repository:** https://github.com/Piyushkumarsudhanshu/Chatbot-Flow-Builder.git

---

## 🎯 Problem Statement

A chatbot flow consists of multiple connected message nodes defining execution order.

The goal was to:

- Build a visual flow editor  
- Support drag-and-drop node creation  
- Enforce connection constraints  
- Validate structural integrity before saving  
- Keep the architecture extensible for future node types  

---

## ✨ Core Features

### 🧩 1. Message Node (Custom Node)

- Drag-and-drop node creation  
- Editable text content  
- One source handle (max 1 outgoing edge)  
- One target handle (multiple incoming edges allowed)  
- Built using React Flow custom nodes  

---

### 📦 2. Dynamic Nodes Panel

- Displays supported node types  
- Config-driven design  
- Easily extendable for:
  - Delay Node  
  - Condition Node  
  - API Node  
  - Webhook Node  

---

### ⚙️ 3. Settings Panel

- Replaces Nodes Panel when a node is selected  
- Live text editing  
- Immediate state synchronization  

---

### 🔗 4. Smart Edge Constraints

The system enforces:

- ❌ Only one outgoing edge per source handle  
- ✅ Multiple incoming edges allowed  
- Controlled edge creation logic  

---

### 💾 5. Flow Validation & Save Logic

Before saving, the flow is validated.

#### Validation Rules:

- If only one node → ✅ Valid  
- If multiple nodes:
  - Only one node can have no incoming edges  
  - If more than one node has empty target handles → ❌ Error  

Ensures a valid chatbot entry point structure.

---

## 🏗️ Architecture Overview

This project follows **modular, scalable architecture principles.**

### 📁 Folder Structure

```
src/
│
├── components/
│   ├── flow/
│   │   ├── FlowBuilder.tsx
│   │   ├── CustomNode.tsx
│   │   ├── nodeTypes.ts
│   │   └── edgeUtils.ts
│   │
│   ├── panels/
│   │   ├── NodesPanel.tsx
│   │   ├── SettingsPanel.tsx
│   │   └── PanelWrapper.tsx
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── ErrorToast.tsx
│
├── store/
│   └── useFlowStore.ts
│
├── types/
│   ├── node.types.ts
│   └── flow.types.ts
│
├── utils/
│   └── validation.ts
│
├── App.tsx
└── main.tsx
```

---

## 🧠 State Management Strategy

Uses **Zustand** for centralized state management.

### Why Zustand?

- Lightweight  
- Minimal boilerplate  
- Easy React Flow integration  
- Scales better than local component state  

### Store Responsibilities

- Manage nodes  
- Manage edges  
- Track selected node  
- Handle connection logic  
- Perform validation  
- Save flow data  

Business logic is fully separated from UI components.

---

## 🔌 Extensibility Design

The node system is **config-driven**:

```ts
const nodeTypes = {
  message: MessageNode,
  delay: DelayNode,
  condition: ConditionNode,
};
```

### To Add a New Node Type:

1. Create component  
2. Register in `nodeTypes`  
3. Add entry in Nodes Panel config  

✅ No refactoring required.

---

## 🎨 UI Layout

```
----------------------------------
| Save Button                   |
----------------------------------
| Canvas        | Right Panel   |
|               |               |
|               | NodesPanel    |
|               | OR            |
|               | SettingsPanel |
----------------------------------
```

---

## 🛠️ Tech Stack

| Technology    | Purpose |
|--------------|----------|
| React 18     | Component-based UI |
| TypeScript   | Strong typing |
| React Flow   | Graph-based editor |
| Zustand      | Global state management |
| TailwindCSS  | Utility-first styling |
| UUID         | Unique node IDs |

---

## 📐 Engineering Decisions

### 1️⃣ Separation of Concerns
UI components do not contain business logic.

### 2️⃣ Strong Type Safety
No `any` types used.

### 3️⃣ Validation Decoupled
Validation logic isolated in `/utils/validation.ts`.

### 4️⃣ Config-Driven Node System
Enables future scalability.

### 5️⃣ Production-Ready Structure
Organized by feature and responsibility.

---

## 🔍 Flow Validation Logic (Concept)

```ts
function validateFlow(nodes, edges) {
  if (nodes.length <= 1) return true;

  const nodesWithoutIncomingEdges = nodes.filter(node =>
    !edges.some(edge => edge.target === node.id)
  );

  return nodesWithoutIncomingEdges.length === 1;
}
```

---

## 🚀 Installation & Setup

```bash
git clone <repo-url>
cd chatbot-flow-builder
npm install
npm run dev
```

---

## 🏗️ Production Build

```bash
npm run build
```

---

## 🌍 Deployment

Deployed using:

- Vercel  
- Netlify  
- Render  

---

## 🔮 Future Enhancements

- Local storage persistence  
- Undo / Redo functionality  
- MiniMap  
- Drag Snap Grid  
- Multi-node selection  
- Export flow JSON  
- Server-side persistence  
- Version history  

---

## 📊 What This Project Demonstrates

- React architecture understanding  
- Custom component design  
- Graph-based UI systems  
- Controlled side effects  
- State management discipline  
- Validation design thinking  
- Scalable frontend engineering  

---

## 👨‍💻 Author

**Piyush Kumar Sudhanshu**  
B.Tech – Information Technology  
NIT Kurukshetra  

---