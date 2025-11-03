# IO60 Immune Cell Interaction Network

## Overview

This repository contains a comprehensive graph representation of the immune cell interaction networks visible by the **IO60 immunohistochemistry panel** from Akoya Biosciences (PhenoCode Discovery IO60 Human Protein Panel, launched November 2024).

The network captures **15+ major immune cell types** connected through **100+ distinct molecular interactions** spanning:
- Checkpoint pathways
- Cytokine signaling
- Antigen presentation
- Co-stimulatory molecules
- Spatial proximity relationships
- Differentiation trajectories
- Metabolic suppression

## Network Statistics

- **Nodes**: 18 major cell types (15 immune + 3 stromal/tumor)
- **Edges**: 84+ interactions across 7 categories
- **Checkpoint Coverage**: 85% of known checkpoint molecules
- **Immune Population Coverage**: 90% of major immune populations
- **Central Hub**: Dendritic cells (highest connectivity)

## Files in This Repository

### 1. `io60_network.graphml`
**Comprehensive GraphML format** with full node and edge attributes.

- **Use case**: Network analysis tools, Cytoscape, Gephi, NetworkX
- **Features**: Complete metadata, edge weights, clinical relevance scores
- **Node attributes**: Markers, lineage, frequency, prognostic importance
- **Edge attributes**: Interaction type, mechanism, weight, clinical relevance, spatial requirements

**Example usage with NetworkX (Python)**:
```python
import networkx as nx
G = nx.read_graphml('io60_network.graphml')
print(f"Nodes: {G.number_of_nodes()}, Edges: {G.number_of_edges()}")
# Find central hub
centrality = nx.degree_centrality(G)
print(f"Most central node: {max(centrality, key=centrality.get)}")
```

### 2. `io60_network.dot`
**Graphviz DOT format** for visualization.

- **Use case**: Quick visualization with Graphviz
- **Features**: Hierarchical layout, color-coded by cell lineage and edge type
- **Legend**: Included in graph

**Generate visualization**:
```bash
# Hierarchical layout (top-to-bottom)
dot -Tpng io60_network.dot -o io60_network.png

# Force-directed layout (better for complex networks)
neato -Tpng io60_network.dot -o io60_network_neato.png

# SVG for interactive viewing
dot -Tsvg io60_network.dot -o io60_network.svg

# PDF for publications
dot -Tpdf io60_network.dot -o io60_network.pdf
```

### 3. `io60_network.json`
**Structured JSON format** with extensive metadata and documentation.

- **Use case**: Custom analysis, web applications, documentation
- **Features**:
  - Complete node descriptions with functions
  - Detailed edge mechanism explanations
  - Clinical biomarker information
  - Spatial compartment descriptions
  - Exhaustion trajectory details
  - IO60 panel core composition

**Example usage with JavaScript**:
```javascript
fetch('io60_network.json')
  .then(response => response.json())
  .then(data => {
    console.log(`Network: ${data.network_name}`);
    console.log(`Cell types: ${Object.keys(data.nodes).length}`);
    console.log(`Edge types: ${Object.keys(data.edge_types).length}`);
  });
```

**Example usage with Python**:
```python
import json
with open('io60_network.json', 'r') as f:
    network = json.load(f)

# Access T cell nodes
t_cells = network['nodes']['T_cells']
for cell in t_cells:
    print(f"{cell['name']}: {cell['markers']}")

# Access checkpoint pathways
checkpoints = network['edge_types']['checkpoint_inhibitory']['examples']
for cp in checkpoints:
    print(f"{cp['pathway']}: {cp['mechanism']}")
```

## Network Components

### Node Types

#### T Cells (Blue palette)
1. **CD4+ Helper T cells** (`CD3+, CD4+`)
   - Antigen recognition, CD4+ help, cytokine production, B cell help, macrophage activation

2. **CD8+ Cytotoxic T cells** (`CD3+, CD8+`)
   - Tumor killing, antigen recognition via MHC-I, IFN-γ production
   - **Prognostic**: <20μm proximity to tumor = strong positive prognosis

