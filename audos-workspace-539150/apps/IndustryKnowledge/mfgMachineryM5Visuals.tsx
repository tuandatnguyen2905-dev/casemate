import type{MfgMachineryM5VisualKind}from'./mfgMachineryM5Core';import{VisualView}from'./fashionVisualKit';import{MFG_MACHINERY_M5_VISUALS}from'./mfgMachineryM5VisualSpecs';
export function renderMfgMachineryModule05Visual(kind:MfgMachineryM5VisualKind){const visual=MFG_MACHINERY_M5_VISUALS[kind];return visual?<VisualView spec={visual.spec}/>:null;}
