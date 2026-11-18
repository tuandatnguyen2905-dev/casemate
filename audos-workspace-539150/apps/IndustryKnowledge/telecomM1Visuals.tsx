import type{TelecomM1VisualKind}from'./telecomM1Core';import{VisualView}from'./fashionVisualKit';import{TELECOM_M1_VISUALS}from'./telecomM1VisualSpecs';
export function renderTelecomModule01Visual(kind:TelecomM1VisualKind){const visual=TELECOM_M1_VISUALS[kind];return visual?<VisualView spec={visual.spec}/>:null;}
