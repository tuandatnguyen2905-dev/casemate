import type{SocialM1VisualKind}from'./socialM1Core';import{VisualView}from'./fashionVisualKit';import{SOCIAL_M1_VISUALS}from'./socialM1VisualSpecs';
export function renderSocialModule01Visual(kind:SocialM1VisualKind){const visual=SOCIAL_M1_VISUALS[kind];return visual?<VisualView spec={visual.spec}/>:null;}
