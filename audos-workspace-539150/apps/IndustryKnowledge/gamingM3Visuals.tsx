import type{GamingM3VisualKind}from'./gamingM3Core';import{VisualView}from'./fashionVisualKit';import{GAMING_M3_VISUALS}from'./gamingM3VisualSpecs';
export function renderGamingModule03Visual(kind:GamingM3VisualKind){const visual=GAMING_M3_VISUALS[kind];return visual?<VisualView spec={visual.spec}/>:null;}