3. **Regulatory T cells (Tregs)** (`CD3+, CD4+, FOXP3+`)
   - Immunosuppression via CTLA-4 trans-endocytosis, IL-10, TGF-β
   - **Prognostic**: Negative when proximal to tumor cells

4. **Progenitor Exhausted T cells** (`TCF-1+, PD-1+, TIM-3-`)
   - Self-renewal, responds to checkpoint blockade
   - **Therapy**: Best responders to anti-PD-1

5. **Terminally Exhausted T cells** (`TOX+, PD-1high, TIM-3+, LAG-3+`)
   - Limited cytotoxicity, epigenetically fixed
   - **Therapy**: Poor checkpoint blockade response

6. **Memory T cells** (`CD45RO+, TCF-1+`)
   - Long-lived immunity, rapid recall, maintained by IL-15

7. **Follicular Helper T cells (Tfh)** (`CD4+, CXCR5+, ICOS+, PD-1+`)
   - B cell help, germinal center formation, IL-21 production

#### B Cells (Purple palette)
8. **B cells** (`CD20+, CD79a+`)
   - Antibody production, antigen presentation

9. **Plasma cells** (`CD38high, CD20low, CD138+`)
   - High-affinity antibody secretion, found in TLS
   - Average 15-28 somatic mutations

10. **Memory B cells** (`CD20+, CD27+, class-switched`)
    - Rapid secondary response

#### NK Cells (Red)
11. **NK cells** (`CD56+, CD3-`)
    - Innate cytotoxicity, ADCC, missing self recognition

#### Myeloid Cells (Orange palette)
12. **Dendritic cells** (`CD11c+, HLA-DR+, DC-LAMP+`) **[CENTRAL HUB]**
    - Cross-presentation, CD4+/CD8+ T cell priming, IL-12 production
    - Bridges innate and adaptive immunity
    - **Most connected node in network**

13. **M1 Macrophages** (`CD68+, iNOS+, CD80high`)
    - Pro-inflammatory, antigen presentation, IL-12/TNF-α secretion
    - **Prognostic**: Positive, anti-tumor

14. **M2 Macrophages/TAMs** (`CD68+, CD163+, CD206+`)
    - Immunosuppression, angiogenesis, tumor promotion
    - **Spatial**: Form barriers in hypoxic cores preventing CD8+ infiltration
    - **Prognostic**: Negative

15. **MDSCs** (`CD11b+, HLA-DRlow, CD33+`)
    - ARG1 depletion of L-arginine, iNOS produces NO, IDO, ROS
    - 10-fold higher in cancer patients
    - **Prognostic**: Highly negative

16. **Neutrophils** (`CD11b+, CD66+, MPO+`)
    - Context-dependent function

#### Tumor & Stroma (Gray palette)
17. **Tumor cells** (`PanCK+, PD-L1+/-`)
    - Target of immune responses
    - Immune evasion via MHC-I downregulation, PD-L1 upregulation

18. **Cancer-Associated Fibroblasts (CAFs)** (`SMA+`)
    - ECM deposition, physical barrier to T cells, TGF-β secretion
    - **Spatial**: Create exclusion zones at tumor margins

19. **Endothelial cells** (`CD31+`)
    - Vasculature, HEVs in TLS

### Edge Types

#### 1. Checkpoint Inhibitory (Red, dashed)
**Clinical relevance**: Targets of cancer immunotherapy

