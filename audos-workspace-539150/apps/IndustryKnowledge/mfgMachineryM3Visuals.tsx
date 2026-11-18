import type{MfgMachineryM3VisualKind}from'./mfgMachineryM3Core';import{VisualView}from'./fashionVisualKit';import{MFG_MACHINERY_M3_VISUALS}from'./mfgMachineryM3VisualSpecs';
export function renderMfgMachineryModule03Visual(kind:MfgMachineryM3VisualKind){const visual=MFG_MACHINERY_M3_VISUALS[kind];return visual?<VisualView spec={visual.spec}/>:null;}
