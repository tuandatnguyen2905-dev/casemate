import type{MfgMachineryM4VisualKind}from'./mfgMachineryM4Core';import{VisualView}from'./fashionVisualKit';import{MFG_MACHINERY_M4_VISUALS}from'./mfgMachineryM4VisualSpecs';
export function renderMfgMachineryModule04Visual(kind:MfgMachineryM4VisualKind){const visual=MFG_MACHINERY_M4_VISUALS[kind];return visual?<VisualView spec={visual.spec}/>:null;}