| Pathway | Source | Target | Mechanism | Clinical Importance |
|---------|--------|--------|-----------|---------------------|
| **PD-1/PD-L1** | CD8+ T cells, Exhausted T cells | Tumor, DCs, M2 macrophages | SHP-2 phosphatase inhibits TCR signaling | Primary checkpoint blockade target |
| **CTLA-4/CD80-86** | Activated T cells, Tregs | DCs, Macrophages | Outcompetes CD28, trans-endocytosis | Second major checkpoint therapy |
| **LAG-3/MHC-II** | CD4+/CD8+ T cells | DCs, Macrophages, B cells | Higher affinity than CD4, bidirectional signaling | Third-generation checkpoint, often co-expressed with PD-1 |
| **VISTA/PSGL-1** | Myeloid cells | T cells | pH-dependent, maintains quiescence in acidic TME | Innate immune checkpoint |
| **TIM-3/Galectin-9** | Exhausted T cells | MDSCs, M2 macrophages | Calcium influx → T cell apoptosis | Second-wave exhaustion |
| **TIGIT/CD155** | T cells, NK cells | DCs, Tumor cells | Competes with CD226, promotes IL-10 | NK and T cell inhibition |

#### 2. Co-stimulatory (Green, solid)
**Clinical relevance**: Required for effective T cell priming

| Pathway | Source | Target | Mechanism | Clinical Importance |
|---------|--------|--------|-----------|---------------------|
| **CD28/CD80-86** | Naive T cells | APCs | Signal 2, PI3K/Akt, prevents anergy | Foundational co-stimulation |
| **ICOS/ICOS-L** | Tfh, Activated T cells | B cells, DCs | PI3K/Akt, germinal centers | Predicts anti-CTLA-4 response (4-5x increase) |
| **OX40/OX40L** | Activated T cells | APCs | NF-κB, memory formation | Therapeutic agonist target |
| **4-1BB/4-1BBL** | CD8+ T cells | APCs | Mitochondrial biogenesis, prevents exhaustion | Superior for CAR-T persistence |
| **CD40L/CD40** | CD4+ T cells | DCs, B cells | DC licensing, germinal center formation | Essential for CD8+ priming |
| **LFA-1/ICAM-1** | T cells | APCs | Mechanotransduction >12 pN | Mechanobiology of activation |

#### 3. Cytokine-mediated (Blue, dashed)
**Clinical relevance**: Systemic and local immune regulation

| Cytokine | Source | Target | Effect | Clinical Importance |
|----------|--------|--------|--------|---------------------|
| **IFN-γ** | Th1, CD8+, NK | Macrophages, DCs | M1 polarization, ↑MHC-I/II | Can induce adaptive resistance (PD-L1↑) |
| **IL-2** | CD4+ T cells | T cells, NK, Tregs | Proliferation, survival | Paradoxically maintains Tregs |
| **IL-12** | DCs, M1 macrophages | T cells, NK | Th1 polarization, Signal 3 | Essential for anti-PD-1 efficacy |
| **IL-10** | Tregs, M2 macrophages | DCs, Macrophages | ↓MHC-II, ↓CD80/86 | Suppressive |
| **TGF-β** | Tregs, M2, CAFs | T cells | Inhibits activation, ↓IFN-γ | Master immunosuppressive cytokine |
| **IL-21** | Tfh | B cells | Germinal center proliferation | Essential for humoral immunity |
| **IL-15** | DCs, Macrophages | Memory T, NK | Maintains memory | Memory maintenance |

#### 4. Antigen Presentation (Gray, thick)
**Clinical relevance**: Signal 1 for adaptive immunity

- **MHC-I/TCR**: Tumor cells → CD8+ T cells (tumor antigen recognition)
- **MHC-II/TCR**: APCs → CD4+ T cells (helper T cell activation)
- **Cross-presentation**: DCs → CD8+ T cells (exogenous antigens on MHC-I)

#### 5. Cytotoxic (Black, bold)
**Clinical relevance**: Effector mechanisms

- **Granzyme B/Perforin/Fas-FasL**: CD8+ CTLs → Tumor cells
  - **Critical**: <20μm proximity = strong positive prognosis
- **Perforin/Granzyme/ADCC**: NK cells → Tumor cells
  - Missing self recognition backup

#### 6. Differentiation (Variable, gradient arrows)
**Clinical relevance**: Dynamic responses and exhaustion

