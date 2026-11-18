import type{MfgMachineryM1VisualKind}from'./mfgMachineryM1Core';import{VisualView}from'./fashionVisualKit';import{MFG_MACHINERY_M1_VISUALS}from'./mfgMachineryM1VisualSpecs';
export function renderMfgMachineryModule01Visual(kind:MfgMachineryM1VisualKind){const visual=MFG_MACHINERY_M1_VISUALS[kind];return visual?<VisualView spec={visual.spec}/>:null;}
