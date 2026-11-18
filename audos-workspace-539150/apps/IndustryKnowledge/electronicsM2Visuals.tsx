import type{ElectronicsM2VisualKind}from'./electronicsM2Core';import{VisualView}from'./fashionVisualKit';import{ELECTRONICS_M2_VISUALS}from'./electronicsM2VisualSpecs';
export function renderElectronicsModule02Visual(kind:ElectronicsM2VisualKind){const visual=ELECTRONICS_M2_VISUALS[kind];return visual?<VisualView spec={visual.spec}/>:null;}