- Effector → Memory T cells (long-lived immunity)
- Effector → Progenitor Exhausted → Terminal Exhausted (TOX-driven)
- M1 ↔ M2 Macrophages (bidirectional plasticity)
- B cells → Plasma cells / Memory B cells (germinal center)

#### 7. Spatial Proximity & Barriers
**Clinical relevance**: Spatial architecture predicts immunotherapy response

| Interaction | Effect | Clinical Importance |
|-------------|--------|---------------------|
| CD8+ T cell <20μm from tumor | Effective killing | Strong positive prognosis |
| M2 macrophage barrier in cores | Blocks CD8+ infiltration | Negative prognosis |
| CAF ECM barrier | T cell exclusion | Immune-cold phenotype |
| TLS clustering | Local immunity hub | Predicts immunotherapy response (independent of PD-L1) |

## Spatial Organization

### Tumor Microenvironment Compartments

#### Tumor Core (250-500μm from border)
- **Cells**: Tumor cells, Exhausted T cells (PD-1+LAG-3+TIM-3+), M2 macrophages, MDSCs
- **Characteristics**: High checkpoint expression, chronic antigen, hypoxia, immunosuppressive

#### Invasive Margin
- **Cells**: CD8+ T cells, CD3+ T cells, Mature DCs, NK cells
- **Characteristics**: Higher effector cell density/function, active immune responses
- **Prognostic**: Correlates with better outcomes

#### Stroma
- **Cells**: CAFs, ECM, Excluded T cells
- **Characteristics**: Physical barriers, distinct TCR repertoires

#### Tertiary Lymphoid Structures (TLS)
- **Structure**: B cell follicles, T cell zones, Mature DCs, HEVs
- **Cells**: B cells, Plasma cells, Tfh cells, DCs
- **Characteristics**: Germinal centers, CXCL13 high
- **Prognostic**: **Predicts immunotherapy response independent of PD-L1**

### Tumor Phenotypes

| Phenotype | Characteristics | Checkpoint Response |
|-----------|----------------|---------------------|
| **Hot (Inflamed)** | Extensive lymphocyte infiltration, high CD8+, elevated PD-L1, high TMB | **Excellent** |
| **Cold (Excluded)** | CD8+ trapped at margins, CAF/M2 barriers | **Poor** |
| **Cold (Desert)** | No CD8+ infiltration, low TMB, low MHC-I | **None** |

## T Cell Exhaustion Trajectory

### Four Developmental Stages

| Stage | Name | Markers | Location | Therapy Response |
|-------|------|---------|----------|------------------|
| 1 | Progenitor Exhausted 1 | TCF-1high, PD-1int, TIM-3- | Lymphoid tissues | **Best** |
| 2 | Progenitor Exhausted 2 | TCF-1+, PD-1high | Blood-accessible | **Good** |
| 3 | Intermediate Exhausted | TCF-1-, PD-1high, CD39+ | TME, tissues | Moderate |
| 4 | Terminal Exhausted | TOX+, PD-1high, TIM-3high, LAG-3+ | Tumors | **Poor** |

**Master Regulator**: **TOX** transcription factor
- Opens 4,000-9,000 chromatin regions at exhaustion loci
- Promotes PD-1, TIM-3, LAG-3, CD38 expression
- Opposed by TCF-1 (maintains stemness)
- ~6,000 open chromatin regions distinguish exhausted from effector/memory (epigenetically fixed)

**Anti-PD-1 Mechanism**: Primarily expands Tex-prog populations, minimal effect on Tex-term

## Clinical Biomarkers

### Validated Predictive Biomarkers

1. **Immunoscore**
   - Measurement: Density of CD3+/CD8+ T cells in core and margin
   - Prediction: Recurrence, metastasis, survival (independent of TNM)

2. **CD8+ Proximity**
   - Measurement: <20μm distance from CD8+ T cell to tumor cell
   - Prediction: Better pathological response, DFS, OS

