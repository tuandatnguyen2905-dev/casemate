import type{GamingM2VisualKind}from'./gamingM2Core';import{VisualView}from'./fashionVisualKit';import{GAMING_M2_VISUALS}from'./gamingM2VisualSpecs';
export function renderGamingModule02Visual(kind:GamingM2VisualKind){const visual=GAMING_M2_VISUALS[kind];return visual?<VisualView spec={visual.spec}/>:null;}
