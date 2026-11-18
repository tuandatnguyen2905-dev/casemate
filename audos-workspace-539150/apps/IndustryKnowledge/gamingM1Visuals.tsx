import type{GamingM1VisualKind}from'./gamingM1Core';import{VisualView}from'./fashionVisualKit';import{GAMING_M1_VISUALS}from'./gamingM1VisualSpecs';
export function renderGamingModule01Visual(kind:GamingM1VisualKind){const visual=GAMING_M1_VISUALS[kind];return visual?<VisualView spec={visual.spec}/>:null;}
