import type{MfgMachineryM2VisualKind}from'./mfgMachineryM2Core';import{VisualView}from'./fashionVisualKit';import{MFG_MACHINERY_M2_VISUALS}from'./mfgMachineryM2VisualSpecs';
export function renderMfgMachineryModule02Visual(kind:MfgMachineryM2VisualKind){const visual=MFG_MACHINERY_M2_VISUALS[kind];return visual?<VisualView spec={visual.spec}/>:null;}