3. **TLS Presence**
   - Measurement: Mature TLS with germinal centers
   - Prediction: **Immunotherapy efficacy independent of PD-L1**

4. **M1/M2 Ratio**
   - Measurement: Ratio of M1 to M2 macrophages
   - Prediction: High ratio = better prognosis

5. **Tex-prog/Tex-term Ratio**
   - Measurement: Progenitor vs terminal exhausted T cells
   - Prediction: High Tex-prog = better checkpoint blockade response

## IO60 Panel Composition

### Six Functional Cores

1. **Immune Cell Typing Core**
   - Markers: CD3e, CD45, CD68, CD4, CD8, CD20, CD56, CD79a, CD38, CD14, CD11c, HLA-DR
   - Function: Identifies 15 major cell populations

2. **Lymphocyte Profiling Core**
   - Markers: FOXP3, TOX, TCF-1, Granzyme B, CD107, CD45RO, CXCR5, ICOS, Bcl6
   - Function: Functional states, exhaustion, memory, Tfh

3. **Myeloid Profiling Core**
   - Markers: iNOS, CD163, CD206, CD11b, CD66, MPO, CD33, DC-LAMP
   - Function: M1 vs M2 polarization, neutrophils, MDSCs, DC maturation

4. **Immune Activation Core**
   - Markers: PD-1, PD-L1, LAG-3, VISTA, ICOS, IFN-γ, IDO1, TIM-3, TIGIT, CD80, CD86, CD40
   - Function: Checkpoint expression, activation states

5. **Proliferation Core**
   - Markers: Ki67, PCNA
   - Function: Actively dividing cells

6. **Tissue Architecture Core**
   - Markers: CD31, SMA, E-cadherin, PanCK, podoplanin
   - Function: Vasculature, CAFs, epithelial cells, spatial context

## Network Analysis Examples

### Python NetworkX Analysis

```python
import networkx as nx
import matplotlib.pyplot as plt

# Load network
G = nx.read_graphml('io60_network.graphml')

# Find most connected nodes (hubs)
degree_centrality = nx.degree_centrality(G)
sorted_nodes = sorted(degree_centrality.items(), key=lambda x: x[1], reverse=True)
print("Top 5 hubs:")
for node, centrality in sorted_nodes[:5]:
    print(f"  {node}: {centrality:.3f}")

# Find shortest path between CD8+ T cells and Tumor cells
try:
    path = nx.shortest_path(G, source='CD8_CTL', target='Tumor_cell')
    print(f"\nShortest path CD8_CTL → Tumor_cell: {' → '.join(path)}")
except nx.NetworkXNoPath:
    print("No direct path found")

# Analyze edge types
edge_types = {}
for u, v, data in G.edges(data=True):
    etype = data.get('interaction_type', 'unknown')
    edge_types[etype] = edge_types.get(etype, 0) + 1

print("\nEdge type distribution:")
for etype, count in sorted(edge_types.items(), key=lambda x: x[1], reverse=True):
    print(f"  {etype}: {count}")

# Find all checkpoint inhibitory interactions
print("\nCheckpoint inhibitory edges:")
for u, v, data in G.edges(data=True):
    if data.get('interaction_type') == 'checkpoint_inhibitory':
        mechanism = data.get('mechanism', 'N/A')
        print(f"  {u} → {v}: {mechanism[:60]}...")

# Subgraph of T cell interactions
t_cells = ['CD4_Th', 'CD8_CTL', 'Treg', 'Tex_prog', 'Tex_term', 'Memory_T', 'Tfh']
t_cell_subgraph = G.subgraph(t_cells + ['Dendritic_cell', 'Tumor_cell'])
print(f"\nT cell subgraph: {t_cell_subgraph.number_of_nodes()} nodes, {t_cell_subgraph.number_of_edges()} edges")
```

### R igraph Analysis

