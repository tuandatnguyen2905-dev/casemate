import type{AdtechM1VisualKind}from'./adtechM1Core';import{VisualView}from'./fashionVisualKit';import{ADTECH_M1_VISUALS}from'./adtechM1VisualSpecs';
export function renderAdtechModule01Visual(kind:AdtechM1VisualKind){const visual=ADTECH_M1_VISUALS[kind];return visual?<VisualView spec={visual.spec}/>:null;}