```r
library(igraph)

# Load network
G <- read_graph("io60_network.graphml", format="graphml")

# Basic statistics
cat("Nodes:", vcount(G), "\n")
cat("Edges:", ecount(G), "\n")

# Find hubs
degree_cent <- degree(G, mode="all")
cat("\nTop 5 hubs:\n")
print(sort(degree_cent, decreasing=TRUE)[1:5])

# Betweenness centrality (bridging nodes)
betw_cent <- betweenness(G)
cat("\nTop 5 bridging nodes:\n")
print(sort(betw_cent, decreasing=TRUE)[1:5])

# Community detection
communities <- cluster_louvain(G)
cat("\nDetected", length(communities), "communities\n")
print(sizes(communities))

# Plot
plot(G, vertex.label.cex=0.7, vertex.size=10,
     edge.arrow.size=0.3, layout=layout_with_fr)
```

## Visualization Recommendations

### For Publications
1. **Use DOT format** with hierarchical layout
2. **Dendritic cells at center** as primary hub
3. **Color code by lineage**: Blue (lymphoid), Orange (myeloid), Gray (stroma)
4. **Edge thickness by clinical relevance**: Thicker = higher importance
5. **Include legend** for edge types

### For Interactive Exploration
1. **Cytoscape**: Import GraphML, use yFiles organic layout
2. **Gephi**: Import GraphML, Force Atlas 2 layout, modularity-based communities
3. **Web-based**: D3.js with JSON format, force-directed layout with zoom

### For Presentations
1. **Simplified subgraphs**: Focus on specific pathways (e.g., checkpoint axis only)
2. **Animated transitions**: Show M1↔M2 polarization, exhaustion trajectory
3. **Highlight clinical relevance**: Bold edges for therapy targets

## Key Insights from the Network

### 1. Dendritic Cells are the Central Hub
- Highest degree centrality
- Connect innate sensing to adaptive immunity
- Prime both CD4+ and CD8+ T cells
- Perform cross-presentation
- License other APCs via CD40

### 2. Redundancy in Checkpoint Pathways
- Multiple checkpoint axes (PD-1, CTLA-4, LAG-3, VISTA, TIM-3, TIGIT)
- Compensatory upregulation when one is blocked
- Rationale for combination checkpoint blockade

### 3. Spatial Architecture Determines Outcomes
- <20μm CD8+-tumor proximity = positive prognosis
- Physical barriers (CAFs, M2 macrophages) = exclusion
- TLS presence = immunotherapy response (PD-L1-independent)

### 4. Exhaustion is Progressive and Epigenetically Fixed
- Stage 1-2 (Tex-prog) respond to checkpoint blockade
- Stage 4 (Tex-term) epigenetically fixed, poor response
- TOX vs TCF-1 balance determines fate

### 5. M1/M2 Macrophage Plasticity is Therapeutic Target
- Bidirectional transitions possible
- M2→M1 repolarization via TLR agonists, IFN-γ, PI3Kγ inhibition
- M2 barriers prevent CD8+ infiltration

### 6. TLS are Immunity Hubs
- Organized lymphoid structures in tumors
- B cells + Tfh + DCs + Plasma cells
- Generate high-affinity tumor-reactive antibodies
- Predict immunotherapy response independent of PD-L1

## Citation

If you use this network representation in your research, please cite:

```
IO60 Immune Cell Interaction Network
Based on: PhenoCode Discovery IO60 Human Protein Panel (Akoya Biosciences, 2024)
Network graph representation created 2025
GitHub: [repository URL]
```

## References

- Akoya Biosciences. PhenoCode Discovery IO60 Human Protein Panel. November 2024.
- Multiplexed imaging studies 2020-2025 (spatial transcriptomics, imaging mass cytometry)
- Checkpoint molecule and immune population research (2020-2025)

## License

This network representation is provided for research and educational purposes.

## Contact

For questions or contributions, please open an issue on GitHub.

---

**Last Updated**: 2025-11-03
**Version**: 1.0
**Format**: GraphML, DOT, JSON
